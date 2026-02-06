import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

/**
 * rehype plugin to wrap "Related Articles/Fixes/Guides/Issues" sections
 *
 * Finds H2 headings matching "Related ..." pattern and wraps them
 * along with their following content until the next heading with:
 * <div data-block="related">...</div>
 *
 * This provides a stable structural anchor for styling instead of
 * relying on heading text matching.
 */
export function rehypeWrapRelatedSections() {
  return (tree: Root) => {
    const children = tree.children || [];
    const newChildren: any[] = [];
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      // Check if this is an H2 with "Related" text
      if (
        node.type === "element" &&
        node.tagName === "h2" &&
        isRelatedHeading(node)
      ) {
        // Start wrapping - collect all elements until next heading
        const wrappedNodes: any[] = [node];
        i++;

        // Collect subsequent elements until we hit another heading or end
        while (i < children.length) {
          const nextNode = children[i];
          if (nextNode.type === "element" && /^h[1-6]$/.test(nextNode.tagName)) {
            break; // Stop at next heading
          }
          wrappedNodes.push(nextNode);
          i++;
        }

        // Create wrapper div
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: { "data-block": "related" },
          children: wrappedNodes,
        };

        newChildren.push(wrapper);
      } else {
        newChildren.push(node);
        i++;
      }
    }

    tree.children = newChildren;
  };
}

function isRelatedHeading(node: Element): boolean {
  const textContent = getTextContent(node);
  return /^Related\s+(Articles|Fixes|Guides|Issues)$/i.test(textContent.trim());
}

function getTextContent(node: Element): string {
  let text = "";
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "text") {
        text += (child as Text).value;
      } else if (child.type === "element") {
        text += getTextContent(child as Element);
      }
    }
  }
  return text;
}

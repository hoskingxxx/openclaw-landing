import type { Root, Element } from "hast";

/**
 * rehype plugin to wrap "Still Stuck? / 仍然卡住？" diagnostic sections
 *
 * Finds H3 headings matching "Still Stuck" pattern and wraps them
 * along with their following content until the next heading with:
 * <div data-block="stuck">...</div>
 *
 * This provides a stable structural anchor for styling cluster links
 * in these diagnostic sections that appear at the bottom of all guides.
 */
export function rehypeWrapStuckSections() {
  return (tree: Root) => {
    const children = tree.children || [];
    const newChildren: any[] = [];
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      // Check if this is an H3 with "Still Stuck" text
      if (
        node.type === "element" &&
        node.tagName === "h3" &&
        isStuckHeading(node)
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
          properties: { "data-block": "stuck" },
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

function isStuckHeading(node: Element): boolean {
  const textContent = getTextContent(node);
  return /^Still Stuck\?|仍然卡住/i.test(textContent.trim());
}

function getTextContent(node: Element): string {
  let text = "";
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "text") {
        text += (child as any).value;
      } else if (child.type === "element") {
        text += getTextContent(child as Element);
      }
    }
  }
  return text;
}

import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

/**
 * rehype plugin to assign clean IDs to Group headings
 *
 * Finds h2 headings matching "Group 1:", "Group 2:", etc.
 * and assigns clean IDs: group-1, group-2, etc.
 *
 * Runs before rehype-slug to override slug-based IDs.
 */
export function rehypeGroupIds() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2") return;

      const textContent = getTextContent(node);
      const match = textContent.match(/Group\s+(\d+):/i);

      if (match) {
        const groupNumber = match[1];
        node.properties = node.properties || {};
        node.properties.id = `group-${groupNumber}`;
      }
    });
  };
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

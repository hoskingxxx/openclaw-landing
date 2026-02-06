import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * rehype plugin to mark internal guide links as cluster links
 *
 * Uses semantic, structure-based approach:
 * 1. Links inside [data-block="related"] containers (Related Articles sections)
 * 2. Links inside <table> elements (navigation/index tables)
 * 3. Links inside [data-block="stuck"] containers (Still Stuck diagnostic sections)
 *
 * Adds data-link="cluster" attribute to internal guide links (href starting with "/guides/")
 * within these contexts. This enables CSS styling without using href-based selectors.
 */
export function rehypeClusterLinks() {
  return (tree: Root) => {
    // Mark links in [data-block="related"] sections
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "div" && node.properties?.["data-block"] === "related") {
        if (node.children) {
          for (const child of node.children) {
            if (child.type === "element") {
              markClusterLinks(child as Element);
            }
          }
        }
      }
    });

    // Mark links in [data-block="stuck"] sections
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "div" && node.properties?.["data-block"] === "stuck") {
        if (node.children) {
          for (const child of node.children) {
            if (child.type === "element") {
              markClusterLinks(child as Element);
            }
          }
        }
      }
    });

    // Mark links inside <table> elements (navigation tables)
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "table") {
        markClusterLinks(node);
      }
    });
  };
}

function markClusterLinks(node: Element) {
  if (node.tagName === "a") {
    const href = node.properties?.href;
    if (typeof href === "string" && href.startsWith("/guides/")) {
      node.properties = node.properties || {};
      node.properties["data-link"] = "cluster";
    }
  }

  // Recursively process children
  if (node.children) {
    for (const child of node.children) {
      if (child.type === "element") {
        markClusterLinks(child as Element);
      }
    }
  }
}

import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * rehype plugin to mark internal guide links in "Related" sections as cluster links
 *
 * Uses structural anchor approach: only targets links inside [data-block="related"]
 * containers (wrapped by rehypeWrapRelatedSections plugin).
 *
 * Adds data-link="cluster" attribute to internal guide links (href starting with "/guides/")
 * within these sections. This enables CSS styling without using href-based selectors.
 */
export function rehypeClusterLinks() {
  return (tree: Root) => {
    let inRelatedSection = false;

    visit(tree, "element", (node: Element) => {
      // Track if we're inside a [data-block="related"] container
      if (node.tagName === "div" && node.properties?.["data-block"] === "related") {
        inRelatedSection = true;
        // Visit children inside this container
        if (node.children) {
          for (const child of node.children) {
            if (child.type === "element") {
              markClusterLinks(child as Element);
            }
          }
        }
        inRelatedSection = false;
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

import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * rehype plugin to mark internal guide links as cluster links
 *
 * Uses semantic, structure-based approach:
 * 1. Links inside [data-block="related"] containers (Related Articles sections)
 * 2. Links inside <table> elements (navigation/index tables)
 * 3. Links inside [data-block="stuck"] containers (Still Stuck diagnostic sections)
 * 4. Links in h2 + ul/li + a patterns (Related Articles/Guides sections without data-block)
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

    // Mark links in h2 + ul patterns (Related Articles/Guides sections without data-block)
    const children = tree.children || [];
    for (let i = 0; i < children.length - 1; i++) {
      const current = children[i];
      const next = children[i + 1];
      if (
        current.type === "element" &&
        current.tagName === "h2" &&
        isRelatedHeading(current as Element) &&
        next.type === "element" &&
        next.tagName === "ul"
      ) {
        markClusterLinks(next as Element);
      }
    }

    // Also scan all h2 elements and mark links in their following siblings
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "h2" && isRelatedHeading(node)) {
        // Find next sibling ul/ol
        if (parent && typeof index === "number") {
          const siblings = (parent as Element).children || [];
          for (let j = index + 1; j < siblings.length; j++) {
            const sibling = siblings[j];
            if (sibling.type === "element") {
              if (sibling.tagName === "ul" || sibling.tagName === "ol") {
                markClusterLinks(sibling as Element);
              }
              // Stop at next heading
              if (/^h[1-6]$/.test((sibling as Element).tagName)) {
                break;
              }
            }
          }
        }
      }

      // Also scan h3 elements for "Still Stuck" pattern
      if (node.tagName === "h3" && isStuckHeading(node)) {
        // Find next sibling p/div with links
        if (parent && typeof index === "number") {
          const siblings = (parent as Element).children || [];
          for (let j = index + 1; j < siblings.length; j++) {
            const sibling = siblings[j];
            if (sibling.type === "element") {
              // Mark links in p, div, ul, ol elements
              if (["p", "div", "ul", "ol"].includes((sibling as Element).tagName)) {
                markClusterLinks(sibling as Element);
              }
              // Stop at next heading
              if (/^h[1-6]$/.test((sibling as Element).tagName)) {
                break;
              }
            }
          }
        }
      }
    });
  };
}

function isRelatedHeading(node: Element): boolean {
  const textContent = getTextContent(node);
  return /^Related\s+(Articles|Fixes|Guides|Issues)$/i.test(textContent.trim());
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

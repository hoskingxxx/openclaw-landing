import type { Root } from "hast";
import { visit } from "unist-util-visit";

type Options = {
  postSlug: string;
  placementDefault?: string;
};

function getQueryParam(href: string, key: string): string | null {
  const m = href.match(new RegExp(`[?&]${key}=([^&]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function rehypeVultrEnrich(options: Options) {
  const postSlug = options.postSlug;
  const placementDefault = options.placementDefault ?? "mdx_auto";

  return (tree: Root) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string") return;

      const isVultr =
        href.includes("vultr.com") && href.includes("ref=9864821-9J");
      if (!isVultr) return;

      // normalize className to string[]
      const cn = node.properties.className;
      const classes: string[] = Array.isArray(cn)
        ? cn.filter(Boolean)
        : cn
          ? [String(cn)]
          : [];

      const add = (...xs: string[]) => {
        for (const x of xs) if (!classes.includes(x)) classes.push(x);
      };

      add(
        "vultr-cta",
        "inline-flex",
        "items-center",
        "justify-center",
        "px-4",
        "py-2",
        "text-sm",
        "font-bold",
        "text-white",
        "bg-brand-primary",
        "rounded-md",
        "hover:bg-brand-hover",
        "transition-colors",
        "no-underline",
        "my-2"
      );

      node.properties.className = classes;

      // Umami tracking - unified affiliate schema
      node.properties["data-umami-event"] = "affiliate_click";
      node.properties["data-umami-partner"] = "vultr";
      node.properties["data-umami-location"] =
        getQueryParam(href, "utm_content") ?? placementDefault;

      // Affiliate link styling
      node.properties["data-link"] = "affiliate";
    });
  };
}

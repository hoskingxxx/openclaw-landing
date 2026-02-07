/**
 * Buy Me a Coffee link utility for tracking conversion sources
 */

const BMC_BASE_URL = "https://buymeacoffee.com/openclaw";

export type BMCSource =
  | "navbar"
  | "article-footer"
  | "floating-widget"
  | "reality-check"
  | "error-index";

/**
 * Generate a tracked Buy Me a Coffee link
 */
export function getBMCLink(source: BMCSource): string {
  return `${BMC_BASE_URL}?ref=${source}`;
}

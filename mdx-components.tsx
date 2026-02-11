import type { MDXComponents } from 'mdx/types'
import { FAQ } from '@/components/FAQ'
import { AnswerCapsule, CriticalFix, QuickFix } from '@/components/AnswerCapsule'
import { CodeBlockWithCTA } from '@/components/ui/CodeBlockWithCTA'
import { EcosystemNote } from '@/components/EcosystemNote'

// Force MDX <a> to render as real clickable links
const A = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href || "";
  const isExternal = href.startsWith("http");
  return (
    <a
      {...props}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={[
        "underline underline-offset-4",
        "text-orange-400 hover:text-orange-300",
        props.className || "",
      ].join(" ")}
    />
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    FAQ,
    AnswerCapsule,
    CriticalFix,
    QuickFix,
    CodeBlockWithCTA,
    EcosystemNote,
    a: A, // CRITICAL: Force MDX <a> to render as real clickable links
  }
}

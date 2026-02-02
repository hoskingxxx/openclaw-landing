"use client";

import { useState } from "react";

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
  onCopy?: () => void;
}

export function CodeBlock({ title, code, language = "bash", onCopy }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  return (
    <div className="glass-card overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 sticky top-0 bg-[#0d1117] z-10">
          <span className="text-sm text-text-secondary">{title}</span>
          <button
            onClick={handleCopy}
            className="px-3 py-2 min-h-[44px] min-w-[44px] text-xs text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-md transition-colors active:scale-95 flex-shrink-0"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <code className="text-sm text-text-primary font-mono block whitespace-nowrap">{code}</code>
      </pre>
    </div>
  );
}

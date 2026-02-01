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
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="text-sm text-text-secondary">{title}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-text-primary font-mono">{code}</code>
      </pre>
    </div>
  );
}

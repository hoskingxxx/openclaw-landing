"use client";

import { useState, useMemo } from "react";
import { commandTemplates } from "@/lib/content";

export function CommandBuilder() {
  const [goal, setGoal] = useState("");
  const [scope, setScope] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedCommand = useMemo(() => {
    return `Goal: ${goal || "TBD"}
Scope: ${scope || "TBD"}
Constraints: ${constraints || "TBD"}
Output: ${output || "TBD"}

---
💡 Copy and send to OpenClaw to execute`;
  }, [goal, scope, constraints, output]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadTemplate = (templateId: string) => {
    const template = commandTemplates.find((t) => t.id === templateId);
    if (template) {
      const lines = template.template.split("\n");
      lines.forEach((line) => {
        if (line.startsWith("Goal:") || line.startsWith("目标：")) setGoal(line.replace(/^Goal:|目标：/, ""));
        if (line.startsWith("Scope:") || line.startsWith("范围：")) setScope(line.replace(/^Scope:|范围：/, ""));
        if (line.startsWith("Constraints:") || line.startsWith("约束：")) setConstraints(line.replace(/^Constraints:|约束：/, ""));
        if (line.startsWith("Output:") || line.startsWith("输出：")) setOutput(line.replace(/^Output:|输出：/, ""));
      });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          🦞 OpenClaw Command Generator
        </h2>
        <p className="text-text-secondary text-lg">
          Enter your goal, auto-generate standard command templates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              🎯 What do you want to accomplish?
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Fix bugs in project, batch process Excel files..."
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary transition-colors"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              📁 Limit Scope (optional)
            </label>
            <input
              type="text"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="e.g., Only src/ directory, only data/ folder..."
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ⚠️ Constraints (optional)
            </label>
            <input
              type="text"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              placeholder="e.g., No new dependencies, keep API compatible..."
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              📤 Expected Output Format
            </label>
            <select
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
            >
              <option value="">Select output format...</option>
              <option value="diff + explanation">diff + explanation</option>
              <option value="New file">New file</option>
              <option value="JSON report">JSON report</option>
              <option value="Summary text">Summary text</option>
            </select>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Generated Command</h3>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-brand-primary hover:bg-brand-hover text-white"
                }`}
              >
                {copied ? "✓ Copied" : "📋 Copy Command"}
              </button>
            </div>
            <pre className="p-4 bg-background-tertiary rounded-lg overflow-x-auto">
              <code className="text-sm text-text-primary font-mono whitespace-pre-wrap">
                {generatedCommand}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Templates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commandTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => loadTemplate(template.id)}
              className="glass-card p-4 text-left hover:bg-white/12 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="text-text-primary font-medium">{template.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-background-tertiary/50 rounded-xl border border-brand-primary/20">
        <div className="flex items-start gap-4">
          <div className="text-3xl flex-shrink-0">⚠️</div>
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Usage Disclaimer</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Generated commands will execute in your environment. OpenClaw will break down tasks and call system tools based on your goal.
              Always understand the command content before executing, especially for file modifications or system changes.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-text-tertiary">
              <li>• Test in a safe environment first</li>
              <li>• Backup important data before running</li>
              <li>• Use constraints to limit execution scope</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

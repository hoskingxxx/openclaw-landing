// OpenClaw Unofficial Site - Core Content Data
// Simplified for "Survival Guide" persona

// ============================================================================
// Site Config
// ============================================================================
export const siteConfig = {
  title: "OpenClaw Hub",
  description: "Community documentation for OpenClaw AI agent framework. Local setup guides with DeepSeek R1 and Ollama.",
  url: "https://openclaw-ai.org",
  ogImage: "/og-image.png",
}

// ============================================================================
// Navigation
// ============================================================================
export const navigation = [
  { title: "Home", href: "/" },
  { title: "Docs", href: "/quick-start" },
  { title: "Guides", href: "/guides" },
  // Removed: Use Cases, Generator, Videos, FAQ (out of scope per SITE_SCOPE.md)
]

// ============================================================================
// Installation Steps
// ============================================================================
export const installSteps = [
  {
    title: "Install Runtime",
    description: "Ensure Node.js ≥22 is installed",
    commands: {
      macos: "brew install node",
      linux: "apt install nodejs  # or distro package manager",
      windows: "Download from nodejs.org",
    },
  },
  {
    title: "Install OpenClaw",
    description: "Install latest version globally with npm",
    commands: {
      npm: "npm install -g openclaw@latest",
      pnpm: "pnpm add -g openclaw@latest",
      bun: "bun add -g openclaw@latest",
    },
  },
  {
    title: "Run Onboarding Wizard",
    description: "Wizard will auto-configure Gateway daemon and basic settings",
    commands: {
      main: "openclaw onboard --install-daemon",
    },
  },
]

// ============================================================================
// Supported Models (for Quick Start reference only)
// ============================================================================
export const supportedModels = {
  recommended: {
    provider: "Anthropic",
    models: ["Claude Pro/Max (100/200)", "Opus 4.5"],
    reason: "Long context + better prompt-injection resistance",
  },
  providers: [
    {
      name: "Anthropic",
      auth: "OAuth (Claude Pro/Max)",
      models: ["Claude 3.5 Sonnet", "Claude Opus 4.5"],
      recommended: true,
    },
    {
      name: "OpenAI",
      auth: "API Key or OAuth (ChatGPT/Codex)",
      models: ["GPT-4", "GPT-4o"],
      recommended: false,
    },
    {
      name: "Local Models",
      auth: "Custom config",
      models: "Connect via configuration (Ollama, vLLM)",
      recommended: false,
    },
  ],
}

// ============================================================================
// FAQ (Technical Only - Per SITE_SCOPE.md)
// ============================================================================
export const faqs = [
  {
    category: "Basics",
    questions: [
      {
        q: "What is OpenClaw?",
        a: "OpenClaw is an open-source AI Agent framework that executes real tasks on your computer—reading files, running commands, modifying code—not just chat.\n\nThink of it as a junior engineer with sudo privileges. If you wouldn't trust an intern with root access to this folder, don't trust the agent.",
      },
      {
        q: "What's the essential difference from ChatGPT / Claude?",
        a: "ChatGPT answers questions and gives advice. OpenClaw reads files, runs commands, modifies code, and executes workflows.\n\nChatGPT is a consultant. OpenClaw is the intern who actually does the work.",
      },
      {
        q: "Does OpenClaw have its own LLM?",
        a: "No. OpenClaw is a scheduler that connects to external LLM providers (OpenAI, Claude, Ollama, etc.). It doesn't sell models, just makes models 'work'.",
      },
      {
        q: "Is my data private with local models?",
        a: "If you use Ollama locally, yes—the model runs on your machine.\n\nTo verify: block outbound traffic (except localhost) via Little Snitch or `ufw`. If OpenClaw still talks to your local Ollama, it's running locally. If it hangs, check your `base_url`.\n\nIf you use API providers (DeepSeek, OpenAI, Anthropic), your prompts go to their servers.",
      },
      {
        q: "Does it support DeepSeek API?",
        a: "Yes. Set `LLM_PROVIDER=openai` and `BASE_URL=https://api.deepseek.com`.\n\nExample `.env`:\n```bash\nLLM_PROVIDER=\"openai\"\nLLM_BASE_URL=\"https://api.deepseek.com\"\nLLM_API_KEY=\"sk-your-key-here\"\nLLM_MODEL=\"deepseek-reasoner\"\n```\n\n👉 See our **[DeepSeek Config Guide for OpenClaw](/guides/how-to-use-deepseek-with-openclaw)** for full setup.",
      },
      {
        q: "Does it support local DeepSeek (Ollama)?",
        a: "Yes. Use `provider: ollama`.\n\nExample setup:\n```bash\n# Install Ollama & pull model\ncurl -fsSL https://ollama.com/install.sh | sh\nollama run deepseek-r1:8b\n\n# Configure OpenClaw\nLLM_PROVIDER=\"ollama\"\nLLM_BASE_URL=\"http://localhost:11434/v1\"\nLLM_MODEL=\"deepseek-r1:8b\"\n```\n\n⚠️ Requires heavy hardware. See **[Hardware Reality Check](/guides/fix-openclaw-cuda-oom-errors)**.",
      },
      {
        q: "What is the relationship between OpenClaw and Ollama?",
        a: "Ollama runs the DeepSeek model (loads it into VRAM, handles inference). OpenClaw tells it what to do (reads files, runs commands, executes workflows).\n\nIf Ollama is down, OpenClaw is useless. If OpenClaw isn't running, Ollama is just a chatbot. You need both.",
      },
    ],
  },
  {
    category: "Usage & Installation",
    questions: [
      {
        q: "Do I need to know programming?",
        a: "Basic use: no coding needed, but basic logic helps. Advanced use: knowing command line and project structure helps.\n\nIt's not 'zero barrier', but 'low barrier, high ceiling'. If you don't know what `chmod +x` means, you're going to have a bad time.",
      },
      {
        q: "Can it run on Windows / Mac / Linux?",
        a: "Mac: most friendly. Linux/Server: first choice for production. Windows: usually via WSL2 (strongly recommended).\n\nIf you see `Error: connect ECONNREFUSED 127.0.0.1:11434`, that's a WSL2 networking issue.\n\nMac users suffer slowly (3.2 tokens/sec). Windows users suffer dramatically (WSL2 drama). Linux users just suffer.",
      },
      {
        q: "Can OpenClaw run continuously?",
        a: "Yes. It can run long-term, retry on failure, save intermediate state, and stop by rules—which is why it's called an autonomous agent.\n\nThat's also why it's a security risk: it doesn't know when to quit.",
      },
      {
        q: "Why am I getting JSON parsing errors?",
        a: "DeepSeek R1 wraps responses in `` tags before the actual JSON. OpenClaw's JSON parser fails.\n\nError: `SyntaxError: Unexpected token <` (the model is 'thinking' out loud)\n\n👉 Fix it here: **[JSON Parsing Fix Guide](/guides/fix-openclaw-json-mode-errors)**.",
      },
    ],
  },
  {
    category: "Security & Risks",
    questions: [
      {
        q: "Is OpenClaw safe? How to prevent Prompt Injection?",
        a: "OpenClaw has powerful capabilities but requires strict guardrails (containerization, permission limits, command blocking) to be safe.\n\nIf you wouldn't trust a junior intern with root access to this folder, don't trust the agent.\n\nReal incidents I've stopped:\n- Agent tried to `rm -rf .` to \"clean build artifacts\"\n- Agent attempted `curl unknown.sh | bash` because it needed a tool\n\nMitigation strategies:\n- Run in Docker container with read-only filesystem\n- Use dedicated device (Mac Mini, cheap server)\n- Block dangerous commands (rm, format, dd, etc.)\n- Review every execution log\n\n👉 Read the full autopsy: **[CVE-2026-25253 Analysis](/guides/openclaw-security-rce-cve-2026-25253)**.",
      },
      {
        q: "Will it 'go rogue'?",
        a: "If you give too many permissions, yes. OpenClaw's capabilities equal the permissions you give.\n\nCorrect approach: read-only by default, specify writable directories, block dangerous commands.\n\n'Going rogue' is just a fancy way of saying 'it did exactly what you told it to do, not what you meant'.",
      },
      {
        q: "Suitable for production?",
        a: "Yes, but only if you have strict guardrails. Otherwise, expect to wake up at 3 AM.\n\nYou need:\n- Exact understanding of what the agent can and cannot do\n- Every workflow tested in staging\n- Permission isolation (read-only by default)\n- Logging and rollback mechanisms\n- Human review of every action\n\nIf you're missing any of these, you're not ready for production.",
      },
    ],
  },
]

// ============================================================================
// Export all content
// ============================================================================
export default {
  siteConfig,
  navigation,
  installSteps,
  supportedModels,
  faqs,
}

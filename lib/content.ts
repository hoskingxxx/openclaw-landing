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
        a: "Not an App. OpenClaw is an open-source AI Agent framework / execution AI assistant that runs on your computer or server to execute real tasks, not chat.",
      },
      {
        q: "What's the essential difference from ChatGPT / Claude?",
        a: "In short: ChatGPT 'thinks', OpenClaw 'does'.\n\nChatGPT: Answers questions, gives advice\nOpenClaw: Reads files, runs commands, modifies code, executes workflows",
      },
      {
        q: "Does OpenClaw have its own LLM?",
        a: "No. It's a 'scheduler' that needs you to connect: OpenAI, Claude or local models.\n\n👉 It doesn't sell models, just makes models 'work'.",
      },
      {
        q: "Does it support DeepSeek?",
        a: "✅ Yes, it works well with DeepSeek R1 for local deployment.\n\n**Why DeepSeek + OpenClaw is a good combination**:\n- DeepSeek R1 runs locally, hardware dependent\n- Strong reasoning, suitable for complex task breakdown\n- Fully controllable privacy, data stays local\n- Suitable for 7×24 operation on Mac Mini or local servers\n\n**Config example (.env)**:\n```bash\n# Install Ollama & pull model\ncurl -fsSL https://ollama.com/install.sh | sh\nollama run deepseek-r1:8b\n\n# Configure OpenClaw (.env file)\nLLM_PROVIDER=\"ollama\"\nLLM_BASE_URL=\"http://localhost:11434/v1\"\nLLM_MODEL=\"deepseek-r1:8b\"\n```\n\n👉 Check the hardware requirements before running local models.",
      },
    ],
  },
  {
    category: "Usage & Installation",
    questions: [
      {
        q: "Do I need to know programming?",
        a: "Basic use: No coding needed, but need basic logic\nAdvanced use: Knowing some command line/project structure helps\n\n👉 It's not 'zero barrier', but 'low barrier, high ceiling'.",
      },
      {
        q: "Can it run on Windows / Mac / Linux?",
        a: "✅ Mac: Most friendly\n✅ Linux / Server: First choice for production\n⚠️ Windows: Usually via WSL2 (strongly recommended)",
      },
      {
        q: "Can OpenClaw run continuously?",
        a: "Yes. It can: run long-term, retry on failure, save intermediate state, stop by rules.\n\nThis is why it's called an autonomous agent.",
      },
    ],
  },
  {
    category: "Security & Risks",
    questions: [
      {
        q: "Is OpenClaw safe? How to prevent Prompt Injection?",
        a: "**Think of OpenClaw as a junior engineer with sudo privileges.**\n\nIf you wouldn't trust a junior intern with root access to this folder, don't trust the agent.\n\n**Hard truth:** The agent can delete files. It can break production. It can deploy bad code.\n\n**Mitigation**:\n- Run in Docker container with read-only filesystem\n- Use dedicated device (Mac Mini, cheap server)\n- Block dangerous commands (rm, format, dd, etc.)\n- Review EVERY execution log\n\n👉 You're giving an AI the keys to your server. Act accordingly.",
      },
      {
        q: "Will it 'go rogue'?",
        a: "If you give too many permissions, yes.\n\nOpenClaw's capabilities ≈ permissions you give\n\nCorrect approach: read-only by default, specify writable directories, block dangerous commands",
      },
      {
        q: "Suitable for production?",
        a: "**Short answer:** Yes.\n\n**Honest answer:** Only if you have strict guardrails. Otherwise, expect to wake up at 3 AM.\n\n**Production requirements**:\n- You know exactly what the agent can and cannot do\n- You have tested EVERY workflow in staging\n- You have permission isolation (read-only by default)\n- You have logging AND rollback mechanisms\n- You have a human reviewing every action\n\nIf you're missing any of these, you're not ready for production.\n\n👉 Beginners should NOT start with production.",
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

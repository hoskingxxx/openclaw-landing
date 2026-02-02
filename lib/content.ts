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
  { title: "Guides", href: "/blog" },
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
        a: "✅ Perfect support! DeepSeek R1 is the best partner for OpenClaw local deployment.\n\n**Why recommend DeepSeek + OpenClaw**:\n- DeepSeek R1 runs locally, hardware dependent\n- Strong reasoning, suitable for complex task breakdown\n- Fully controllable privacy, data stays local\n- Perfect for 7×24 operation on Mac Mini or local servers\n\n**Config example**:\n```bash\n# Install Ollama\nollama run deepseek-r1\n\n# Configure OpenClaw to use local model\nagent.model = \"ollama/deepseek-r1```\n\n👉 Check the hardware requirements before running local models.",
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
        a: "Security best practices:\n\n**Recommended isolation**:\n- Run in Docker container, limit file system access\n- Use dedicated device like Mac Mini\n- Set read-only permissions, specify writable directories\n- Block dangerous commands (rm, format, etc.)\n\n**Prevent Prompt Injection**:\n- Don't expose system commands in prompts\n- Use constraints to limit execution scope\n- Regularly review execution logs\n\n👉 Essentially, treat it like an autonomous process with system privileges.",
      },
      {
        q: "Will it 'go rogue'?",
        a: "If you give too many permissions, yes.\n\nOpenClaw's capabilities ≈ permissions you give\n\nCorrect approach: read-only by default, specify writable directories, block dangerous commands",
      },
      {
        q: "Suitable for production?",
        a: "Yes, but only if: you know what it can do, have permission isolation, have logging/rollback mechanisms.\n\nBeginners should not start with production.",
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

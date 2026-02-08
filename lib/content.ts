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
        a: "**Short answer:** OpenClaw is an open-source AI Agent framework that executes real tasks on your computer, not just chat.\n\nNot an App. OpenClaw is an open-source AI Agent framework / execution AI assistant that runs on your computer or server to execute real tasks, not chat.\n\n**Real Talk:** It's basically a junior engineer with sudo privileges.",
      },
      {
        q: "What's the essential difference from ChatGPT / Claude?",
        a: "**Short answer:** ChatGPT answers questions; OpenClaw executes tasks (reads files, runs commands, modifies code).\n\nIn short: ChatGPT 'thinks', OpenClaw 'does'.\n\nChatGPT: Answers questions, gives advice\nOpenClaw: Reads files, runs commands, modifies code, executes workflows\n\n**Real Talk:** ChatGPT is a consultant. OpenClaw is an intern who actually does the work.",
      },
      {
        q: "Does OpenClaw have its own LLM?",
        a: "**Short answer:** No. OpenClaw is a scheduler that connects to external LLM providers (OpenAI, Claude, Ollama, etc.).\n\nNo. It's a 'scheduler' that needs you to connect: OpenAI, Claude or local models.\n\n👉 It doesn't sell models, just makes models 'work'.\n\n**Real Talk:** You're the DJ. OpenClaw is just the mixer.",
      },
      {
        q: "Is my data private with local models?",
        a: "**Short answer:** If you use Ollama locally, yes. The model runs on your machine.\n\n**How to verify:** Don't take my word for it. Block outbound traffic (except localhost) via Little Snitch or `ufw`. If OpenClaw still talks to your local Ollama, it's local. If it hangs, check your `base_url`.\n\n**Caveat:** If you use API providers (DeepSeek, OpenAI, Anthropic), your prompts go to their servers. Read their privacy policies.",
      },
      {
        q: "Does it support DeepSeek API?",
        a: "✅ Yes. Set `LLM_PROVIDER=openai` and `BASE_URL=https://api.deepseek.com`.\n\n**Config example (.env)**:\n```bash\nLLM_PROVIDER=\"openai\"\nLLM_BASE_URL=\"https://api.deepseek.com\"\nLLM_API_KEY=\"sk-your-key-here\"\nLLM_MODEL=\"deepseek-reasoner\"\n```\n\n👉 See our **[DeepSeek Config Guide for OpenClaw](/guides/how-to-use-deepseek-with-openclaw)** for full setup.",
      },
      {
        q: "Does it support local DeepSeek (Ollama)?",
        a: "✅ Yes. Use `provider: ollama`.\n\n**Config example (.env)**:\n```bash\n# Install Ollama & pull model\ncurl -fsSL https://ollama.com/install.sh | sh\nollama run deepseek-r1:8b\n\n# Configure OpenClaw\nLLM_PROVIDER=\"ollama\"\nLLM_BASE_URL=\"http://localhost:11434/v1\"\nLLM_MODEL=\"deepseek-r1:8b\"\n```\n\n⚠️ **Warning:** Requires heavy hardware. See **[Hardware Reality Check](/guides/fix-openclaw-cuda-oom-errors)**.",
      },
      {
        q: "What is the relationship between OpenClaw and Ollama?",
        a: "**Ollama is the engine; OpenClaw is the driver.**\n\nOllama runs the DeepSeek model (loads it into VRAM, handles inference). OpenClaw tells it what to do (reads files, runs commands, executes workflows).\n\nIf Ollama is down, OpenClaw is useless. If OpenClaw isn't running, Ollama is just a chatbot.\n\n**Analogy:** Ollama = Engine, OpenClaw = Driver. You need both to drive the car.",
      },
    ],
  },
  {
    category: "Usage & Installation",
    questions: [
      {
        q: "Do I need to know programming?",
        a: "Basic use: No coding needed, but need basic logic\nAdvanced use: Knowing some command line/project structure helps\n\n👉 It's not 'zero barrier', but 'low barrier, high ceiling'.\n\n**Real Talk:** If you don't know what `chmod +x` means, you're going to have a bad time.",
      },
      {
        q: "Can it run on Windows / Mac / Linux?",
        a: "✅ Mac: Most friendly\n✅ Linux / Server: First choice for production\n⚠️ Windows: Usually via WSL2 (strongly recommended)\n\n**Symptom:** `Error: connect ECONNREFUSED 127.0.0.1:11434` (Networking issue)\n\n**Real Talk:** Mac users suffer slowly (3.2 tokens/sec). Windows users suffer dramatically (WSL2 drama). Linux users just suffer.",
      },
      {
        q: "Can OpenClaw run continuously?",
        a: "Yes. It can: run long-term, retry on failure, save intermediate state, stop by rules.\n\nThis is why it's called an autonomous agent.\n\n**Real Talk:** That's also why it's called a 'security risk'. It doesn't know when to quit.",
      },
      {
        q: "Why am I getting JSON parsing errors?",
        a: "DeepSeek R1 wraps responses in `` tags before the actual JSON. OpenClaw's JSON parser fails.\n\n**Symptom:** `SyntaxError: Unexpected token <` (The model is 'thinking' out loud)\n\n👉 **Fix it here:** **[JSON Parsing Fix Guide](/guides/fix-openclaw-json-mode-errors)**.",
      },
    ],
  },
  {
    category: "Security & Risks",
    questions: [
      {
        q: "Is OpenClaw safe? How to prevent Prompt Injection?",
        a: "**Short answer:** OpenClaw has powerful capabilities but requires strict guardrails (containerization, permission limits, command blocking) to be safe.\n\n**Think of OpenClaw as a junior engineer with sudo privileges.**\n\nIf you wouldn't trust a junior intern with root access to this folder, don't trust the agent.\n\n**Real incidents I've stopped:**\n- Agent tried to `rm -rf .` to \"clean build artifacts\"\n- Agent attempted `curl unknown.sh | bash` because it needed a tool\n\n**Mitigation**:\n- Run in Docker container with read-only filesystem\n- Use dedicated device (Mac Mini, cheap server)\n- Block dangerous commands (rm, format, dd, etc.)\n- Review EVERY execution log\n\n👉 **Read the full autopsy:** **[CVE-2026-25253 Analysis](/guides/openclaw-security-rce-cve-2026-25253)**.",
      },
      {
        q: "Will it 'go rogue'?",
        a: "If you give too many permissions, yes.\n\nOpenClaw's capabilities ≈ permissions you give\n\nCorrect approach: read-only by default, specify writable directories, block dangerous commands\n\n**Real Talk:** 'Going rogue' is just a fancy way of saying 'it did exactly what you told it to do, not what you meant'.",
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

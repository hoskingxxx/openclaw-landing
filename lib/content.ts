// OpenClaw Resource Site - Core Content Data
// Based on https://github.com/openclaw/openclaw official repository

// ============================================================================
// Site Config
// ============================================================================
export const siteConfig = {
  title: "OpenClaw Resource Site",
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
  // Temporarily hidden for "Survivor" pivot - focus on documentation only
  // { title: "Use Cases", href: "/use-cases" },
  // { title: "Generator", href: "/command-builder" },
  // { title: "Videos", href: "/videos" },
  // { title: "FAQ", href: "/faq" },
]

// ============================================================================
// Installation Steps (updated from official GitHub)
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
// Supported Models (updated from official GitHub)
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
      models: "Connect via configuration",
      recommended: false,
    },
  ],
}

// ============================================================================
// Supported Channels/Platforms (updated from official GitHub)
// ============================================================================
export const supportedChannels = {
  mainstream: [
    "WhatsApp",
    "Telegram",
    "Slack",
    "Discord",
    "Google Chat",
  ],
  extended: [
    "Signal",
    "iMessage (macOS)",
    "Microsoft Teams",
    "BlueBubbles",
    "Matrix",
    "Zalo",
    "Zalo Personal",
    "WebChat",
  ],
  voice: [
    "macOS (Voice Wake + Talk Mode)",
    "iOS",
    "Android",
  ],
}

// ============================================================================
// 6 Use Cases
// ============================================================================
export const useCases = [
  {
    id: "ai-programmer",
    title: "AI Programmer",
    icon: "👨‍💻",
    description: "Auto-read repos, locate bugs, modify code, output patches",
    audience: ["Indie developers", "Engineers", "Maintaining legacy projects"],
    exampleCommand: `Goal: Fix current project errors
Scope: src/ directory
Constraints: No new dependencies
Output: diff + explanation`,
    popular: true,
  },
  {
    id: "ai-ops",
    title: "AI DevOps/SRE",
    icon: "🔧",
    description: "Check logs, run commands, restart services, auto-troubleshoot",
    audience: ["DevOps", "Tech leads", "Server owners"],
    exampleCommand: `Check service anomalies in last 24 hours
Analyze logs
Give minimal fix plan
Don't run destructive commands`,
    popular: false,
  },
  {
    id: "data-processing",
    title: "Automated Data Processing",
    icon: "📊",
    description: "Clean data, merge files, statistical analysis, output new files",
    audience: ["Data/Operations/SEO", "Regular CSV/Excel processors"],
    exampleCommand: `Read all CSVs in data/
Clean null values
Merge into single table
Output summary.csv`,
    popular: false,
  },
  {
    id: "knowledge-assistant",
    title: "Local Knowledge Assistant",
    icon: "📚",
    description: "Answer questions based on local docs, search docs, summarize info",
    audience: ["Lots of documentation", "Don't want to upload to cloud"],
    exampleCommand: `Only based on docs/ directory
Answer: What is our refund policy
Cite source file paths`,
    popular: false,
  },
  {
    id: "seo-content",
    title: "SEO/Content Batch Production",
    icon: "✍️",
    description: "Scan directories, batch generate content, rewrite and optimize copy",
    audience: ["Site owners", "Content creators", "Niche site builders"],
    exampleCommand: `Read keywords.txt
Generate SEO page draft for each keyword
Output as markdown files`,
    popular: false,
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Collaboration",
    icon: "🤖",
    description: "One agent analyzes, one executes, one verifies",
    audience: ["Advanced users", "Want to play with Agent architecture"],
    exampleCommand: `Agent A: Break down task
Agent B: Execute operations
Agent C: Check if results meet goals`,
    popular: false,
    advanced: true,
  },
]

// ============================================================================
// Video Tutorials (with command extraction)
// ============================================================================
export const videoTutorials = [
  {
    id: "dpFSzPiYwac",
    platform: "youtube",
    title: "OpenClaw Viral AI Automation Tool! Latest Local Deployment Tutorial",
    duration: "12:34",
    notes: [
      {
        title: "Install Command",
        code: "npm install -g openclaw@latest",
      },
      {
        title: "Start Wizard",
        code: "openclaw onboard --install-daemon",
      },
      {
        title: "Start Gateway",
        code: "openclaw gateway --port 18789 --verbose",
      },
    ],
  },
  {
    id: "U8kXfk8enrY",
    platform: "youtube",
    title: "OpenClaw Clearly Explained (and how to use it)",
    duration: "15:20",
    notes: [
      {
        title: "Send Message",
        code: "openclaw message send --to +1234567890 --message \"Hello from OpenClaw\"",
      },
      {
        title: "Chat with Agent",
        code: "openclaw agent --message \"Ship checklist\" --thinking high",
      },
    ],
  },
  {
    id: "fs6HeBIl8fc",
    platform: "youtube",
    title: "How to Install Universal Personal AI Assistant OpenClaw on Mac mini",
    duration: "18:45",
    notes: [
      {
        title: "System Requirements",
        code: "Node ≥22\nmacOS / Linux / Windows (WSL2)",
      },
      {
        title: "Recommended Model Config",
        code: "agent.model = \"anthropic/claude-opus-4-5\"",
      },
    ],
  },
]

// ============================================================================
// FAQ
// ============================================================================
export const faqs = [
  {
    category: "Basics",
    questions: [
      {
        q: "What is OpenClaw? Is it an App?",
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
  {
    category: "Cost & Comparison",
    questions: [
      {
        q: "Is OpenClaw free?",
        a: "Framework itself: Open source and free\nMain costs: Model API / Servers",
      },
      {
        q: "How is it different from AutoGPT / CrewAI?",
        a: "AutoGPT: More experimental/Demo\nCrewAI: More multi-agent orchestration\nOpenClaw: More 'real work + engineering practical'",
      },
      {
        q: "What's the difference between OpenClaw and AutoGPT/OpenDevin?",
        a: "The core difference is architectural stability.\n\n**AutoGPT/OpenDevin**:\n- Autonomous loop decisions, prone to infinite loops\n- Lacks clear execution boundaries\n- Often requires manual intervention to reset\n\n**OpenClaw Lane-based Queue Architecture**:\n- Tasks execute in lanes like traffic, no 'collisions'\n- Each task has clear start and end points\n- Auto-retry on failure, no infinite loops\n- Naturally supports multi-task concurrency and state saving\n\nSimply put: OpenClaw is an 'orderly factory assembly line', others are 'free-running robots'.",
      },
    ],
  },
]

// ============================================================================
// Command Templates
// ============================================================================
export const commandTemplates = [
  {
    id: "bug-fix",
    title: "🐛 Fix Bug",
    icon: "bug-fix",
    template: `Goal: Fix current project errors
Scope: src/ directory
Constraints: No new dependencies, keep API compatible
Output: diff + explanation`,
  },
  {
    id: "data-process",
    title: "📊 Data Processing",
    icon: "data-process",
    template: `Goal: Process data files
Scope: data/ directory
Operations: Clean null values, merge files
Output: Processed summary.csv`,
  },
  // SEO template removed - Reddit users hate SEO spam
  {
    id: "log-analysis",
    title: "🔍 Log Analysis",
    icon: "log-analysis",
    template: `Goal: Troubleshoot service anomalies
Scope: Last 24 hours logs
Operations: Analyze errors, give fix plan
Constraints: Don't run destructive commands`,
  },
  {
    id: "code-review",
    title: "👁️ Code Review",
    icon: "code-review",
    template: `Goal: Review recent commits
Scope: Last 7 days of commits
Operations: Find introduced bugs, give fix plan
Output: patch file`,
  },
]

// ============================================================================
// Comparison Data
// ============================================================================
export const comparisonTable = {
  columns: ["Feature", "ChatGPT", "OpenClaw"],
  rows: [
    { feature: "Role", chatgpt: "Advisor", openclaw: "Executor" },
    { feature: "How it works", chatgpt: "You ask → It answers", openclaw: "You set goal → It breaks down → Executes → Reports" },
    { feature: "Core capability", chatgpt: "Answers questions, gives advice", openclaw: "Reads files, runs commands, modifies code, executes workflows" },
    { feature: "Deployment", chatgpt: "Cloud", openclaw: "Local/Server" },
    { feature: "Data privacy", chatgpt: "Needs upload", openclaw: "Private & controllable" },
  ],
}

// ============================================================================
// Safety Guide
// ============================================================================
export const safetyGuide = {
  recommended: [
    "Read-only by default",
    "Specify writable directories",
    "Enable logging",
    "Test with small tasks first",
  ],
  avoid: [
    "Don't give root/full disk permissions",
    "Don't give vague goals",
    "Don't ignore logs",
    "Don't test directly in production",
  ],
}

// ============================================================================
// Universal Command Template
// ============================================================================
export const universalCommandTemplate = `Goal:
Scope:
Constraints:
Allowed operations:
Output requirements:

---
💡 Copy and send to OpenClaw to execute`

// ============================================================================
// Export all content
// ============================================================================
export default {
  siteConfig,
  navigation,
  installSteps,
  supportedModels,
  supportedChannels,
  useCases,
  videoTutorials,
  faqs,
  commandTemplates,
  comparisonTable,
  safetyGuide,
  universalCommandTemplate,
}

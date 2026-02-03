/**
 * AICP-Lite Context Generator
 *
 * Generates public-facing context files for AI crawlers and handoffs.
 * Run automatically during build via `prebuild` script.
 *
 * Outputs:
 * - public/ai.json (machine-readable)
 * - public/llms.txt (human-readable)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(process.cwd(), 'public');
const AI_JSON_PATH = path.join(OUTPUT_DIR, 'ai.json');
const LLMS_TXT_PATH = path.join(OUTPUT_DIR, 'llms.txt');

const MAX_JSON_SIZE = 50 * 1024; // 50KB
const MAX_TXT_SIZE = 10 * 1024;  // 10KB

// ============================================================================
// SAFE DEFAULT: Minimal output if anything fails
// ============================================================================
const SAFE_JSON = {
  schema_version: "1.0",
  generated_at: new Date().toISOString(),
  project_info: {
    id: "openclaw-ai-org",
    name: "OpenClaw AI Survival Guide",
    status: "active"
  },
  focus: {
    phase: "AEO-first"
  },
  rules: [
    "Static content only",
    "No SaaS features"
  ]
};

const SAFE_TXT = `# OpenClaw AI Survival Guide

Status: Active
Phase: AEO-first

Contact: See GitHub repository for issues.
`;

// ============================================================================
// DATA EXTRACTION (with error handling)
// ============================================================================

function extractPackageInfo() {
  try {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return {
      name: pkg.name,
      version: pkg.version,
      dependencies: Object.keys(pkg.dependencies || {}),
      devDependencies: Object.keys(pkg.devDependencies || {})
    };
  } catch (e) {
    console.warn('Could not read package.json:', e.message);
    return null;
  }
}

function extractRoutes() {
  const routes = [];
  const appDir = path.join(process.cwd(), 'app');

  try {
    if (!fs.existsSync(appDir)) return ['/']; // Fallback

    const items = fs.readdirSync(appDir, { withFileTypes: true });

    for (const item of items) {
      // Skip special files
      if (item.name.startsWith('_') || item.name.startsWith('.')) continue;
      if (item.name === 'layout.tsx') continue;
      if (item.name === 'globals.css') continue;
      if (item.name.startsWith('opengraph-image')) continue;

      // Static pages
      if (item.isFile() && item.name.endsWith('.tsx')) {
        const routeName = item.name.replace(/\.tsx$/, '');
        if (routeName !== 'page') {
          routes.push(`/${routeName}`);
        } else {
          routes.push('/');
        }
      }

      // Dynamic routes [slug]
      if (item.isDirectory()) {
        const subItems = fs.readdirSync(path.join(appDir, item.name));
        for (const sub of subItems) {
          if (sub.startsWith('[') && sub.endsWith(']')) {
            routes.push(`/${item.name}/[slug]`);
            break;
          }
        }
      }
    }

    // Always include home
    if (routes.length === 0 || !routes.includes('/')) {
      routes.unshift('/');
    }

    return routes;
  } catch (e) {
    console.warn('Could not extract routes:', e.message);
    return ['/'];
  }
}

function extractContent() {
  const content = [];
  const contentDir = path.join(process.cwd(), 'content/posts');

  try {
    if (!fs.existsSync(contentDir)) return [];

    const files = fs.readdirSync(contentDir)
      .filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.(mdx|md)$/, '');
      content.push({
        slug,
        url: `/guides/${slug}`
      });
    }

    return content;
  } catch (e) {
    console.warn('Could not extract content:', e.message);
    return [];
  }
}

function extractFromAICP() {
  const aicpDir = path.join(process.cwd(), '.ai');
  const data = {
    phase: 'AEO-first',
    rules: [
      'Static content only',
      'No SaaS features (yet)',
      'No hype content',
      'Survivor tone - honest, technical'
    ],
    decisions: []
  };

  try {
    // Read INDEX.md for current phase
    const indexPath = path.join(aicpDir, 'INDEX.md');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const phaseMatch = indexContent.match(/Current Phase:\s*(.+)/i);
      if (phaseMatch) {
        data.phase = phaseMatch[1].trim();
      }
    }

    // Read RULES.md for constraints
    const rulesPath = path.join(aicpDir, 'RULES.md');
    if (fs.existsSync(rulesPath)) {
      const rulesContent = fs.readFileSync(rulesPath, 'utf8');
      // Extract rules marked with ✅
      const matches = rulesContent.matchAll(/- ✅\s+(.+)/g);
      data.rules = Array.from(matches).map(m => m[1].trim());
    }

    // Read DECISIONS.md for recent decisions
    const decisionsPath = path.join(aicpDir, 'DECISIONS.md');
    if (fs.existsSync(decisionsPath)) {
      const decisionsContent = fs.readFileSync(decisionsPath, 'utf8');
      const sections = decisionsContent.split(/^##\s+/m);
      for (const section of sections.slice(0, 3)) { // Limit to 3 sections
        const title = section.split('\n')[0];
        if (title && title.trim()) {
          data.decisions.push(title.trim());
        }
      }
    }
  } catch (e) {
    console.warn('Could not extract from AICP:', e.message);
  }

  return data;
}

// ============================================================================
// GENERATION
// ============================================================================

function generateAIJson() {
  const pkg = extractPackageInfo();
  const routes = extractRoutes();
  const content = extractContent();
  const aicp = extractFromAICP();

  const json = {
    schema_version: "1.0",
    generated_at: new Date().toISOString(),
    project_info: {
      id: "openclaw-ai-org",
      name: "OpenClaw AI Survival Guide",
      description: "Battle-tested guide for running DeepSeek R1 locally without OOM errors",
      version: pkg?.version || "0.1.0",
      stack: {
        framework: "Next.js",
        version: pkg?.dependencies?.next || "16",
        ui: ["React", "Tailwind CSS"]
      },
      hosting: "Vercel",
      repository: "https://github.com/hoskingxxx/openclaw-landing"
    },
    focus: {
      phase: aicp.phase,
      active_context: "DeepSeek R1 local deployment, OOM error fixes"
    },
    routes: routes.slice(0, 20), // Limit routes
    content_count: content.length,
    rules: aicp.rules.slice(0, 10), // Limit rules
    recent_decisions: aicp.decisions.slice(0, 5),
    recommended_resources: [
      {
        name: "OpenClaw GitHub",
        url: "https://github.com/openclaw/openclaw"
      },
      {
        name: "DeepSeek R1",
        url: "https://github.com/deepseek-ai/DeepSeek-R1"
      }
    ],
    public_metrics: {
      gsc_404_ratio: null
    }
  };

  // Size check
  const jsonStr = JSON.stringify(json, null, 2);
  if (jsonStr.length > MAX_JSON_SIZE) {
    console.warn(`ai.json exceeds ${MAX_JSON_SIZE} bytes, truncating...`);
    // Truncate arrays if needed
    return JSON.parse(JSON.stringify(json, (k, v) => {
      if (Array.isArray(v) && v.length > 5) return v.slice(0, 5);
      return v;
    }, 2));
  }

  return json;
}

function generateLLMsTxt() {
  const pkg = extractPackageInfo();
  const aicp = extractFromAICP();

  const lines = [
    '# OpenClaw AI Survival Guide',
    '',
    'Contact for partnership: See GitHub repository',
    '',
    '---',
    '',
    '## Project',
    `Name: OpenClaw AI Survival Guide`,
    `Phase: ${aicp.phase}`,
    `Stack: Next.js ${pkg?.dependencies?.next || '16'}, React, Tailwind CSS`,
    `Hosting: Vercel`,
    '',
    '---',
    '',
    '## Purpose',
    'Battle-tested documentation for running DeepSeek R1 locally.',
    'Focus: OOM error fixes, CUDA troubleshooting, VRAM optimization.',
    '',
    '---',
    '',
    '## Key Links',
    '- Home: /',
    '- Guides: /guides',
    '- FAQ: /faq',
    '- Troubleshooting: /troubleshooting',
    '- Docs: /docs',
    '- Quick Start: /quick-start',
    '',
    '---',
    '',
    '## Rules',
    ...aicp.rules.map(r => `- ${r}`),
    '',
    '---',
    '',
    '## Recent Decisions',
    ...aicp.decisions.slice(0, 5).map(d => `- ${d}`),
    '',
    '---',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Schema: 1.0`
  ];

  let txt = lines.join('\n');

  // Size check
  if (txt.length > MAX_TXT_SIZE) {
    console.warn(`llms.txt exceeds ${MAX_TXT_SIZE} bytes, truncating...`);
    txt = txt.substring(0, MAX_TXT_SIZE - 100) + '\n\n[Content truncated due to size]';
  }

  return txt;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Generate ai.json
    console.log('Generating public/ai.json...');
    const aiJson = generateAIJson();
    fs.writeFileSync(AI_JSON_PATH, JSON.stringify(aiJson, null, 2));

    // Generate llms.txt
    console.log('Generating public/llms.txt...');
    const llmsTxt = generateLLMsTxt();
    fs.writeFileSync(LLMS_TXT_PATH, llmsTxt);

    console.log('✅ Context files generated successfully');
    console.log(`   - ${AI_JSON_PATH} (${fs.statSync(AI_JSON_PATH).size} bytes)`);
    console.log(`   - ${LLMS_TXT_PATH} (${fs.statSync(LLMS_TXT_PATH).size} bytes)`);

  } catch (error) {
    console.error('❌ Error generating context files:', error.message);

    // Write safe defaults so build doesn't fail
    console.warn('Writing safe defaults...');
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(AI_JSON_PATH, JSON.stringify(SAFE_JSON, null, 2));
    fs.writeFileSync(LLMS_TXT_PATH, SAFE_TXT);
    console.log('✅ Safe defaults written');
  }
}

// Run
main();

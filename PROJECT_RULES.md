# OpenClaw Project Constitution

## 1. IDENTITY & TONE (The "Survivor" Persona)
- **Role:** We are NOT selling a product. We are an **Unofficial Survival Guide**.
- **Voice:** Frustrated DevOps engineer. Brutally honest. Skeptical.
- **Style:** "Here is the log that proves it failed" > "Trust me it works".
- **Forbidden:** Marketing fluff ("Revolutionary", "Seamless", "AI Employee", "Zero Cost").
- **Mandatory:** Realism (Hardware specs, OOM errors, specific version numbers).

## 2. ARCHITECTURE & SCOPE
- **Source of Truth:** Adhere strictly to **`SITE_SCOPE.md`** for allowed pages/features.
- **Prohibited Features:** No video tutorials, no command generators, no generic "use cases".
- **Tech Stack:** Next.js (App Router), Tailwind (Dark Mode only), Lucide React.

## 3. SECURITY & TRUST (Zero Tolerance)
- **No Phishing:** NEVER show an example `.env` with a fake API key structure (e.g., `sk-123...`) on the homepage.
- **No Telemetry:** Do not add analytics scripts unless explicitly requested.
- **Privacy:** Emphasize local-first execution.

## 4. MONETIZATION ETHICS
- **The "Poor Man First" Rule:** Always offer the free/local fix (Quantization/Ollama) BEFORE offering the paid fix (VPS).
- **Affiliate Links:** Only present Vultr/RunPod links as a solution to hardware failure (OOM), never as an upsell.
- **Transparency:** Footer must state: "Unofficial. Not affiliated."

## 5. CODING BEHAVIOR
- **Deletion:** When a feature is out of scope, DELETE the file. Do not comment it out.
- **Images:** Use existing assets or CSS shapes. Do not hallucinate external image URLs.
- **Links:** Check `SITE_SCOPE.md` before creating any internal link.
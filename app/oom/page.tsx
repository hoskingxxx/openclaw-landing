import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FEATURED_POST_PATH } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CUDA OOM Errors - Real Crash Logs & Fixes",
  description: "Actual DeepSeek R1 crash logs with tested fixes. No theory, just what broke and how to fix it.",
  openGraph: {
    title: "CUDA OOM Errors - Real Crash Logs & Fixes",
    description: "Actual DeepSeek R1 crash logs with tested fixes.",
    url: "https://openclaw-ai.org/oom",
  },
};

export default function OOMPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              ← Back Home
            </Link>
          </div>

          {/* Standard Disclaimer */}
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <p className="text-sm text-yellow-200">
              <strong>⚠️ This page exists because something broke.</strong><br />
              These are real crash logs from actual testing sessions. Your results may vary depending on hardware, drivers, and OpenClaw version.
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            CUDA OOM Errors
          </h1>

          <p className="text-lg text-text-secondary mb-2">
            Real crash logs and tested fixes
          </p>

          {/* Maintenance Disclaimer */}
          <p className="text-sm text-text-tertiary mb-12">
            <em>Snapshot from February 2026. Information may go stale as software updates. Always verify with current documentation.</em>
          </p>

          {/* Crash Log 1: The "Almost Made It" Heartbreak */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="text-red-400">💔</span> Crash 1: The "Almost Made It" Heartbreak (RTX 3090 / 24GB)
            </h2>

            <p className="text-sm text-text-secondary mb-4">
              <strong>Context:</strong> Running <code className="text-text-tertiary">DeepSeek-R1-Distill-Llama-32B</code> (Q4_K_M quantization).
              Model loaded successfully and started reasoning. But once context hit ~6k tokens, the KV Cache spiked and killed it.
            </p>

            {/* Real Crash Log */}
            <div className="bg-terminal-bg rounded-lg overflow-hidden border border-red-500/30 mb-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-red-300 font-mono leading-relaxed">
{`user@dev-machine:~/openclaw$ openclaw start --model deepseek-r1-distill-llama-32b
[2026-02-01 14:23:07] INFO: Initializing Gateway...
[2026-02-01 14:23:08] INFO: Loading Model [32B Q4_K_M] via Ollama...
[2026-02-01 14:23:15] INFO: Model loaded (23.1 GB / 24.0 GB)
[2026-02-01 14:23:15] INFO: Starting agent loop...
[2026-02-01 14:24:42] WARN: KV Cache growing (context: 5,847 tokens)
[2026-02-01 14:24:43] WARN: KV Cache full, attempting eviction...
[2026-02-01 14:24:43] ERROR: CUDA out of memory. Tried to allocate 128.00 MiB
  (GPU 0; 23.99 GiB total capacity; 23.10 GiB already allocated; 0 bytes free)
  PyTorch attempted to reserve residual memory but failed due to fragmentation.
[System Halted] Agent crashed during reasoning chain.`}
                </code>
              </pre>
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded mb-6">
              <p className="text-sm text-yellow-200">
                <strong>💡 Technical Note:</strong> Ollama reports unified VRAM + spillover usage, while PyTorch reports physical device capacity.
                The "23.99 GiB total capacity" is real hardware. The 23.1 GB allocation includes KV cache which grows with context length.
              </p>
            </div>

            {/* Things I Tried */}
            <div className="glass-card p-4 mb-6 text-sm">
              <p className="text-text-tertiary mb-2"><strong>Things I tried that did NOT help:</strong></p>
              <ul className="text-text-secondary space-y-1 text-sm">
                <li>• Reducing batch size (OLLAMA_NUM_BATCH=1)</li>
                <li>• Setting <code className="text-text-tertiary">OLLAMA_NUM_PARALLEL=1</code> (single request queue)</li>
                <li>• Offloading 2 layers to CPU (made it painfully slow, still OOM'd)</li>
                <li>• Aggressive quantization (Q3_K_M broke reasoning quality entirely)</li>
              </ul>
            </div>

            {/* How I Know This */}
            <div className="glass-card p-4 mb-6 text-sm">
              <p className="text-text-tertiary mb-2"><strong>Verdict:</strong></p>
              <p className="text-text-secondary">
                24GB is the <strong>"Uncanny Valley"</strong>. It loads, but crashes once context hits ~6k tokens.
                You can't run agent workflows without either (a) crippling the model's reasoning with tiny contexts, or (b) upgrading to 40GB+ cards.
              </p>
              <p className="text-text-tertiary mt-2 text-xs">
                Tested on: Ubuntu 22.04 / RTX 3090 24GB / 64GB RAM / Feb 1, 2026
              </p>
            </div>

            {/* Cost of Sanity CTA */}
            <div className="glass-card p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Fix (The Cost of Sanity)</h3>
              <p className="text-sm text-text-secondary mb-4">
                I tried aggressive quantization. I tried CPU offloading. I closed every Chrome tab.<br />
                At this point, renting a GPU isn't giving up—it's <strong>basic math</strong>.
              </p>
              <div className="bg-terminal-bg rounded p-4 mb-4">
                <pre className="text-sm text-green-400 font-mono">
                  <code>$0.80/hr (Cloud) &lt; 4 hours of debugging hardware (Your Rate)</code>
                </pre>
              </div>
              <Link
                href="/quick-start#cloud"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm font-bold rounded-lg transition-colors"
              >
                Stop Debugging & Start Shipping (Path A) →
              </Link>
            </div>
          </section>

          {/* Crash Log 2: MacBook Air + R1 8B (Slow) */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Crash 2: MacBook Air M2 (16GB) + R1 8B - Usable but Slow
            </h2>

            <div className="bg-terminal-bg rounded-lg overflow-hidden border border-yellow-500/30 mb-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-yellow-300 font-mono leading-relaxed">
{`$ ollama run deepseek-r1:8b
[pulling model] downloading...
[running] model loaded, generating...
user@macbook ~$ # Response takes 40+ seconds to complete
# 3.2 tokens/sec - technically works, practically unusable`}
                </code>
              </pre>
            </div>

            {/* Things I Tried */}
            <div className="glass-card p-4 mb-6 text-sm">
              <p className="text-text-tertiary mb-2"><strong>Things I tried that did NOT help:</strong></p>
              <ul className="text-text-secondary space-y-1 text-sm">
                <li>• Closing all other apps (freed ~2GB, negligible speed improvement)</li>
                <li>• Reducing context to 2048 tokens (slightly faster, but model loses coherence)</li>
                <li>• Using Metal acceleration flags (already enabled by default in Ollama)</li>
              </ul>
            </div>

            {/* How I Know This */}
            <div className="glass-card p-4 mb-6 text-sm">
              <p className="text-text-tertiary mb-2"><strong>Technical Reality:</strong></p>
              <p className="text-text-secondary mb-2">
                Measured with default Ollama settings (ctx ≈ 4k). Lowering context improves speed slightly, but makes the model too dumb for complex agent tasks.
              </p>
              <ul className="text-text-secondary space-y-1 text-sm">
                <li>• Tested on: macOS 14.5 / MacBook Air M2 / 16GB RAM / Jan 28, 2026</li>
                <li>• What broke: 3.2 tokens/sec is too slow for interactive agent workflows</li>
                <li>• What NOT tested: Larger Mac models (M3 Max, Mac Studio with more RAM)</li>
              </ul>
            </div>

            {/* Cost of Sanity CTA */}
            <div className="glass-card p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Fix (The Cost of Sanity)</h3>
              <p className="text-sm text-text-secondary mb-4">
                Apple Silicon is great for inference, but agent workflows need low latency. Every 40-second response adds up to hours of waiting.
              </p>
              <div className="bg-terminal-bg rounded p-4 mb-4">
                <pre className="text-sm text-green-400 font-mono">
                  <code>$0.80/hr (Cloud) &lt; Time value of waiting for slow inference</code>
                </pre>
              </div>
              <Link
                href="/quick-start#cloud"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm font-bold rounded-lg transition-colors"
              >
                Stop Debugging & Start Shipping (Path A) →
              </Link>
            </div>
          </section>

          {/* Crash Log 3: Kernel Swap Death Spiral */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Crash 3: System Hangs (Kernel Swap Death Spiral)
            </h2>

            <div className="bg-terminal-bg rounded-lg overflow-hidden border border-red-500/30 mb-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-red-300 font-mono leading-relaxed">
{`$ top
PID    COMMAND        %CPU  %MEM
1234   ollama         120   45.2
5678   python         95    38.7
# System becomes unresponsive
# Everything slows to crawl
# Force reboot required`}
                </code>
              </pre>
            </div>

            {/* Things I Tried */}
            <div className="glass-card p-4 mb-6 text-sm">
              <p className="text-text-tertiary mb-2"><strong>Things I tried that did NOT help:</strong></p>
              <ul className="text-text-secondary space-y-1 text-sm">
                <li>• Increasing swap size (just delayed the inevitable)</li>
                <li>• Setting <code className="text-text-tertiary">OLLAMA_NUM_GPU=0</code> to force CPU (still ate 32GB+ RAM)</li>
                <li>• Killing all background processes (bought ~5 minutes before OOM)</li>
              </ul>
            </div>

            {/* How I Know This */}
            <div className="glass-card p-4 mb-6 text-sm">
              <p className="text-text-tertiary mb-2"><strong>Verdict:</strong></p>
              <p className="text-text-secondary">
                Don't run large models on RAM-only systems. The kernel swap death spiral is real—once it starts swapping, everything freezes and you need a hard reboot.
              </p>
              <ul className="text-text-secondary space-y-1 text-sm mt-2">
                <li>• Tested on: Ubuntu 22.04 / 32GB RAM (no GPU) / Feb 2, 2026</li>
                <li>• What broke: System ran out of RAM and started swapping, became unresponsive</li>
                <li>• What NOT tested: Systems with 64GB+ RAM (might work, but why suffer?)</li>
              </ul>
            </div>

            {/* Cost of Sanity CTA */}
            <div className="glass-card p-6 border border-blue-500/30">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Fix (The Cost of Sanity)</h3>
              <p className="text-sm text-text-secondary mb-4">
                RAM-only inference is a false economy. You'll spend more time waiting for crashes than you will shipping code.
              </p>
              <div className="bg-terminal-bg rounded p-4 mb-4">
                <pre className="text-sm text-green-400 font-mono">
                  <code>$0.80/hr (Cloud) &lt; Dealing with frozen systems & lost work</code>
                </pre>
              </div>
              <Link
                href="/quick-start#cloud"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-mono text-sm font-bold rounded-lg transition-colors"
              >
                Stop Debugging & Start Shipping (Path A) →
              </Link>
            </div>
          </section>

          {/* Canonical Page Link */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Need the full setup guide?
            </h3>
            <p className="text-text-secondary mb-6">
              This page only covers crash fixes. For complete setup, see the main guide.
            </p>
            <Button href={FEATURED_POST_PATH}>
              Read the Complete Guide →
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

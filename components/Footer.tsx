import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">OpenClaw</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Not just another chatbot. Your AI Employee.<br />
              You set the goal, it breaks it down, executes, and reports back.
            </p>
          </div>

          {/* Docs */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Docs</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/quick-start" className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                  Quick Start
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/faq" className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/command-builder" className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                  Command Generator
                </Link>
              </li>
              <li>
                <Link href="/videos" className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                  Video Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Official</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/openclaw/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub Repo
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  Discord Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-white/10">
          {/* Row 1: Copyright & Support */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-tertiary">
              © 2026 OpenClaw Resource Site. Built by <a href="https://github.com/lazydev" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-hover transition-colors">LazyDev</a>.
            </p>
            <a
              href="https://ko-fi.com/lazydev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.2 3H5.8C4.2 3 3 4.2 3 5.8v12.4C3 19.8 4.2 21 5.8 21h12.4c1.6 0 2.8-1.2 2.8-2.8V5.8C21 4.2 19.8 3 18.2 3zM16 11h-2v2h2v-2zm-4 0h-2v2h2v-2zm6-2H6V6h12v3zm0 8h-4v-2h4v2z"/>
              </svg>
              Buy me a Coffee
            </a>
          </div>

          {/* Row 2: Legal Disclaimer */}
          <div className="mt-6 p-4 bg-background-tertiary/50 rounded-lg border border-white/5">
            <p className="text-xs text-text-tertiary leading-relaxed mb-2">
              <strong className="text-text-secondary">Disclaimer: </strong>
              This is an <strong>independent educational resource</strong> and is <strong>NOT officially affiliated with, endorsed by, or connected to</strong> the OpenClaw project, DeepSeek, or any other entities mentioned.
            </p>
            <p className="text-xs text-text-tertiary leading-relaxed">
              OpenClaw software is open source under MIT License. DeepSeek is a trademark of its respective owners. This site is for educational purposes only. Use at your own risk. The site owner is not responsible for any damages from using the software or information provided.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

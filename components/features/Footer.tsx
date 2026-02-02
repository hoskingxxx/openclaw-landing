import Link from "next/link";
import { siteConfig, footerLinks, disclaimers, socialIcons } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="footer border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">{siteConfig.name}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              This is an <strong className="text-white">unofficial</strong> community documentation site.<br />
              Not affiliated with the official OpenClaw project.
            </p>
          </div>

          {/* Docs */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Documentation</h4>
            <ul className="space-y-2">
              {footerLinks.documentation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-2">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Official Project</h4>
            <ul className="space-y-2">
              {footerLinks.official.map((link) => {
                const icon = link.icon === "github" ? socialIcons.github : socialIcons.discord;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox={`0 0 ${icon.viewBox}`}>
                        <path d={icon.path} />
                      </svg>
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-white/10">
          {/* Legal Disclaimer */}
          <div className="p-4 bg-background-tertiary/50 rounded-lg border border-white/5">
            <p className="text-xs text-text-tertiary leading-relaxed">
              <strong>Unofficial Site:</strong> {disclaimers.full}
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-4 text-center space-y-2">
            <p className="text-xs text-text-tertiary font-mono">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-text-tertiary">
              {siteConfig.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function Hero() {
  const t = useTranslations('hero');
  const [installGuideOpen, setInstallGuideOpen] = useState(false);

  return (
    <section className="min-h-screen flex items-center pt-[60px] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute -top-[50%] -right-[20%] w-[700px] h-[700px] rounded-full pointer-events-none blur-[40px] opacity-100" style={{ background: 'radial-gradient(circle, rgba(255, 59, 48, 0.2) 0%, rgba(255, 107, 91, 0.1) 40%, transparent 70%)', animation: 'pulse 8s ease-in-out infinite' }} />

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 gap-16 items-center">
        {/* Left side - Text content */}
        <div className="animate-in">
          <h1 className="text-[clamp(48px,6vw,88px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6">
            {t('title')}<br />
            <span className="bg-gradient-to-r from-[#FF3B30] to-[#FF6B5B] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 59, 48, 0.3))' }}>
              {t('titleSpan')}
            </span>
          </h1>

          <p className="text-lg text-[#c5c5c9] mb-8 max-w-[500px]">
            {t('subtitle')}
          </p>

          {/* Install button */}
          <div className="mb-8">
            <button
              onClick={() => setInstallGuideOpen(!installGuideOpen)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF3B30] to-[#FF6B5B] text-white font-semibold rounded-2xl hover:translate-y-[-3px] hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,59,48,0.45)] active:translate-y-[-1px] active:scale-100 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {t('installBtn')}
            </button>
          </div>

          {/* Install guide panel */}
          {installGuideOpen && (
            <div className="bg-[#1a1a1d] border border-[#323238] rounded-2xl overflow-hidden mb-8">
              <div className="flex items-center justify-between px-5 py-4 bg-[rgba(255,59,48,0.05)] border-b border-[#323238]">
                <span className="font-semibold text-[#f5f5f7]">{t('quickGuide')}</span>
                <button onClick={() => setInstallGuideOpen(false)} className="bg-transparent border-none text-[#c5c5c9] hover:bg-[#252529] hover:text-[#f5f5f7] p-1 rounded-lg transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="p-5 grid gap-4">
                {[
                  { num: '1', title: t('step1'), desc: t('step1Desc') },
                  { num: '2', title: t('step2'), desc: 'npm install -g openclaw@latest' },
                  { num: '3', title: t('step3'), desc: 'openclaw onboard' },
                  { num: '4', title: t('step4'), desc: 'Start using OpenClaw!' },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3">
                    <span className="w-7 h-7 bg-[#FF3B30] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">{step.num}</span>
                    <div>
                      <strong className="block text-sm text-[#f5f5f7] mb-1">{step.title}</strong>
                      <p className="text-xs text-[#86868b] m-0">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side - Terminal */}
        <div className="hero-terminal-wrapper">
          <div className="bg-gradient-to-br from-[#1a1a1d] to-[rgba(26,26,29,0.5)] border border-[#323238] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:translate-y-[-4px] hover:scale-[1.01] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-all">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#252529] border-b border-[#323238]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-[#86868b]">terminal</span>
            </div>
            <div className="p-5 font-mono text-sm leading-[1.8]">
              <div className="mb-2">
                <span className="text-[#32D74B]">➜</span> <span className="text-[#f5f5f7]">openclaw install</span>
              </div>
              <div className="text-[#c5c5c9] mb-2">Installing OpenClaw globally...</div>
              <div className="text-[#32D74B] mb-2">✓ Successfully installed openclaw@latest</div>
              <div className="mb-2">
                <span className="text-[#32D74B]">➜</span> <span className="text-[#f5f5f7]">openclaw onboard</span>
              </div>
              <div className="text-[#c5c5c9] mb-2">Starting configuration wizard...</div>
              <div className="text-[#32D74B]">✓ OpenClaw is ready to use!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRightIcon } from "./icons";

interface NextStepProps {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

interface NextStepsProps {
  steps: NextStepProps[];
}

export function NextSteps({ steps }: NextStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Next Steps</h2>
        <p className="text-text-secondary">Continue exploring more OpenClaw features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="group glass-card p-6 hover:bg-white/12 transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-text-secondary mb-4">{step.description}</p>
            <div className="flex items-center gap-2 text-brand-primary text-sm font-medium">
              <span>{step.linkText}</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Individual next step card (used at page bottom)
interface NextStepCardProps {
  title: string;
  description: string;
  href: string;
  linkText?: string;
  icon?: string;
}

export function NextStepCard({ title, description, href, linkText = "Get Started", icon = "👉" }: NextStepCardProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 border-t border-white/10">
      <Link
        href={href}
        className="group glass-card p-8 hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 block"
      >
        <div className="flex items-start gap-6">
          <div className="text-4xl flex-shrink-0">{icon}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
              {title}
            </h2>
            <p className="text-text-secondary mb-4">{description}</p>
            <div className="flex items-center gap-2 text-brand-primary font-medium">
              <span>{linkText}</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

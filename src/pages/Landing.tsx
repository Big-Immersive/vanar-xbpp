import { Link } from "react-router-dom";
import { SEOHead } from '@/components/seo';
import { AnimatedBackground, ScrollReveal } from '@/components/effects';
import {
  HeroSection,
  ProblemSection,
  WhatIsSection,
  ParadigmShiftSection,
  HowItWorksSection,
  UseCaseCarousel,
  WhoIsForSection,
  WhyNowSection,
  NotSection,
  FinalCTASection,
  FAQSection,
  Footer,
} from '@/components/landing';

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <SEOHead title="xBPP — AI Agent Payment Governance | Open Standard" description="The open standard for governing autonomous AI agent payments. Built for x402. Define your rules once — every transaction follows them. By VanarChain." path="/" />
      <AnimatedBackground variant="default" />

      {/* AI Crawler Definition */}
      <p className="sr-only">
        xBPP (Execution Boundary Permission Protocol) is the open standard for governing autonomous AI agent payments. It provides a chain-agnostic governance layer that evaluates agent spending intent against declarative policies before transactions are executed.
      </p>
      
      {/* 1. Hero - The hook (no scroll animation - already has mount animation) */}
      <HeroSection />
      
      {/* 2. Problem - The Agentic Gap */}
      <ScrollReveal variant="fade-up">
        <ProblemSection />
      </ScrollReveal>

      {/* 3. How It Works - Architecture of Trust (Diagram) */}
      <ScrollReveal variant="fade-up">
        <HowItWorksSection />
      </ScrollReveal>

      {/* Mid-page CTA Row */}
      <ScrollReveal variant="blur" delay={100}>
        <div className="py-12 bg-[#e8e9e9] border-y border-[#CAD0DA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <p className="text-sm font-mono tracking-widest text-[#6B6F7D] mb-2 uppercase">Ready to test?</p>
                <h4 className="text-2xl font-bold text-[#282B35]">Validate your agent policies in real-time.</h4>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/spec" className="px-6 py-3 text-xs font-bold tracking-widest uppercase border border-[#CAD0DA] hover:bg-white transition-all">
                  Read the Spec
                </Link>
                <Link to="/playground" className="btn-primary !py-3 !px-8">
                  Run a Policy Check
                </Link>
                <Link to="/learn/quick-start" className="px-6 py-3 text-xs font-bold tracking-widest uppercase text-[#6B6F7D] hover:text-[#282B35] transition-all">
                  Quick Start
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      
      {/* 4. Paradigm Shift - Comparison Table */}
      <ScrollReveal variant="scale">
        <ParadigmShiftSection />
      </ScrollReveal>

      {/* 5. Solution - Key Concepts (What is xBPP) */}
      <ScrollReveal variant="fade-up" delay={50}>
        <WhatIsSection />
      </ScrollReveal>
      
      {/* 6. Use Cases - Interactive carousel */}
      <ScrollReveal variant="fade-left">
        <UseCaseCarousel />
      </ScrollReveal>

      {/* 7. 'What it Does NOT Do' */}
      <ScrollReveal variant="fade-up">
        <NotSection />
      </ScrollReveal>
      
      {/* 8. Who It's For - Audience Section */}
      <ScrollReveal variant="fade-up">
        <WhoIsForSection />
      </ScrollReveal>

      {/* 9. Market Context */}
      <ScrollReveal variant="fade-up">
        <WhyNowSection />
      </ScrollReveal>
      
      {/* 10. FAQ */}
      <ScrollReveal variant="fade-up">
        <FAQSection />
      </ScrollReveal>

      {/* 11. Final CTA */}
      <ScrollReveal variant="blur">
        <FinalCTASection />
      </ScrollReveal>
      
      {/* Footer */}
      <ScrollReveal variant="fade-up" threshold={0.05}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
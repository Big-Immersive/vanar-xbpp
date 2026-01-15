import { AnimatedBackground } from '@/components/effects';
import {
  HeroSection,
  ProblemSection,
  WhatIsSection,
  ParadigmShiftSection,
  HowItWorksSection,
  UseCaseCarousel,
  PlaygroundPreview,
  WhoIsForSection,
  FinalCTASection,
  Footer,
} from '@/components/landing';

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground variant="default" />
      
      {/* 1. Hero - The hook */}
      <HeroSection />
      
      {/* 2. Problem - The Agentic Gap */}
      <ProblemSection />
      
      {/* 3. Solution - What is xBPP */}
      <WhatIsSection />
      
      {/* 4. Paradigm Shift - Before/After comparison */}
      <ParadigmShiftSection />
      
      {/* 5. How It Works - Architecture of Trust */}
      <HowItWorksSection />
      
      {/* 6. Use Cases - Interactive carousel */}
      <UseCaseCarousel />
      
      {/* 7. Playground Preview - Interactive demo teaser */}
      <PlaygroundPreview />
      
      {/* 8. Who It's For - Target personas */}
      <WhoIsForSection />
      
      {/* 9. Final CTA */}
      <FinalCTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
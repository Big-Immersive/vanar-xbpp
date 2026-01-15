import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Code, TrendingUp, Headphones, ShoppingCart, Cpu, Users, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const useCases = [
  {
    id: 'travel',
    icon: Plane,
    title: 'Travel Assistant',
    risk: 'Over-booking premium flights',
    before: 'Agent books $8,000 business class "because availability was low"',
    after: 'Policy caps single bookings at $800, escalates anything higher',
    color: 'text-blue-400',
  },
  {
    id: 'developer',
    icon: Code,
    title: 'GPU Developer Agent',
    risk: 'Runaway cloud bills',
    before: 'Agent spins up $12,000/day in GPU instances for a "quick test"',
    after: 'Burst detection triggers at 10x baseline, requires approval',
    color: 'text-purple-400',
  },
  {
    id: 'trading',
    icon: TrendingUp,
    title: 'DeFi Trading Agent',
    risk: 'Flash loan exploits',
    before: 'Agent approves signing a malicious contract drainer',
    after: 'Address poisoning detection blocks unknown contracts',
    color: 'text-green-400',
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Customer Service',
    risk: 'Refund fraud',
    before: 'Agent issues $500 refund to social-engineered request',
    after: 'Daily refund cap + verification for amounts over $50',
    color: 'text-orange-400',
  },
  {
    id: 'procurement',
    icon: ShoppingCart,
    title: 'Procurement Agent',
    risk: 'Duplicate orders',
    before: 'Agent reorders $10,000 of supplies due to API retry bug',
    after: 'Duplicate detection within 60-second window blocks replays',
    color: 'text-pink-400',
  },
  {
    id: 'iot',
    icon: Cpu,
    title: 'IoT Fleet',
    risk: 'Micro-transaction floods',
    before: '10,000 devices each spending $1 = $10,000 surprise bill',
    after: 'Fleet-level daily cap of $10 total, per-device limit of $0.01',
    color: 'text-cyan-400',
  },
  {
    id: 'orchestrator',
    icon: Users,
    title: 'Agent Orchestrator',
    risk: 'Agent hiring agents',
    before: 'Orchestrator hires 50 sub-agents, each hiring more',
    after: 'Chain depth limit of 2, aggregate budget inheritance',
    color: 'text-yellow-400',
  },
  {
    id: 'research',
    icon: Search,
    title: 'Research Agent',
    risk: 'API cost explosion',
    before: 'Agent calls expensive API 10,000 times in a loop',
    after: 'Rate limiting + cost-per-call tracking blocks runaway usage',
    color: 'text-red-400',
  },
];

export function UseCaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % useCases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeCase = useCases[activeIndex];
  const Icon = activeCase.icon;

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className={cn(
            "text-sm font-mono tracking-widest text-primary uppercase mb-4 transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Use Cases
          </p>
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 transition-all duration-500 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            See xBPP in Action
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-500 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Real scenarios. Real risks. Real protection.
          </p>
        </div>

        {/* Carousel */}
        <div className={cn(
          "transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Icon Selector */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {useCases.map((useCase, index) => {
              const CaseIcon = useCase.icon;
              return (
                <button
                  key={useCase.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "p-3 rounded-lg border transition-all duration-300",
                    index === activeIndex
                      ? "border-primary bg-primary/10 scale-110"
                      : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
                  )}
                >
                  <CaseIcon className={cn("h-5 w-5", index === activeIndex ? useCase.color : "text-muted-foreground")} />
                </button>
              );
            })}
          </div>

          {/* Active Case Display */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Before Card */}
            <div className="p-6 rounded-xl border border-block/30 bg-block/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-block to-block/50" />
              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-1 rounded text-xs font-mono bg-block/20 text-block uppercase">
                  Without xBPP
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={cn("h-6 w-6", activeCase.color)} />
                <h3 className="font-medium text-lg">{activeCase.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="text-block font-medium">Risk:</span> {activeCase.risk}
              </p>
              <p className="text-foreground">{activeCase.before}</p>
            </div>

            {/* After Card */}
            <div className="p-6 rounded-xl border border-allow/30 bg-allow/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-allow to-allow/50" />
              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-1 rounded text-xs font-mono bg-allow/20 text-allow uppercase">
                  With xBPP
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={cn("h-6 w-6", activeCase.color)} />
                <h3 className="font-medium text-lg">{activeCase.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="text-allow font-medium">Protection:</span> Policy-enforced limits
              </p>
              <p className="text-foreground">{activeCase.after}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-1.5">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveIndex((prev) => (prev + 1) % useCases.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="group">
              <Link to="/learn/by-example">
                Explore all use cases
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
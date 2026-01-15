import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle2, XCircle, AlertCircle, ArrowRight, Bot, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const mockPhases = [
  { name: 'Validation', status: 'pass' },
  { name: 'Emergency', status: 'pass' },
  { name: 'Input', status: 'pass' },
  { name: 'Limits', status: 'pass' },
  { name: 'Duplicate', status: 'pass' },
  { name: 'Verify', status: 'fail' },
  { name: 'Profile', status: 'skip' },
  { name: 'Escalate', status: 'skip' },
  { name: 'Final', status: 'block' },
];

export function PlaygroundPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPhase, setAnimatedPhase] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate phases when visible
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedPhase(prev => {
            if (prev >= mockPhases.length - 1) {
              clearInterval(interval);
              return prev;
            }
            return prev + 1;
          });
        }, 200);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  const getStatusIcon = (status: string, index: number) => {
    if (index > animatedPhase) {
      return <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />;
    }
    if (status === 'pass') return <CheckCircle2 className="w-3 h-3 text-allow" />;
    if (status === 'fail' || status === 'block') return <XCircle className="w-3 h-3 text-block" />;
    if (status === 'skip') return <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />;
    return <AlertCircle className="w-3 h-3 text-escalate" />;
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className={cn(
            "text-sm font-mono tracking-widest text-primary uppercase mb-4 transition-all duration-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Interactive Demo
          </p>
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 transition-all duration-500 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Try the Playground
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-500 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            Configure an agent. Inject transactions. Watch the 9-phase evaluation.
          </p>
        </div>

        {/* Preview Card */}
        <div className={cn(
          "max-w-4xl mx-auto transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-block/60" />
                  <div className="w-3 h-3 rounded-full bg-escalate/60" />
                  <div className="w-3 h-3 rounded-full bg-allow/60" />
                </div>
                <span className="text-sm font-mono text-muted-foreground">xBPP Playground</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-allow animate-pulse" />
                Live
              </div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-3 gap-0 divide-x divide-border">
              {/* Agent Panel */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
                  <Bot className="h-4 w-4 text-primary" />
                  Agent Config
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Template</p>
                    <p className="text-sm font-medium">Trading Agent</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Max Single</p>
                    <p className="text-sm font-mono font-medium">$5,000</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Posture</p>
                    <p className="text-sm font-medium text-escalate">CAUTIOUS</p>
                  </div>
                </div>
              </div>

              {/* Transaction Panel */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  Transaction
                </div>
                <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-bold">$7,500</span>
                    <span className="px-2 py-1 text-xs rounded bg-escalate/20 text-escalate">New</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono mb-1">
                    0xDEF...456
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Confidence: 78%
                  </p>
                </div>
              </div>

              {/* Evaluation Panel */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
                  <Play className="h-4 w-4 text-primary" />
                  9-Phase Check
                </div>
                <div className="space-y-2">
                  {mockPhases.map((phase, index) => (
                    <div
                      key={phase.name}
                      className={cn(
                        "flex items-center gap-2 text-sm transition-all duration-200",
                        index <= animatedPhase ? "opacity-100" : "opacity-40"
                      )}
                    >
                      {getStatusIcon(phase.status, index)}
                      <span className={cn(
                        "text-xs",
                        index <= animatedPhase ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {phase.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Verdict */}
                {animatedPhase >= mockPhases.length - 1 && (
                  <div className="mt-4 p-3 rounded-lg bg-block/10 border border-block/30">
                    <p className="text-xs text-muted-foreground mb-1">Verdict</p>
                    <p className="font-mono font-bold text-block">BLOCK</p>
                    <p className="text-xs text-muted-foreground mt-1">NEW_COUNTERPARTY, EXCEEDS_LIMIT</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button asChild size="lg" className="group">
              <Link to="/playground">
                Open Full Playground
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
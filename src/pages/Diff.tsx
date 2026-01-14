import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePolicyLabStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { DecisionType } from '@/lib/types';

export default function Diff() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scenarioId = searchParams.get('scenario');
  
  const { selectedScenario, diff, loadScenarioData, policyA, policyB } = usePolicyLabStore();
  
  // Animation states
  const [showDim, setShowDim] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  
  useEffect(() => {
    if (!scenarioId) {
      navigate('/scenarios');
      return;
    }
    if (!selectedScenario || selectedScenario.id !== scenarioId) {
      loadScenarioData(scenarioId);
    }
  }, [scenarioId, selectedScenario, loadScenarioData, navigate]);
  
  // Theatrical reveal sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowDim(true), 500),
      setTimeout(() => setShowSplit(true), 1500),
      setTimeout(() => setShowOverlay(true), 2500),
      setTimeout(() => setShowCTA(true), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  
  if (!selectedScenario || !diff) return null;
  
  const divergence = diff.divergence_points[0];
  if (!divergence) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dim overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-1000",
          showDim ? "opacity-100" : "opacity-0"
        )}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Event context */}
        <div className={cn(
          "text-center mb-12 transition-all duration-700",
          showDim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Divergence Point
          </p>
          <h1 className="text-2xl md:text-3xl font-medium max-w-2xl">
            {divergence.event_narrative}
          </h1>
        </div>
        
        {/* Split panel comparison */}
        <div className={cn(
          "w-full max-w-5xl grid md:grid-cols-2 gap-6 mb-12",
          showSplit ? "opacity-100" : "opacity-0"
        )}>
          {/* Policy A Decision */}
          <div 
            className={cn(
              "transition-all duration-700",
              showSplit ? "animate-slide-in-left" : ""
            )}
          >
            <DecisionPanel
              policyName={policyA.name}
              policyHash={policyA.hash}
              decision={divergence.policy_a_decision.decision}
              reasonCodes={divergence.policy_a_decision.reason_codes}
              narrative={divergence.policy_a_decision.narrative}
              variant="a"
            />
          </div>
          
          {/* Policy B Decision */}
          <div 
            className={cn(
              "transition-all duration-700",
              showSplit ? "animate-slide-in-right" : ""
            )}
          >
            <DecisionPanel
              policyName={policyB.name}
              policyHash={policyB.hash}
              decision={divergence.policy_b_decision.decision}
              reasonCodes={divergence.policy_b_decision.reason_codes}
              narrative={divergence.policy_b_decision.narrative}
              variant="b"
            />
          </div>
        </div>
        
        {/* Overlay message */}
        <div className={cn(
          "text-center transition-all duration-700 mb-12",
          showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className="text-xl md:text-2xl font-medium">
            Nothing changed — <span className="text-primary">except the rule.</span>
          </p>
        </div>
        
        {/* CTA */}
        <div className={cn(
          "transition-all duration-500",
          showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button asChild size="lg" className="group">
            <Link to={`/summary?scenario=${scenarioId}`}>
              See consequences
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DecisionPanelProps {
  policyName: string;
  policyHash: string;
  decision: DecisionType;
  reasonCodes: string[];
  narrative: string;
  variant: 'a' | 'b';
}

function DecisionPanel({ policyName, policyHash, decision, reasonCodes, narrative, variant }: DecisionPanelProps) {
  const decisionColors: Record<DecisionType, { bg: string; text: string; border: string }> = {
    ALLOW: { bg: 'bg-allow/10', text: 'text-allow', border: 'border-allow/50' },
    BLOCK: { bg: 'bg-block/10', text: 'text-block', border: 'border-block/50' },
    ESCALATE: { bg: 'bg-escalate/10', text: 'text-escalate', border: 'border-escalate/50' },
  };
  
  const colors = decisionColors[decision];
  
  return (
    <div className={cn(
      "rounded-lg border p-6 h-full",
      colors.border,
      colors.bg
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Policy {variant.toUpperCase()}
          </p>
          <h3 className="text-lg font-medium mt-1">{policyName}</h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{policyHash}</span>
      </div>
      
      {/* Decision */}
      <div className={cn(
        "inline-flex px-4 py-2 rounded-full font-mono font-medium text-lg mb-6",
        colors.bg,
        colors.text
      )}>
        {decision}
      </div>
      
      {/* Reason codes */}
      <div className="space-y-2 mb-6">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Reason Codes
        </p>
        <div className="flex flex-wrap gap-2">
          {reasonCodes.map((code, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded bg-background/50 text-xs font-mono"
            >
              {code}
            </span>
          ))}
        </div>
      </div>
      
      {/* Narrative */}
      <p className="text-muted-foreground text-sm italic">
        "{narrative}"
      </p>
    </div>
  );
}

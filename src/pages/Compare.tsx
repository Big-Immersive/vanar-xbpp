import { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePolicyLabStore } from '@/lib/store';
import { getScenarioById } from '@/lib/data/scenarios';
import { permissivePolicy, restrictivePolicy } from '@/lib/data/policies';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Compare() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scenarioId = searchParams.get('scenario');
  const { setSelectedScenario, loadScenarioData } = usePolicyLabStore();
  
  const [expandedA, setExpandedA] = useState(false);
  const [expandedB, setExpandedB] = useState(false);
  
  const scenario = scenarioId ? getScenarioById(scenarioId) : null;
  
  useEffect(() => {
    if (!scenarioId) {
      navigate('/scenarios');
    } else {
      setSelectedScenario(scenarioId);
    }
  }, [scenarioId, navigate, setSelectedScenario]);
  
  if (!scenario) return null;
  
  const handleRunComparison = () => {
    loadScenarioData(scenario.id);
    navigate(`/run?scenario=${scenario.id}`);
  };

  // Find constraints that differ
  const sharedConstraintIds = permissivePolicy.constraints
    .filter(c => c.isShared)
    .map(c => c.id);

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <Link to="/scenarios" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to scenarios
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Comparing policies for
              </p>
              <h1 className="text-3xl font-medium">{scenario.name}</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">{scenario.description}</p>
            </div>
          </div>
        </header>
        
        {/* Policy Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Policy A - Permissive */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <PolicyPanel
              policy={permissivePolicy}
              sharedConstraintIds={sharedConstraintIds}
              expanded={expandedA}
              onToggleExpand={() => setExpandedA(!expandedA)}
              variant="permissive"
            />
          </div>
          
          {/* Policy B - Restrictive */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <PolicyPanel
              policy={restrictivePolicy}
              sharedConstraintIds={sharedConstraintIds}
              expanded={expandedB}
              onToggleExpand={() => setExpandedB(!expandedB)}
              variant="restrictive"
            />
          </div>
        </div>
        
        {/* Run CTA */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button size="lg" onClick={handleRunComparison} className="group">
            Run comparison
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface PolicyPanelProps {
  policy: typeof permissivePolicy;
  sharedConstraintIds: string[];
  expanded: boolean;
  onToggleExpand: () => void;
  variant: 'permissive' | 'restrictive';
}

function PolicyPanel({ policy, sharedConstraintIds, expanded, onToggleExpand, variant }: PolicyPanelProps) {
  const uniqueConstraints = policy.constraints.filter(c => !c.isShared);
  const sharedConstraints = policy.constraints.filter(c => c.isShared);
  
  return (
    <div className={cn(
      "rounded-lg border bg-card p-6 h-full",
      variant === 'permissive' ? 'border-allow/30' : 'border-escalate/30'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={cn(
            "text-xs font-mono uppercase tracking-wider",
            variant === 'permissive' ? 'text-allow' : 'text-escalate'
          )}>
            {policy.type}
          </span>
          <h3 className="text-xl font-medium mt-1">{policy.name}</h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {policy.hash}
        </span>
      </div>
      
      {/* Posture */}
      <p className="text-muted-foreground mb-6 italic">
        "{policy.posture_summary}"
      </p>
      
      {/* Unique Constraints (highlighted) */}
      <div className="space-y-3 mb-4">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Key Constraints
        </p>
        {uniqueConstraints.map(constraint => (
          <div
            key={constraint.id}
            className={cn(
              "p-3 rounded border",
              variant === 'permissive' 
                ? 'bg-allow/5 border-allow/20' 
                : 'bg-escalate/5 border-escalate/20'
            )}
          >
            <p className="font-medium text-sm">{constraint.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{constraint.description}</p>
          </div>
        ))}
      </div>
      
      {/* Shared Constraints (muted) */}
      <div className="space-y-2">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider opacity-60">
          Shared Constraints
        </p>
        {sharedConstraints.map(constraint => (
          <div
            key={constraint.id}
            className="p-2 rounded bg-muted/30 opacity-60"
          >
            <p className="text-xs">{constraint.name}</p>
          </div>
        ))}
      </div>
      
      {/* JSON Toggle */}
      <button
        onClick={onToggleExpand}
        className="flex items-center gap-2 mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {expanded ? 'Hide' : 'View'} policy JSON
      </button>
      
      {expanded && (
        <pre className="mt-4 p-4 rounded bg-background/50 text-xs font-mono overflow-x-auto border border-border">
          {JSON.stringify(policy.raw_json, null, 2)}
        </pre>
      )}
    </div>
  );
}

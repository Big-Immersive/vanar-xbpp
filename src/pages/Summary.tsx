import { useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePolicyLabStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Summary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scenarioId = searchParams.get('scenario');
  
  const { selectedScenario, diff, loadScenarioData, reset } = usePolicyLabStore();
  
  useEffect(() => {
    if (!scenarioId) {
      navigate('/scenarios');
      return;
    }
    if (!selectedScenario || selectedScenario.id !== scenarioId) {
      loadScenarioData(scenarioId);
    }
  }, [scenarioId, selectedScenario, loadScenarioData, navigate]);
  
  const handleRunAnother = () => {
    reset();
    navigate('/scenarios');
  };
  
  if (!selectedScenario || !diff) return null;
  
  const { consequence_summary } = diff;

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Consequence Summary
          </p>
          <h1 className="text-3xl md:text-4xl font-medium">{selectedScenario.name}</h1>
        </header>
        
        {/* Narrative Sections */}
        <div className="space-y-8 mb-16">
          <NarrativeSection
            title="What happened"
            content={consequence_summary.what_happened}
            delay={100}
          />
          <NarrativeSection
            title="What was prevented"
            content={consequence_summary.what_was_prevented}
            delay={200}
          />
          <NarrativeSection
            title="What tradeoff was made"
            content={consequence_summary.tradeoff}
            delay={300}
          />
        </div>
        
        {/* Metrics */}
        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 animate-fade-in"
          style={{ animationDelay: '400ms' }}
        >
          <MetricCard
            label="Spend Exposure Delta"
            value={consequence_summary.metrics.spend_exposure_delta}
          />
          <MetricCard
            label="Human Escalations"
            value={consequence_summary.metrics.human_escalation_count.toString()}
          />
          <MetricCard
            label="Autonomy Change"
            value={consequence_summary.metrics.autonomy_change}
          />
          <MetricCard
            label="Risk Avoided"
            value={consequence_summary.metrics.risk_avoided}
          />
        </div>
        
        {/* Framing line */}
        <div 
          className="text-center mb-16 animate-fade-in"
          style={{ animationDelay: '500ms' }}
        >
          <div className="inline-block border-l-2 border-primary pl-4 text-left">
            <p className="text-lg text-muted-foreground italic">
              Constraints don't make agents worse.
            </p>
            <p className="text-lg">
              They make outcomes <span className="text-primary">legible</span>.
            </p>
          </div>
        </div>
        
        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '600ms' }}
        >
          <Button asChild variant="outline" className="group">
            <Link to={`/export?scenario=${scenarioId}`}>
              <GitFork className="mr-2 h-4 w-4" />
              Export results
            </Link>
          </Button>
          <Button onClick={handleRunAnother} className="group">
            <RotateCcw className="mr-2 h-4 w-4" />
            Run another scenario
          </Button>
        </div>
      </div>
    </div>
  );
}

interface NarrativeSectionProps {
  title: string;
  content: string;
  delay: number;
}

function NarrativeSection({ title, content, delay }: NarrativeSectionProps) {
  return (
    <div 
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h2>
      <p className="text-lg leading-relaxed">
        {content}
      </p>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { 
  FileJson, Shield, AlertTriangle, Zap, Play, ArrowRight,
  CheckCircle, XCircle, Clock, Target
} from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const concepts = [
  {
    id: 'action',
    title: 'Action',
    icon: Target,
    short: 'What the agent wants to do',
    description: 'An Action is a payment request from your agent. It includes the amount, currency, recipient, and any context about why the payment is being made.',
    example: '"Pay $50 USDC to 0xABC on Base for API access"',
  },
  {
    id: 'policy',
    title: 'Policy',
    icon: Shield,
    short: 'The rules that govern behavior',
    description: 'A Policy is a JSON document that defines what your agent is allowed to do. It specifies limits, verification requirements, and how to handle edge cases.',
    example: '{ maxSingle: 100, dailyBudget: 1000, askMeAbove: 500 }',
  },
  {
    id: 'verdict',
    title: 'Verdict',
    icon: CheckCircle,
    short: 'The decision: ALLOW, BLOCK, or ESCALATE',
    description: 'The Verdict is what xBPP returns after evaluating an Action against a Policy. It tells your agent whether to proceed, stop, or ask for human approval.',
    example: '{ decision: "ALLOW", reasons: [], confidence: 0.95 }',
  },
  {
    id: 'posture',
    title: 'Posture',
    icon: AlertTriangle,
    short: 'Default risk tolerance',
    description: 'Posture determines how xBPP handles ambiguous situations. AGGRESSIVE favors action, CAUTIOUS favors safety, and BALANCED is the default middle ground.',
    example: 'posture: "BALANCED" // Unknown vendor → ESCALATE',
  },
];

const decisions = [
  {
    type: 'ALLOW',
    icon: CheckCircle,
    color: 'text-allow',
    bg: 'bg-allow/10',
    border: 'border-allow/30',
    description: 'Proceed with the payment. The action is within policy.',
    when: 'Amount is within limits, recipient is verified, no red flags.',
  },
  {
    type: 'BLOCK',
    icon: XCircle,
    color: 'text-block',
    bg: 'bg-block/10',
    border: 'border-block/30',
    description: 'Stop immediately. This violates policy.',
    when: 'Exceeds limits, blocked recipient, security threat detected.',
  },
  {
    type: 'ESCALATE',
    icon: Clock,
    color: 'text-escalate',
    bg: 'bg-escalate/10',
    border: 'border-escalate/30',
    description: 'Pause and ask a human to approve.',
    when: 'High value, first-time vendor, low confidence, unusual pattern.',
  },
];

export default function Concepts() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-16">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Core Concepts</p>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            How xBPP Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Understand the building blocks of execution boundary policy.
          </p>
        </header>
        
        {/* The Flow */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-6">The Evaluation Flow</h2>
          <div className="p-6 rounded-2xl border border-border bg-card/30">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
              <div className="p-4 rounded-xl bg-muted/50 border border-border flex-1 w-full">
                <p className="text-xs font-mono text-muted-foreground mb-2">YOUR AGENT</p>
                <p className="font-medium">Proposes an Action</p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex-1 w-full">
                <p className="text-xs font-mono text-primary mb-2">XBPP INTERPRETER</p>
                <p className="font-medium">Evaluates against Policy</p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90 md:rotate-0" />
              <div className="p-4 rounded-xl bg-muted/50 border border-border flex-1 w-full">
                <p className="text-xs font-mono text-muted-foreground mb-2">RESULT</p>
                <p className="font-mono font-bold">Verdict Returned</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Concepts */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-6">Key Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <div key={concept.id} className="p-6 rounded-2xl border border-border bg-card/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{concept.title}</h3>
                      <p className="text-sm text-muted-foreground">{concept.short}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{concept.description}</p>
                  <div className="p-3 rounded-lg bg-muted/30 font-mono text-sm text-muted-foreground">
                    {concept.example}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* The Three Decisions */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium mb-6">The Three Decisions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {decisions.map((decision) => {
              const Icon = decision.icon;
              return (
                <div 
                  key={decision.type}
                  className={cn(
                    "p-6 rounded-2xl border",
                    decision.bg,
                    decision.border
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={cn("w-6 h-6", decision.color)} />
                    <h3 className={cn("text-xl font-mono font-bold", decision.color)}>
                      {decision.type}
                    </h3>
                  </div>
                  <p className="text-foreground mb-4">{decision.description}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">When:</span> {decision.when}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* CTA */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Ready to see it in action?</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/playground">
                <Play className="w-4 h-4 mr-2" />
                Try the Playground
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/learn/by-example">
                <Zap className="w-4 h-4 mr-2" />
                See Use Cases
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

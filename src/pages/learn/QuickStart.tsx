import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Copy, Check, ArrowRight, Play, Zap, Clock } from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { SEOHead } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Install the SDK',
    description: 'Add xBPP to your project with a single command.',
    code: 'npm install @vanarchain/xbpp',
    time: '10 seconds',
  },
  {
    title: 'Wrap Your Client',
    description: 'xBPP wraps your x402 client to enforce policies.',
    code: `import { xbpp } from '@vanarchain/xbpp';
import { x402Client } from '@coinbase/x402';

const client = xbpp.wrap(x402Client, {
  maxSingle: 100,      // Max $100 per transaction
  dailyBudget: 1000,   // Max $1000 per day
  askMeAbove: 500,     // Human approval over $500
});`,
    time: '30 seconds',
  },
  {
    title: 'Make Protected Payments',
    description: 'Every payment is now evaluated against your policy.',
    code: `// All payments now go through xBPP
const response = await client.fetch(url);

// Blocked payments throw with reason codes
try {
  await client.fetch(expensiveUrl);
} catch (error) {
  if (error.code === 'EXCEEDS_SINGLE_LIMIT') {
    console.log('Payment exceeds $100 limit');
  }
}`,
    time: '20 seconds',
  },
];

function CodeBlock({ code, language = 'typescript' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative group">
      <pre className="p-4 rounded-xl bg-muted/50 border border-border overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4 text-allow" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default function QuickStart() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <SEOHead
        title="xBPP Quick Start — Add Payment Governance to AI Agents in 60 Seconds"
        description="Install @vanarchain/xbpp, wrap your x402 client, and enforce payment policies on your AI agent in under 60 seconds."
        path="/learn/quick-start"
      />
      <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">~60 seconds</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium mb-4" style={{ fontFamily: "'Akira Expanded', 'Arial Black', sans-serif" }}>
            Quick Start
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From zero to protected agent payments in three steps.
          </p>
        </header>
        
        {/* Steps */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "p-6 rounded-2xl border transition-all",
                completedSteps.includes(index)
                  ? "border-allow/50 bg-allow/5"
                  : "border-border bg-card/30"
              )}
            >
              <div className="flex items-start gap-4 mb-4">
                <button
                  onClick={() => toggleStep(index)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                    completedSteps.includes(index)
                      ? "border-allow bg-allow text-background"
                      : "border-muted-foreground/30 hover:border-primary"
                  )}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-mono text-sm">{index + 1}</span>
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-medium">{step.title}</h3>
                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <CodeBlock code={step.code} />
            </div>
          ))}
        </div>
        
        {/* Progress */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            {completedSteps.length} of {steps.length} steps completed
          </p>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden max-w-xs mx-auto">
            <div 
              className="h-full bg-allow transition-all duration-500"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium">Ready to go deeper?</h3>
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
            <Button variant="ghost" asChild>
              <Link to="/spec/core">
                <ArrowRight className="w-4 h-4 mr-2" />
                Read the Spec
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

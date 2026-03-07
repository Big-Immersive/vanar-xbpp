import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane, Code, TrendingUp, Headphones, ShoppingCart,
  Search, Cpu, Users, AlertTriangle, CheckCircle,
  ArrowRight, Play, Shield
} from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { SEOHead } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface UseCase {
  id: string;
  title: string;
  icon: React.ElementType;
  agent: string;
  nightmareTitle: string;
  nightmare: string;
  solution: string;
  policy: {
    maxSingle: number;
    dailyBudget: number;
    askMeAbove: number;
    extra?: string;
  };
  color: string;
}

const useCases: UseCase[] = [
  {
    id: 'travel',
    title: 'Travel Assistant',
    icon: Plane,
    agent: 'Books flights, hotels, and car rentals',
    nightmareTitle: 'The $4,000 First Class',
    nightmare: 'You ask for "fastest route to NYC." The agent books first-class ($4,000) because it has a 20-minute shorter layover than economy ($340).',
    solution: 'Policy caps single purchases and requires approval for business/first class bookings.',
    policy: { maxSingle: 800, dailyBudget: 2000, askMeAbove: 500 },
    color: 'text-blue-400',
  },
  {
    id: 'developer',
    title: 'Developer Agent',
    icon: Code,
    agent: 'Provisions cloud resources and APIs',
    nightmareTitle: 'The Weekend GPU Bill',
    nightmare: 'Your coding agent provisions 50 GPUs for a "quick test." At $4/hour each, you return Monday to a $15,000 bill.',
    solution: 'Strict per-resource limits and GPU-specific approval requirements.',
    policy: { maxSingle: 100, dailyBudget: 500, askMeAbove: 50, extra: 'requireApproval: ["gpu"]' },
    color: 'text-emerald-400',
  },
  {
    id: 'trading',
    title: 'Trading Agent',
    icon: TrendingUp,
    agent: 'Executes DeFi trades and swaps',
    nightmareTitle: 'The Rug Pull',
    nightmare: 'Agent finds a "high-yield" liquidity pool. Deposits $50,000. Contract was a drainer—funds gone in 3 seconds.',
    solution: 'Verified contracts only, minimum contract age, and security threat detection.',
    policy: { maxSingle: 5000, dailyBudget: 25000, askMeAbove: 10000, extra: 'verifiedOnly: true, minContractAge: "72h"' },
    color: 'text-violet-400',
  },
  {
    id: 'support',
    title: 'Customer Service',
    icon: Headphones,
    agent: 'Issues refunds and credits',
    nightmareTitle: 'The Social Engineer',
    nightmare: 'Customer convinces agent their $30 order "never arrived" and gets a $500 refund for "emotional distress." Happens 47 times.',
    solution: 'Per-customer caps and refund-to-purchase ratio limits.',
    policy: { maxSingle: 50, dailyBudget: 500, askMeAbove: 30, extra: 'maxPerCustomer: 100' },
    color: 'text-amber-400',
  },
  {
    id: 'procurement',
    title: 'Procurement Agent',
    icon: ShoppingCart,
    agent: 'Orders supplies and equipment',
    nightmareTitle: 'The Decimal Point',
    nightmare: 'Agent orders 10,000 units instead of 100. Or worse: pays a phishing invoice that looks like a vendor.',
    solution: 'Approved vendor lists and quantity sanity checks.',
    policy: { maxSingle: 1000, dailyBudget: 5000, askMeAbove: 500, extra: 'approvedVendors: ["staples", "uline"]' },
    color: 'text-rose-400',
  },
  {
    id: 'research',
    title: 'Research Agent',
    icon: Search,
    agent: 'Pays for APIs and data sources',
    nightmareTitle: 'The API Runaway',
    nightmare: 'Agent needs "just a bit more data." Makes 50,000 API calls at $0.10 each. Your monthly bill: $5,000.',
    solution: 'Strict per-call limits and monthly budget caps.',
    policy: { maxSingle: 10, dailyBudget: 100, askMeAbove: 25, extra: 'monthlyBudget: 500' },
    color: 'text-cyan-400',
  },
  {
    id: 'iot',
    title: 'IoT Fleet',
    icon: Cpu,
    agent: '1,000 devices with micro-wallets',
    nightmareTitle: 'The Coordination Bug',
    nightmare: 'Each device is limited to $10/day. But a bug makes all 1,000 trigger at once. Daily spend: $10,000.',
    solution: 'Fleet-wide budget caps and coordination detection.',
    policy: { maxSingle: 1, dailyBudget: 10, askMeAbove: 5, extra: 'fleetBudget: 5000' },
    color: 'text-orange-400',
  },
  {
    id: 'orchestrator',
    title: 'Agent Orchestrator',
    icon: Users,
    agent: 'Hires and manages sub-agents',
    nightmareTitle: 'The Agent Hiring Agent',
    nightmare: 'Your orchestrator hires sub-agents to complete tasks. Sub-agents quote 10x market rate. No human noticed.',
    solution: 'Per-task caps and verified agent registries.',
    policy: { maxSingle: 20, dailyBudget: 200, askMeAbove: 50, extra: 'verifiedAgents: true, maxPerTask: 100' },
    color: 'text-pink-400',
  },
];

function UseCaseCard({ useCase, isActive, onClick }: { 
  useCase: UseCase; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const Icon = useCase.icon;
  
  return (
    <motion.div
      layout
      className={cn(
        "relative p-6 rounded-2xl border cursor-pointer transition-all duration-300",
        isActive 
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
          : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          isActive ? "bg-primary/20" : "bg-muted/50"
        )}>
          <Icon className={cn("w-6 h-6", useCase.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg mb-1">{useCase.title}</h3>
          <p className="text-sm text-muted-foreground">{useCase.agent}</p>
        </div>
        <ArrowRight className={cn(
          "w-5 h-5 transition-transform",
          isActive ? "text-primary rotate-90" : "text-muted-foreground"
        )} />
      </div>
    </motion.div>
  );
}

function UseCaseDetail({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={cn("p-4 rounded-2xl bg-primary/10")}>
          <Icon className={cn("w-8 h-8", useCase.color)} />
        </div>
        <div>
          <h2 className="text-2xl font-medium">{useCase.title}</h2>
          <p className="text-muted-foreground">{useCase.agent}</p>
        </div>
      </div>
      
      {/* Nightmare Scenario */}
      <div className="p-6 rounded-2xl border border-block/30 bg-block/5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-block" />
          <h3 className="font-mono text-sm uppercase tracking-wider text-block">
            Without xBPP: {useCase.nightmareTitle}
          </h3>
        </div>
        <p className="text-foreground leading-relaxed">{useCase.nightmare}</p>
      </div>
      
      {/* Solution */}
      <div className="p-6 rounded-2xl border border-allow/30 bg-allow/5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-allow" />
          <h3 className="font-mono text-sm uppercase tracking-wider text-allow">
            With xBPP
          </h3>
        </div>
        <p className="text-foreground leading-relaxed mb-4">{useCase.solution}</p>
        
        {/* Policy Preview */}
        <div className="p-4 rounded-xl bg-background/50 border border-border font-mono text-sm">
          <p className="text-muted-foreground mb-2">// Recommended policy</p>
          <p><span className="text-primary">maxSingle:</span> ${useCase.policy.maxSingle.toLocaleString()}</p>
          <p><span className="text-primary">dailyBudget:</span> ${useCase.policy.dailyBudget.toLocaleString()}</p>
          <p><span className="text-primary">askMeAbove:</span> ${useCase.policy.askMeAbove.toLocaleString()}</p>
          {useCase.policy.extra && (
            <p className="text-muted-foreground">{useCase.policy.extra}</p>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to={`/playground?agent=${useCase.id}`}>
            <Play className="w-4 h-4 mr-2" />
            Try in Playground
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/library/scenarios?category=${useCase.id}`}>
            <Shield className="w-4 h-4 mr-2" />
            View Scenarios
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

export default function ByExample() {
  const [activeCase, setActiveCase] = useState(useCases[0]);

  return (
    <>
      <SEOHead
        title="xBPP By Example — Real AI Agent Payment Policy Patterns"
        description="Practical examples of xBPP agent payment policies: e-commerce agents, DeFi bots, autonomous research agents, and enterprise AI systems."
        path="/learn/by-example"
      />
      <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Learn by Example</p>
          <h1 className="text-4xl md:text-5xl font-medium mb-4" style={{ fontFamily: "'Akira Expanded', 'Arial Black', sans-serif" }}>
            8 Ways Agents Go Wrong
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Real scenarios from the field. See how xBPP policies prevent each disaster.
          </p>
        </header>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Use Case List */}
          <div className="space-y-3">
            {useCases.map((useCase) => (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                isActive={activeCase.id === useCase.id}
                onClick={() => setActiveCase(useCase)}
              />
            ))}
          </div>
          
          {/* Detail Panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <UseCaseDetail key={activeCase.id} useCase={activeCase} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

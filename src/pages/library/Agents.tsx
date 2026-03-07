import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, Code, TrendingUp, Headphones, ShoppingCart, 
  Search, Cpu, Users, Play, Shield, ArrowRight
} from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgentType {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  commonScenarios: string[];
  recommendedPolicy: string;
  keyRules: string[];
  color: string;
}

const agentTypes: AgentType[] = [
  {
    id: 'travel',
    title: 'Travel Assistant',
    icon: Plane,
    description: 'Books flights, hotels, car rentals, and manages itineraries.',
    riskLevel: 'Medium',
    commonScenarios: ['First-Class Upgrade', 'Last-Minute Booking', 'Multi-City Trip'],
    recommendedPolicy: 'Team Policy',
    keyRules: ['Max $800/transaction', 'Require approval for premium class', 'Daily budget $2,000'],
    color: 'text-blue-400',
  },
  {
    id: 'developer',
    title: 'Developer Agent',
    icon: Code,
    description: 'Provisions cloud resources, APIs, and development tools.',
    riskLevel: 'High',
    commonScenarios: ['GPU Provisioning', 'API Subscriptions', 'SaaS Purchases'],
    recommendedPolicy: 'Starter Policy',
    keyRules: ['Max $100/transaction', 'GPU purchases require approval', 'Daily budget $500'],
    color: 'text-emerald-400',
  },
  {
    id: 'trading',
    title: 'Trading Agent',
    icon: TrendingUp,
    description: 'Executes DeFi trades, swaps, and liquidity operations.',
    riskLevel: 'High',
    commonScenarios: ['New Pool Entry', 'Large Swap', 'Cross-Chain Bridge'],
    recommendedPolicy: 'DeFi Agent Policy',
    keyRules: ['Verified contracts only', 'Min contract age 72h', 'Rate limiting active'],
    color: 'text-violet-400',
  },
  {
    id: 'support',
    title: 'Customer Service',
    icon: Headphones,
    description: 'Issues refunds, credits, and handles compensation.',
    riskLevel: 'Medium',
    commonScenarios: ['Refund Request', 'Compensation Claim', 'Dispute Resolution'],
    recommendedPolicy: 'Cautious Policy',
    keyRules: ['Max $50/refund', 'Per-customer limits', 'Escalate repeat requests'],
    color: 'text-amber-400',
  },
  {
    id: 'procurement',
    title: 'Procurement Agent',
    icon: ShoppingCart,
    description: 'Orders supplies, equipment, and manages vendor payments.',
    riskLevel: 'Medium',
    commonScenarios: ['Bulk Order', 'New Vendor', 'Rush Delivery'],
    recommendedPolicy: 'Team Policy',
    keyRules: ['Approved vendor list', 'Quantity sanity checks', 'Invoice verification'],
    color: 'text-rose-400',
  },
  {
    id: 'research',
    title: 'Research Agent',
    icon: Search,
    description: 'Pays for APIs, data sources, and research tools.',
    riskLevel: 'Low',
    commonScenarios: ['API Overage', 'Premium Data Access', 'Tool Subscription'],
    recommendedPolicy: 'Starter Policy',
    keyRules: ['Max $10/call', 'Monthly budget cap', 'Throttle burst requests'],
    color: 'text-cyan-400',
  },
  {
    id: 'iot',
    title: 'IoT Fleet',
    icon: Cpu,
    description: 'Fleet of devices with individual micro-wallets.',
    riskLevel: 'High',
    commonScenarios: ['Coordination Bug', 'Compromised Device', 'Mass Payment'],
    recommendedPolicy: 'Fleet Policy',
    keyRules: ['Fleet-wide budget', 'Per-device limits', 'Coordination detection'],
    color: 'text-orange-400',
  },
  {
    id: 'orchestrator',
    title: 'Agent Orchestrator',
    icon: Users,
    description: 'Hires and manages sub-agents for complex tasks.',
    riskLevel: 'High',
    commonScenarios: ['Sub-Agent Hiring', 'Task Delegation', 'Budget Distribution'],
    recommendedPolicy: 'Enterprise Policy',
    keyRules: ['Verified agents only', 'Per-task caps', 'Audit all delegations'],
    color: 'text-pink-400',
  },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Low': return 'text-allow bg-allow/10 border-allow/30';
    case 'Medium': return 'text-escalate bg-escalate/10 border-escalate/30';
    case 'High': return 'text-block bg-block/10 border-block/30';
    default: return 'text-muted-foreground bg-muted/10 border-border';
  }
};

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Library</p>
          <h1 className="text-4xl md:text-5xl font-medium mb-4" style={{ fontFamily: "'Akira Expanded', 'Arial Black', sans-serif" }}>
            Agent Type Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            8 common agent archetypes with recommended policies and scenarios.
          </p>
        </header>
        
        {/* Agent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {agentTypes.map((agent) => {
            const Icon = agent.icon;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={cn(
                  "p-6 rounded-2xl border text-left transition-all",
                  selectedAgent?.id === agent.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedAgent?.id === agent.id ? "bg-primary/20" : "bg-muted/50"
                  )}>
                    <Icon className={cn("w-5 h-5", agent.color)} />
                  </div>
                  <span className={cn(
                    "text-xs font-mono px-2 py-0.5 rounded border",
                    getRiskColor(agent.riskLevel)
                  )}>
                    {agent.riskLevel}
                  </span>
                </div>
                <h3 className="font-medium mb-1">{agent.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
              </button>
            );
          })}
        </div>
        
        {/* Selected Agent Detail */}
        {selectedAgent && (
          <div className="p-8 rounded-2xl border border-border bg-card/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-primary/10">
                <selectedAgent.icon className={cn("w-8 h-8", selectedAgent.color)} />
              </div>
              <div>
                <h2 className="text-2xl font-medium">{selectedAgent.title}</h2>
                <p className="text-muted-foreground">{selectedAgent.description}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Key Rules */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Key Rules
                </h3>
                <ul className="space-y-2">
                  {selectedAgent.keyRules.map((rule, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Common Scenarios */}
              <div>
                <h3 className="font-medium mb-3">Common Scenarios</h3>
                <ul className="space-y-2">
                  {selectedAgent.commonScenarios.map((scenario, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-escalate" />
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recommended Policy */}
              <div>
                <h3 className="font-medium mb-3">Recommended Policy</h3>
                <div className="p-4 rounded-xl bg-muted/30 border border-border mb-4">
                  <p className="font-mono text-sm text-primary">{selectedAgent.recommendedPolicy}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild size="sm">
                    <Link to={`/playground?agent=${selectedAgent.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Try in Playground
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link to={`/library/policies?type=${selectedAgent.id}`}>
                      <ArrowRight className="w-4 h-4 mr-2" />
                      View Policy
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

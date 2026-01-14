import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Wallet, PenTool } from 'lucide-react';
import { scenarios } from '@/lib/data/scenarios';
import { Category, RiskLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

const categoryIcons: Record<Category, React.ReactNode> = {
  SPEND: <Wallet className="h-4 w-4" />,
  SIGN: <PenTool className="h-4 w-4" />,
  DEFENSE: <Shield className="h-4 w-4" />,
};

const riskColors: Record<RiskLevel, string> = {
  LOW: 'bg-risk-low text-risk-low',
  MEDIUM: 'bg-risk-medium text-risk-medium',
  HIGH: 'bg-risk-high text-risk-high',
};

export default function Scenarios() {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <Link to="/" className="text-sm font-mono tracking-widest text-muted-foreground uppercase hover:text-primary transition-colors">
            POLICYLAB
          </Link>
          <h1 className="text-3xl md:text-4xl font-medium mt-6 mb-4">
            Choose a scenario
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Each scenario presents a decision point where policy constraints diverge.
          </p>
        </header>
        
        {/* Scenario Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => (
            <Link
              key={scenario.id}
              to={`/compare?scenario=${scenario.id}`}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <article 
                className={cn(
                  "h-full p-6 rounded-lg border border-border bg-card",
                  "transition-all duration-300",
                  "hover:border-primary/50 hover:bg-card/80",
                  "animate-fade-in"
                )}
              >
                {/* Top row: Category + Risk */}
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {categoryIcons[scenario.category]}
                    {scenario.category}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-mono uppercase",
                    riskColors[scenario.risk_level]
                  )}>
                    {scenario.risk_level}
                  </span>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                  {scenario.name}
                </h2>
                
                {/* Narrative */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {scenario.narrative}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Use this scenario
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

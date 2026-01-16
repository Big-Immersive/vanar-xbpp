import { Link } from 'react-router-dom';
import { Shield, Zap, List, Users, ArrowRight } from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { cn } from '@/lib/utils';

const sections = [
  {
    title: 'Policy Templates',
    description: '10 pre-built policies for common use cases. Clone, customize, and test.',
    icon: Shield,
    href: '/library/policies',
    count: '10 templates',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    title: 'Scenario Library',
    description: '22 test scenarios across SPEND, SIGN, and DEFENSE categories.',
    icon: Zap,
    href: '/library/scenarios',
    count: '22 scenarios',
    color: 'text-escalate',
    bg: 'bg-escalate/10',
    border: 'border-escalate/30',
  },
  {
    title: 'Reason Codes',
    description: '45+ reason codes explained with examples and trigger conditions.',
    icon: List,
    href: '/library/reason-codes',
    count: '45+ codes',
    color: 'text-allow',
    bg: 'bg-allow/10',
    border: 'border-allow/30',
  },
  {
    title: 'Agent Types',
    description: '8 agent archetypes with recommended policies and common scenarios.',
    icon: Users,
    href: '/library/agents',
    count: '8 types',
    color: 'text-block',
    bg: 'bg-block/10',
    border: 'border-block/30',
  },
];

export default function LibraryIndex() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Library</p>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            xBPP Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Policies, scenarios, reason codes, and agent templates.
          </p>
        </header>
        
        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                to={section.href}
                className={cn(
                  "block p-6 rounded-2xl border transition-all group",
                  "hover:shadow-lg hover:shadow-primary/5",
                  section.bg,
                  section.border
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-background/50">
                    <Icon className={cn("w-6 h-6", section.color)} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    {section.count}
                  </span>
                </div>
                <h2 className="text-lg font-medium mb-2">{section.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

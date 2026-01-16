import { Link } from 'react-router-dom';
import { Clock, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { cn } from '@/lib/utils';

const learningPaths = [
  {
    title: '30-Second Quick Start',
    description: 'Install, configure, and protect your first agent payment.',
    icon: Clock,
    href: '/learn/quick-start',
    time: '~1 minute',
    color: 'text-allow',
    bg: 'bg-allow/10',
    border: 'border-allow/30',
  },
  {
    title: 'Learn by Example',
    description: '8 real-world agent disasters and how xBPP prevents each one.',
    icon: Lightbulb,
    href: '/learn/by-example',
    time: '~10 minutes',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    title: 'Core Concepts',
    description: 'Understand Actions, Policies, Verdicts, and Postures.',
    icon: BookOpen,
    href: '/learn/concepts',
    time: '~5 minutes',
    color: 'text-escalate',
    bg: 'bg-escalate/10',
    border: 'border-escalate/30',
  },
];

export default function LearnIndex() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Learn</p>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            Choose Your Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with a quick integration or dive deep into execution boundary policies.
          </p>
        </header>
        
        {/* Learning Paths */}
        <div className="space-y-4">
          {learningPaths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.href}
                to={path.href}
                className={cn(
                  "block p-6 rounded-2xl border transition-all group",
                  "hover:shadow-lg hover:shadow-primary/5",
                  path.bg,
                  path.border
                )}
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-xl bg-background/50">
                    <Icon className={cn("w-8 h-8", path.color)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-medium">{path.title}</h2>
                      <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                        {path.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{path.description}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Animated timeline pulse */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse-subtle" />
      
      <main className="max-w-2xl mx-auto text-center space-y-8">
        {/* Logo / Brand */}
        <div className="mb-12">
          <h2 className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
            POLICYLAB
          </h2>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
          Same agent. Same world.
          <br />
          <span className="text-primary">Different rules.</span>
        </h1>
        
        {/* Subhead */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
          Watch how autonomous systems behave under constraint.
        </p>
        
        {/* Animated divider */}
        <div className="flex items-center justify-center gap-2 py-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-border" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-border" />
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="group">
            <Link to="/scenarios">
              Run a simulation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="lg" className="text-muted-foreground">
            <Link to="/spec">
              <FileText className="mr-2 h-4 w-4" />
              View the standard
            </Link>
          </Button>
        </div>
      </main>
      
      {/* Bottom pulse */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-primary/30 to-transparent animate-pulse-subtle" />
    </div>
  );
}

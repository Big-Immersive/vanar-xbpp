import { useEffect, useCallback, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePolicyLabStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Event } from '@/lib/types';

export default function Run() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scenarioId = searchParams.get('scenario');
  
  const {
    selectedScenario,
    loadScenarioData,
    currentEventIndex,
    setCurrentEventIndex,
    isPlaying,
    setIsPlaying,
  } = usePolicyLabStore();
  
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  
  useEffect(() => {
    if (!scenarioId) {
      navigate('/scenarios');
      return;
    }
    if (!selectedScenario || selectedScenario.id !== scenarioId) {
      loadScenarioData(scenarioId);
    }
  }, [scenarioId, selectedScenario, loadScenarioData, navigate]);
  
  const events = selectedScenario?.event_stream || [];
  const totalEvents = events.length;
  
  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    
    if (currentEventIndex >= totalEvents - 1) {
      setIsPlaying(false);
      setHasReachedEnd(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentEventIndex(currentEventIndex + 1);
    }, 1500); // Deliberate pacing
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentEventIndex, totalEvents, setCurrentEventIndex, setIsPlaying]);
  
  // Start auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [setIsPlaying]);
  
  const handleTogglePlay = useCallback(() => {
    if (hasReachedEnd) {
      setCurrentEventIndex(0);
      setHasReachedEnd(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, hasReachedEnd, setIsPlaying, setCurrentEventIndex]);
  
  const handleReset = useCallback(() => {
    setCurrentEventIndex(0);
    setIsPlaying(false);
    setHasReachedEnd(false);
  }, [setCurrentEventIndex, setIsPlaying]);
  
  const handleSliderChange = useCallback((value: number[]) => {
    setCurrentEventIndex(value[0]);
    setIsPlaying(false);
    setHasReachedEnd(value[0] >= totalEvents - 1);
  }, [setCurrentEventIndex, setIsPlaying, totalEvents]);
  
  const handleProceedToDiff = () => {
    navigate(`/diff?scenario=${scenarioId}`);
  };
  
  if (!selectedScenario) return null;

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">
            Simulation
          </p>
          <h1 className="text-2xl md:text-3xl font-medium">{selectedScenario.name}</h1>
        </header>
        
        {/* Timeline */}
        <div className="relative mb-12">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          
          {/* Events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={index}
                isVisible={index <= currentEventIndex}
                isCurrent={index === currentEventIndex}
                isPending={event.pending && index === currentEventIndex}
              />
            ))}
          </div>
        </div>
        
        {/* Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Scrubber */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground w-8">
                {currentEventIndex + 1}
              </span>
              <Slider
                value={[currentEventIndex]}
                max={totalEvents - 1}
                step={1}
                onValueChange={handleSliderChange}
                className="flex-1"
              />
              <span className="text-xs font-mono text-muted-foreground w-8">
                {totalEvents}
              </span>
            </div>
            
            {/* Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleTogglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              {hasReachedEnd && (
                <Button onClick={handleProceedToDiff} className="ml-4">
                  View divergence
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Spacer for fixed controls */}
        <div className="h-32" />
      </div>
    </div>
  );
}

interface TimelineEventProps {
  event: Event;
  index: number;
  isVisible: boolean;
  isCurrent: boolean;
  isPending: boolean;
}

function TimelineEvent({ event, isVisible, isCurrent, isPending }: TimelineEventProps) {
  const typeColors = {
    action: 'bg-primary',
    request: 'bg-escalate',
    evaluation: 'bg-muted-foreground',
    decision: 'bg-allow',
  };
  
  return (
    <div
      className={cn(
        "relative pl-10 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Dot */}
      <div
        className={cn(
          "absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-background transition-all",
          typeColors[event.type],
          isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          isPending && "animate-pulse"
        )}
      />
      
      {/* Content */}
      <div className={cn(
        "p-4 rounded-lg border bg-card transition-all",
        isCurrent && "border-primary/50",
        isPending && "border-escalate/50 bg-escalate/5"
      )}>
        {/* Type badge */}
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {event.type}
        </span>
        
        {/* Narrative */}
        <p className={cn(
          "mt-1 font-medium",
          isPending && "text-escalate"
        )}>
          {event.narrative}
        </p>
        
        {/* Details */}
        {event.details && (
          <p className="mt-2 text-sm text-muted-foreground">
            {event.details}
          </p>
        )}
        
        {/* Pending indicator */}
        {isPending && (
          <div className="mt-3 flex items-center gap-2 text-sm text-escalate">
            <div className="w-2 h-2 rounded-full bg-escalate animate-pulse" />
            Decision pending...
          </div>
        )}
      </div>
    </div>
  );
}

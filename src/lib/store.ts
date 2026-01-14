import { create } from 'zustand';
import { Scenario, Policy, Run, Diff } from './types';
import { getScenarioById } from './data/scenarios';
import { permissivePolicy, restrictivePolicy } from './data/policies';
import { getRunsForScenario, getDiffForScenario } from './data/runs';

interface PolicyLabState {
  // Selected scenario
  selectedScenario: Scenario | null;
  setSelectedScenario: (scenarioId: string) => void;
  
  // Policies (always permissive vs restrictive for v0)
  policyA: Policy;
  policyB: Policy;
  
  // Runs
  runA: Run | null;
  runB: Run | null;
  
  // Diff
  diff: Diff | null;
  
  // UI state
  currentEventIndex: number;
  setCurrentEventIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  showDivergence: boolean;
  setShowDivergence: (show: boolean) => void;
  
  // Computed
  loadScenarioData: (scenarioId: string) => void;
  reset: () => void;
}

export const usePolicyLabStore = create<PolicyLabState>((set, get) => ({
  selectedScenario: null,
  policyA: permissivePolicy,
  policyB: restrictivePolicy,
  runA: null,
  runB: null,
  diff: null,
  currentEventIndex: 0,
  isPlaying: false,
  showDivergence: false,
  
  setSelectedScenario: (scenarioId: string) => {
    const scenario = getScenarioById(scenarioId);
    if (scenario) {
      set({ selectedScenario: scenario });
    }
  },
  
  setCurrentEventIndex: (index: number) => set({ currentEventIndex: index }),
  setIsPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setShowDivergence: (show: boolean) => set({ showDivergence: show }),
  
  loadScenarioData: (scenarioId: string) => {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) return;
    
    const { permissive, restrictive } = getRunsForScenario(scenarioId);
    const diff = getDiffForScenario(scenarioId);
    
    set({
      selectedScenario: scenario,
      runA: permissive,
      runB: restrictive,
      diff,
      currentEventIndex: 0,
      isPlaying: false,
      showDivergence: false,
    });
  },
  
  reset: () => set({
    selectedScenario: null,
    runA: null,
    runB: null,
    diff: null,
    currentEventIndex: 0,
    isPlaying: false,
    showDivergence: false,
  }),
}));

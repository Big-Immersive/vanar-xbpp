// POLICYLAB Core Object Model

export type Category = 'SPEND' | 'SIGN' | 'DEFENSE';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type DecisionType = 'ALLOW' | 'BLOCK' | 'ESCALATE';
export type PolicyType = 'BPP' | 'DBP';

export interface Constraint {
  id: string;
  name: string;
  description: string;
  type: 'limit' | 'require' | 'deny' | 'escalate';
  parameter?: string | number;
  isShared?: boolean; // true if both policies have this constraint
}

export interface Event {
  id: string;
  timestamp: number; // relative milliseconds from start
  type: 'action' | 'request' | 'evaluation' | 'decision';
  narrative: string;
  details?: string;
  pending?: boolean;
}

export interface Scenario {
  id: string;
  name: string;
  narrative: string;
  description: string;
  category: Category;
  risk_level: RiskLevel;
  event_stream: Event[];
}

export interface Policy {
  id: string;
  name: string;
  type: PolicyType;
  version: string;
  description: string;
  posture_summary: string;
  constraints: Constraint[];
  raw_json: object;
  hash: string;
}

export interface Decision {
  event_id: string;
  decision: DecisionType;
  reason_codes: string[];
  narrative: string;
  timestamp: number;
}

export interface Run {
  id: string;
  scenario_id: string;
  policy_id: string;
  decisions: Decision[];
}

export interface Divergence {
  event_id: string;
  event_narrative: string;
  policy_a_decision: Decision;
  policy_b_decision: Decision;
  impact_summary: string;
}

export interface Summary {
  what_happened: string;
  what_was_prevented: string;
  tradeoff: string;
  metrics: {
    spend_exposure_delta: string;
    human_escalation_count: number;
    autonomy_change: string;
    risk_avoided: string;
  };
}

export interface Diff {
  scenario_id: string;
  policy_a: Run;
  policy_b: Run;
  divergence_points: Divergence[];
  consequence_summary: Summary;
}

export interface ComparisonState {
  scenario: Scenario | null;
  policyA: Policy | null;
  policyB: Policy | null;
  runA: Run | null;
  runB: Run | null;
  diff: Diff | null;
}

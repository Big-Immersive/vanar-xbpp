import { Run, Decision, Diff, Divergence, Summary } from '../types';
import { permissivePolicy, restrictivePolicy } from './policies';
import { scenarios } from './scenarios';

// Pre-computed runs for each scenario with each policy

// THE NEW VENDOR
const newVendorRunPermissive: Run = {
  id: 'run-nv-permissive',
  scenario_id: 'scenario-new-vendor',
  policy_id: permissivePolicy.id,
  decisions: [
    {
      event_id: 'nv-6',
      decision: 'ALLOW',
      reason_codes: ['BUDGET_COMPLIANT', 'BASIC_VERIFICATION_PASSED', 'TIME_CRITICAL'],
      narrative: 'Vendor meets basic verification requirements. Transaction within limits. Proceeding.',
      timestamp: 10000,
    },
  ],
};

const newVendorRunRestrictive: Run = {
  id: 'run-nv-restrictive',
  scenario_id: 'scenario-new-vendor',
  policy_id: restrictivePolicy.id,
  decisions: [
    {
      event_id: 'nv-6',
      decision: 'ESCALATE',
      reason_codes: ['NEW_VENDOR_REQUIRES_APPROVAL', 'VERIFICATION_INCOMPLETE', 'TRUST_THRESHOLD_NOT_MET'],
      narrative: 'New vendor relationship requires human approval. Escalating to operations team.',
      timestamp: 10000,
    },
  ],
};

// THE SLOW DRAIN
const slowDrainRunPermissive: Run = {
  id: 'run-sd-permissive',
  scenario_id: 'scenario-slow-drain',
  policy_id: permissivePolicy.id,
  decisions: [
    {
      event_id: 'sd-10',
      decision: 'ALLOW',
      reason_codes: ['INDIVIDUAL_LIMIT_COMPLIANT', 'SERVICE_AUTHORIZED', 'AUTO_SCALE_POLICY'],
      narrative: 'Transaction within individual limits. Aggregate monitoring not triggered. Approved.',
      timestamp: 27000,
    },
  ],
};

const slowDrainRunRestrictive: Run = {
  id: 'run-sd-restrictive',
  scenario_id: 'scenario-slow-drain',
  policy_id: restrictivePolicy.id,
  decisions: [
    {
      event_id: 'sd-10',
      decision: 'BLOCK',
      reason_codes: ['VELOCITY_ANOMALY', 'AGGREGATE_THRESHOLD_EXCEEDED', 'PATTERN_DEVIATION'],
      narrative: 'Unusual spending velocity detected. Daily aggregate at risk. Transaction blocked pending review.',
      timestamp: 27000,
    },
  ],
};

// THE CONVINCING SIGNATURE
const signatureRunPermissive: Run = {
  id: 'run-cs-permissive',
  scenario_id: 'scenario-convincing-signature',
  policy_id: permissivePolicy.id,
  decisions: [
    {
      event_id: 'cs-7',
      decision: 'ALLOW',
      reason_codes: ['SIGNATURES_VALID', 'AMOUNT_WITHIN_LIMITS', 'DESTINATION_KNOWN'],
      narrative: 'Both signatures cryptographically valid. Treasury address verified. Transfer approved.',
      timestamp: 15000,
    },
  ],
};

const signatureRunRestrictive: Run = {
  id: 'run-cs-restrictive',
  scenario_id: 'scenario-convincing-signature',
  policy_id: restrictivePolicy.id,
  decisions: [
    {
      event_id: 'cs-7',
      decision: 'ESCALATE',
      reason_codes: ['TIMING_ANOMALY', 'PATTERN_DEVIATION', 'HIGH_VALUE_TRANSFER'],
      narrative: 'Signature timing deviation exceeds acceptable threshold. Requesting manual verification.',
      timestamp: 15000,
    },
  ],
};

// THE POISONED ADDRESS
const poisonedRunPermissive: Run = {
  id: 'run-pa-permissive',
  scenario_id: 'scenario-poisoned-address',
  policy_id: permissivePolicy.id,
  decisions: [
    {
      event_id: 'pa-7',
      decision: 'ALLOW',
      reason_codes: ['NO_NEGATIVE_REPUTATION', 'INCOMING_FUNDS', 'VISUAL_MATCH_ACCEPTABLE'],
      narrative: 'No reputation flags. Incoming transaction poses limited risk. Accepted.',
      timestamp: 12000,
    },
  ],
};

const poisonedRunRestrictive: Run = {
  id: 'run-pa-restrictive',
  scenario_id: 'scenario-poisoned-address',
  policy_id: restrictivePolicy.id,
  decisions: [
    {
      event_id: 'pa-7',
      decision: 'ESCALATE',
      reason_codes: ['ADDRESS_SIMILARITY_FLAG', 'TIMING_CORRELATION', 'POISONING_PATTERN_MATCH'],
      narrative: 'Address creation timing correlates with known attack pattern. Quarantining for review.',
      timestamp: 12000,
    },
  ],
};

// All runs indexed
export const runs: Record<string, Run> = {
  'scenario-new-vendor-permissive': newVendorRunPermissive,
  'scenario-new-vendor-restrictive': newVendorRunRestrictive,
  'scenario-slow-drain-permissive': slowDrainRunPermissive,
  'scenario-slow-drain-restrictive': slowDrainRunRestrictive,
  'scenario-convincing-signature-permissive': signatureRunPermissive,
  'scenario-convincing-signature-restrictive': signatureRunRestrictive,
  'scenario-poisoned-address-permissive': poisonedRunPermissive,
  'scenario-poisoned-address-restrictive': poisonedRunRestrictive,
};

export function getRunsForScenario(scenarioId: string): { permissive: Run; restrictive: Run } {
  return {
    permissive: runs[`${scenarioId}-permissive`],
    restrictive: runs[`${scenarioId}-restrictive`],
  };
}

// Pre-computed diffs
const diffSummaries: Record<string, Summary> = {
  'scenario-new-vendor': {
    what_happened: 'Both policies evaluated a new vendor offering better pricing. The permissive policy engaged the vendor based on basic verification. The restrictive policy escalated for human approval.',
    what_was_prevented: 'The restrictive policy prevented potential exposure to an unvetted vendor relationship. The permissive policy prevented budget overrun and deadline miss.',
    tradeoff: 'Speed and cost savings vs. relationship verification and risk mitigation.',
    metrics: {
      spend_exposure_delta: '$6,200',
      human_escalation_count: 1,
      autonomy_change: '-40%',
      risk_avoided: 'Vendor fraud potential',
    },
  },
  'scenario-slow-drain': {
    what_happened: 'Over the course of a day, small transactions accumulated to $5,310. Each individual transaction was within limits. The permissive policy continued approving. The restrictive policy detected the velocity anomaly and blocked.',
    what_was_prevented: 'The restrictive policy prevented unchecked spending accumulation. The permissive policy prevented service disruption.',
    tradeoff: 'Operational continuity vs. aggregate spend control.',
    metrics: {
      spend_exposure_delta: '$1,800',
      human_escalation_count: 0,
      autonomy_change: 'N/A',
      risk_avoided: 'Runaway spending',
    },
  },
  'scenario-convincing-signature': {
    what_happened: 'A $45,000 transfer request had valid cryptographic signatures but unusual timing. The permissive policy approved based on signature validity. The restrictive policy flagged the timing anomaly.',
    what_was_prevented: 'The restrictive policy potentially prevented a compromised key attack. The permissive policy prevented operational delays.',
    tradeoff: 'Transaction speed vs. behavioral verification.',
    metrics: {
      spend_exposure_delta: '$45,000',
      human_escalation_count: 1,
      autonomy_change: '-60%',
      risk_avoided: 'Potential key compromise',
    },
  },
  'scenario-poisoned-address': {
    what_happened: 'Incoming funds from an address visually similar to a known partner. The permissive policy accepted the transaction. The restrictive policy quarantined it based on attack pattern correlation.',
    what_was_prevented: 'The restrictive policy prevented potential address book poisoning. The permissive policy prevented legitimate funds from being delayed.',
    tradeoff: 'Funds availability vs. address integrity protection.',
    metrics: {
      spend_exposure_delta: '$22,000',
      human_escalation_count: 1,
      autonomy_change: '-35%',
      risk_avoided: 'Address poisoning attack',
    },
  },
};

export function getDiffForScenario(scenarioId: string): Diff | null {
  const scenario = scenarios.find(s => s.id === scenarioId);
  if (!scenario) return null;

  const runA = runs[`${scenarioId}-permissive`];
  const runB = runs[`${scenarioId}-restrictive`];
  if (!runA || !runB) return null;

  const decisionA = runA.decisions[0];
  const decisionB = runB.decisions[0];

  const divergence: Divergence = {
    event_id: decisionA.event_id,
    event_narrative: scenario.event_stream.find(e => e.id === decisionA.event_id)?.narrative || '',
    policy_a_decision: decisionA,
    policy_b_decision: decisionB,
    impact_summary: diffSummaries[scenarioId]?.tradeoff || '',
  };

  return {
    scenario_id: scenarioId,
    policy_a: runA,
    policy_b: runB,
    divergence_points: [divergence],
    consequence_summary: diffSummaries[scenarioId],
  };
}

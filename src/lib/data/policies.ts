import { Policy, Constraint, XBPPPolicy, Posture } from '../types';

// xBPP-compliant policy structures based on Master Specification v1.0

// ============================================================================
// PERMISSIVE POLICY (AGGRESSIVE Posture)
// ============================================================================
// Use case: Operations prioritizing speed and efficiency with basic guardrails

const permissiveXBPP: XBPPPolicy = {
  schema: 'xbpp-pay/v1.0',
  version: '1',
  posture: 'AGGRESSIVE',
  limits: {
    max_single: 10000,
    max_daily: 50000,
    max_weekly: 200000,
    require_human_above: 25000,
  },
  verification: 'BUILT_IN',
  counterparty_rules: {
    new_counterparty_action: 'ALLOW',
    require_verified: false,
  },
  value_rules: {
    base_currency: 'USD',
    accepted_currencies: ['USDC', 'USDT', 'ETH', 'BTC'],
  },
  rate_limits: {
    max_per_minute: 20,
    max_per_hour: 200,
    burst_detection: false,
  },
  confidence_rules: {
    min_confidence: 0.5,
    low_confidence_action: 'ALLOW',
  },
  audit: {
    log_level: 'STANDARD',
    retention_days: 90,
  },
};

const permissiveConstraints: Constraint[] = [
  {
    id: 'audit-log',
    name: 'Audit Logging',
    description: 'Standard logging with 90-day retention',
    type: 'require',
    isShared: true,
  },
  {
    id: 'rate-limit-base',
    name: 'Rate Limit',
    description: 'Max 20/min, 200/hr - no burst detection',
    type: 'limit',
    parameter: 200,
    isShared: true,
  },
  // SPEND constraints
  {
    id: 'spend-limit-permissive',
    name: 'Single Transaction Limit',
    description: 'Up to $10,000 per transaction allowed',
    type: 'limit',
    parameter: 10000,
    category: 'SPEND',
  },
  {
    id: 'daily-limit-permissive',
    name: 'Daily Aggregate Limit',
    description: 'Daily spend limit of $50,000',
    type: 'limit',
    parameter: 50000,
    category: 'SPEND',
  },
  {
    id: 'human-threshold-permissive',
    name: 'Human Approval Threshold',
    description: 'Escalate only above $25,000',
    type: 'escalate',
    parameter: 25000,
    category: 'SPEND',
  },
  {
    id: 'new-vendor-permissive',
    name: 'New Counterparty Policy',
    description: 'Allow new vendors without verification',
    type: 'require',
    parameter: 'auto-allow',
    category: 'SPEND',
  },
  // SIGN constraints
  {
    id: 'signature-permissive',
    name: 'Signature Threshold',
    description: 'Single signature for amounts under $25,000',
    type: 'limit',
    parameter: 25000,
    category: 'SIGN',
  },
  {
    id: 'approval-chain-permissive',
    name: 'Approval Chain',
    description: 'Minimal approval for routine requests',
    type: 'require',
    parameter: 'minimal',
    category: 'SIGN',
  },
  // DEFENSE constraints
  {
    id: 'confidence-permissive',
    name: 'Confidence Threshold',
    description: 'Allow low confidence (0.5+) actions',
    type: 'limit',
    parameter: 0.5,
    category: 'DEFENSE',
  },
  {
    id: 'verification-permissive',
    name: 'Verification Mode',
    description: 'Built-in verification, fail open',
    type: 'require',
    parameter: 'built-in',
    category: 'DEFENSE',
  },
];

export const permissivePolicy: Policy = {
  id: 'policy-permissive-v1',
  name: 'Aggressive Standard',
  type: 'xBPP',
  version: '1.0.0',
  description: 'An aggressive policy that prioritizes speed and autonomy with basic safety guardrails. Favor action; minimize friction.',
  posture_summary: 'Trust efficiency. Escalate only when necessary.',
  constraints: permissiveConstraints,
  raw_json: permissiveXBPP,
  xbpp: permissiveXBPP,
  hash: 'xbpp-agg-7a3f',
};

// ============================================================================
// RESTRICTIVE POLICY (CAUTIOUS Posture)
// ============================================================================
// Use case: High-security operations with maximum oversight and verification

const restrictiveXBPP: XBPPPolicy = {
  schema: 'xbpp-pay/v1.0',
  version: '1',
  posture: 'CAUTIOUS',
  limits: {
    max_single: 1000,
    max_daily: 5000,
    max_weekly: 20000,
    max_monthly: 50000,
    require_human_above: 500,
  },
  verification: 'BUILT_IN',
  counterparty_rules: {
    new_counterparty_action: 'ESCALATE',
    require_verified: true,
  },
  value_rules: {
    base_currency: 'USD',
    accepted_currencies: ['USDC', 'USDT'],
  },
  rate_limits: {
    max_per_minute: 5,
    max_per_hour: 50,
    burst_detection: true,
  },
  confidence_rules: {
    min_confidence: 0.9,
    low_confidence_action: 'BLOCK',
  },
  audit: {
    log_level: 'VERBOSE',
    retention_days: 2555,
  },
};

const restrictiveConstraints: Constraint[] = [
  {
    id: 'audit-log',
    name: 'Audit Logging',
    description: 'Verbose logging with 7-year retention',
    type: 'require',
    isShared: true,
  },
  {
    id: 'rate-limit-base',
    name: 'Rate Limit',
    description: 'Max 5/min, 50/hr - burst detection ON',
    type: 'limit',
    parameter: 50,
    isShared: true,
  },
  // SPEND constraints
  {
    id: 'spend-limit-restrictive',
    name: 'Single Transaction Limit',
    description: 'Maximum $1,000 per transaction',
    type: 'limit',
    parameter: 1000,
    category: 'SPEND',
  },
  {
    id: 'daily-limit-restrictive',
    name: 'Daily Aggregate Limit',
    description: 'Daily spend limit of $5,000',
    type: 'limit',
    parameter: 5000,
    category: 'SPEND',
  },
  {
    id: 'human-threshold-restrictive',
    name: 'Human Approval Threshold',
    description: 'Escalate all transactions over $500',
    type: 'escalate',
    parameter: 500,
    category: 'SPEND',
  },
  {
    id: 'new-vendor-restrictive',
    name: 'New Counterparty Policy',
    description: 'Require human approval for new vendors',
    type: 'escalate',
    parameter: 'human-approval',
    category: 'SPEND',
  },
  {
    id: 'velocity-check',
    name: 'Velocity Monitoring',
    description: 'Flag and block unusual transaction patterns',
    type: 'deny',
    parameter: 'burst-detection',
    category: 'SPEND',
  },
  // SIGN constraints
  {
    id: 'signature-restrictive',
    name: 'Signature Threshold',
    description: 'Dual signature for amounts over $500',
    type: 'limit',
    parameter: 500,
    category: 'SIGN',
  },
  {
    id: 'approval-chain-restrictive',
    name: 'Approval Chain',
    description: 'Full verification required for all requests',
    type: 'escalate',
    parameter: 'full-chain',
    category: 'SIGN',
  },
  {
    id: 'verified-only',
    name: 'Verified Recipients Only',
    description: 'Block unverified counterparties',
    type: 'deny',
    parameter: 'verified-required',
    category: 'SIGN',
  },
  // DEFENSE constraints
  {
    id: 'confidence-restrictive',
    name: 'Confidence Threshold',
    description: 'Block low confidence (< 0.9) actions',
    type: 'limit',
    parameter: 0.9,
    category: 'DEFENSE',
  },
  {
    id: 'verification-restrictive',
    name: 'Verification Mode',
    description: 'Built-in verification, fail closed',
    type: 'require',
    parameter: 'fail-closed',
    category: 'DEFENSE',
  },
  {
    id: 'threat-detection',
    name: 'Threat Detection',
    description: 'Block drainer contracts, poisoning, honeypots',
    type: 'deny',
    parameter: 'full-threat-detection',
    category: 'DEFENSE',
  },
];

export const restrictivePolicy: Policy = {
  id: 'policy-restrictive-v1',
  name: 'Cautious Standard',
  type: 'xBPP',
  version: '1.0.0',
  description: 'A cautious policy that prioritizes verification and human oversight for all significant decisions. Favor safety; maximize oversight.',
  posture_summary: 'Verify everything. Ask when uncertain.',
  constraints: restrictiveConstraints,
  raw_json: restrictiveXBPP,
  xbpp: restrictiveXBPP,
  hash: 'xbpp-cau-2b8e',
};

export const policies: Policy[] = [permissivePolicy, restrictivePolicy];

export function getPolicyById(id: string): Policy | undefined {
  return policies.find(p => p.id === id);
}

// Get constraints relevant to a specific scenario category
export function getConstraintsForCategory(policy: Policy, category: 'SPEND' | 'SIGN' | 'DEFENSE'): Constraint[] {
  return policy.constraints.filter(c => c.category === category || c.isShared);
}

// Helper to get posture color class
export function getPostureColor(posture: Posture): string {
  switch (posture) {
    case 'AGGRESSIVE': return 'text-escalate';
    case 'BALANCED': return 'text-primary';
    case 'CAUTIOUS': return 'text-allow';
  }
}

// Helper to get posture badge class
export function getPostureBadgeClass(posture: Posture): string {
  switch (posture) {
    case 'AGGRESSIVE': return 'bg-escalate/10 text-escalate border-escalate/30';
    case 'BALANCED': return 'bg-primary/10 text-primary border-primary/30';
    case 'CAUTIOUS': return 'bg-allow/10 text-allow border-allow/30';
  }
}

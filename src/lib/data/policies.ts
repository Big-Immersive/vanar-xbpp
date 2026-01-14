import { Policy, Constraint } from '../types';

// Base shared constraints
const sharedConstraints: Constraint[] = [
  {
    id: 'audit-log',
    name: 'Audit Logging',
    description: 'All transactions must be logged with full context',
    type: 'require',
    isShared: true,
  },
  {
    id: 'rate-limit-base',
    name: 'Base Rate Limit',
    description: 'Maximum 100 transactions per hour',
    type: 'limit',
    parameter: 100,
    isShared: true,
  },
];

export const permissivePolicy: Policy = {
  id: 'policy-permissive-v1',
  name: 'Permissive Standard',
  type: 'BPP',
  version: '1.0.0',
  description: 'A balanced policy that prioritizes operational efficiency while maintaining basic safety guardrails.',
  posture_summary: 'Trust efficiency. Escalate only when necessary.',
  constraints: [
    ...sharedConstraints,
    {
      id: 'spend-limit-permissive',
      name: 'Transaction Limit',
      description: 'Individual transactions up to $10,000 allowed',
      type: 'limit',
      parameter: 10000,
    },
    {
      id: 'daily-limit-permissive',
      name: 'Daily Aggregate Limit',
      description: 'Daily spend limit of $50,000',
      type: 'limit',
      parameter: 50000,
    },
    {
      id: 'new-vendor-permissive',
      name: 'New Vendor Policy',
      description: 'Allow new vendors with basic verification',
      type: 'require',
      parameter: 'basic-verification',
    },
    {
      id: 'signature-permissive',
      name: 'Signature Threshold',
      description: 'Single signature for amounts under $25,000',
      type: 'limit',
      parameter: 25000,
    },
  ],
  raw_json: {
    version: '1.0.0',
    type: 'BPP',
    posture: 'permissive',
    rules: {
      transaction_limit: 10000,
      daily_aggregate: 50000,
      new_vendor: 'allow_with_basic_verification',
      signature_threshold: 25000,
      escalation_trigger: 'high_risk_only',
    },
  },
  hash: 'bpp-7a3f9c2e',
};

export const restrictivePolicy: Policy = {
  id: 'policy-restrictive-v1',
  name: 'Restrictive Standard',
  type: 'DBP',
  version: '1.0.0',
  description: 'A cautious policy that prioritizes verification and human oversight for all significant decisions.',
  posture_summary: 'Verify everything. Ask when uncertain.',
  constraints: [
    ...sharedConstraints,
    {
      id: 'spend-limit-restrictive',
      name: 'Transaction Limit',
      description: 'Individual transactions up to $1,000 allowed',
      type: 'limit',
      parameter: 1000,
    },
    {
      id: 'daily-limit-restrictive',
      name: 'Daily Aggregate Limit',
      description: 'Daily spend limit of $5,000',
      type: 'limit',
      parameter: 5000,
    },
    {
      id: 'new-vendor-restrictive',
      name: 'New Vendor Policy',
      description: 'Require human approval for all new vendors',
      type: 'escalate',
      parameter: 'human-approval',
    },
    {
      id: 'signature-restrictive',
      name: 'Signature Threshold',
      description: 'Dual signature for amounts over $500',
      type: 'limit',
      parameter: 500,
    },
    {
      id: 'velocity-check',
      name: 'Velocity Check',
      description: 'Flag unusual transaction patterns',
      type: 'require',
      parameter: 'pattern-analysis',
    },
  ],
  raw_json: {
    version: '1.0.0',
    type: 'DBP',
    posture: 'restrictive',
    rules: {
      transaction_limit: 1000,
      daily_aggregate: 5000,
      new_vendor: 'require_human_approval',
      signature_threshold: 500,
      velocity_check: true,
      escalation_trigger: 'any_uncertainty',
    },
  },
  hash: 'dbp-2b8e4d1f',
};

export const policies: Policy[] = [permissivePolicy, restrictivePolicy];

export function getPolicyById(id: string): Policy | undefined {
  return policies.find(p => p.id === id);
}

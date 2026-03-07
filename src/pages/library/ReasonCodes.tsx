import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Play, Shield, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AnimatedBackground } from '@/components/effects';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReasonCode {
  code: string;
  decision: 'BLOCK' | 'ESCALATE' | 'VARIES';
  category: string;
  description: string;
  example: string;
}

const reasonCodes: ReasonCode[] = [
  // Core Limits
  { code: 'EXCEEDS_SINGLE_LIMIT', decision: 'BLOCK', category: 'Limits', description: 'Value exceeds max_single policy limit', example: '$500 transaction when max_single is $100' },
  { code: 'EXCEEDS_DAILY_LIMIT', decision: 'BLOCK', category: 'Limits', description: 'Would exceed daily spending limit', example: '$600 when $500 already spent today (max_daily: $1000)' },
  { code: 'EXCEEDS_WEEKLY_LIMIT', decision: 'BLOCK', category: 'Limits', description: 'Would exceed weekly spending limit', example: 'Near end of week with budget exhausted' },
  { code: 'EXCEEDS_MONTHLY_LIMIT', decision: 'BLOCK', category: 'Limits', description: 'Would exceed monthly spending limit', example: 'Large purchase near month end' },
  { code: 'HIGH_VALUE', decision: 'ESCALATE', category: 'Limits', description: 'Value exceeds require_human_above threshold', example: '$750 transaction when ask_me_above is $500' },
  
  // Validation
  { code: 'INVALID_VALUE', decision: 'BLOCK', category: 'Validation', description: 'Value malformed, negative, or precision overflow', example: 'Negative amount or NaN value' },
  { code: 'INVALID_CURRENCY', decision: 'BLOCK', category: 'Validation', description: 'Currency code not recognized', example: 'Unknown or malformed currency symbol' },
  { code: 'INVALID_CHAIN', decision: 'BLOCK', category: 'Validation', description: 'Chain identifier not recognized', example: 'Unknown blockchain network' },
  { code: 'INVALID_ACTION', decision: 'BLOCK', category: 'Validation', description: 'Action format or structure invalid', example: 'Missing required fields in action' },
  
  // Counterparty
  { code: 'NEW_COUNTERPARTY', decision: 'VARIES', category: 'Counterparty', description: 'First-time payment recipient', example: 'Paying a vendor for the first time' },
  { code: 'BLOCKLISTED_MERCHANT', decision: 'BLOCK', category: 'Counterparty', description: 'Target in merchant blocklist', example: 'Known scam or sanctioned address' },
  { code: 'UNVERIFIED_MERCHANT', decision: 'VARIES', category: 'Counterparty', description: 'Target not verified in registry', example: 'Vendor not in trusted registry' },
  { code: 'NEW_CONTRACT', decision: 'VARIES', category: 'Counterparty', description: 'Contract below minimum age threshold', example: 'Contract deployed 2 hours ago (min: 72h)' },
  { code: 'REVOKED_TARGET', decision: 'BLOCK', category: 'Counterparty', description: 'Target revoked in registry', example: 'Previously approved vendor now flagged' },
  
  // Chain Rules
  { code: 'CHAIN_NOT_ALLOWED', decision: 'BLOCK', category: 'Chain', description: 'Chain not in allowed_chains list', example: 'Transaction on Polygon when only Base allowed' },
  { code: 'UNKNOWN_CHAIN', decision: 'VARIES', category: 'Chain', description: 'Chain not recognized by policy', example: 'New L2 not yet in configuration' },
  { code: 'CROSS_CHAIN_TRANSACTION', decision: 'VARIES', category: 'Chain', description: 'Transaction crosses chain boundaries', example: 'Bridge operation between networks' },
  
  // Currency
  { code: 'UNSUPPORTED_CURRENCY', decision: 'BLOCK', category: 'Currency', description: 'Currency in blocked_currencies list', example: 'Meme coin when only stables allowed' },
  { code: 'UNKNOWN_CURRENCY', decision: 'VARIES', category: 'Currency', description: 'Currency not in configuration', example: 'New token not yet categorized' },
  { code: 'PRICE_STALE', decision: 'VARIES', category: 'Currency', description: 'Price oracle data too old', example: 'Price data over 5 minutes old' },
  
  // Rate Limiting
  { code: 'RATE_LIMITED', decision: 'BLOCK', category: 'Rate', description: 'Exceeds configured rate limits', example: '100 transactions in 1 minute (max: 50)' },
  { code: 'BURST_DETECTED', decision: 'VARIES', category: 'Rate', description: 'Unusual transaction burst pattern', example: '20 transactions in 10 seconds' },
  { code: 'FRAGMENTATION_DETECTED', decision: 'VARIES', category: 'Rate', description: 'Possible split transaction attack', example: 'Five $99 transactions to same address' },
  
  // Security
  { code: 'DRAINER_CONTRACT', decision: 'BLOCK', category: 'Security', description: 'Known wallet drainer detected', example: 'Interacting with flagged drainer' },
  { code: 'ADDRESS_POISONING', decision: 'BLOCK', category: 'Security', description: 'Address confusion attack detected', example: 'Similar address to known contact' },
  { code: 'HONEYPOT_TOKEN', decision: 'BLOCK', category: 'Security', description: 'Token with sell restrictions detected', example: 'Token that cannot be sold' },
  { code: 'PHISHING_DETECTED', decision: 'BLOCK', category: 'Security', description: 'Phishing attempt detected', example: 'Spoofed merchant or contract' },
  
  // Confidence
  { code: 'LOW_CONFIDENCE', decision: 'VARIES', category: 'Confidence', description: 'Agent confidence below threshold', example: 'Agent reports 40% confidence (min: 70%)' },
  { code: 'CONFIDENCE_MISSING', decision: 'VARIES', category: 'Confidence', description: 'Confidence not provided in action', example: 'Action missing confidence field' },
  
  // System
  { code: 'DUPLICATE_ACTION', decision: 'BLOCK', category: 'System', description: 'Action hash seen within window', example: 'Same action submitted twice in 10 seconds' },
  { code: 'KILL_SWITCH_ACTIVE', decision: 'BLOCK', category: 'System', description: 'Emergency stop engaged', example: 'System-wide emergency halt active' },
  { code: 'VERIFICATION_UNAVAILABLE', decision: 'VARIES', category: 'System', description: 'Verification service unreachable', example: 'Registry API timeout' },
  { code: 'ESCALATION_TIMEOUT', decision: 'BLOCK', category: 'System', description: 'Escalation expired without response', example: 'No human response within timeout' },
];

const categories = ['All', 'Limits', 'Validation', 'Counterparty', 'Chain', 'Currency', 'Rate', 'Security', 'Confidence', 'System'];
const decisions = ['All', 'BLOCK', 'ESCALATE', 'VARIES'];

const getDecisionIcon = (decision: string) => {
  switch (decision) {
    case 'BLOCK': return XCircle;
    case 'ESCALATE': return Clock;
    case 'VARIES': return AlertTriangle;
    default: return CheckCircle;
  }
};

const getDecisionColor = (decision: string) => {
  switch (decision) {
    case 'BLOCK': return 'text-block bg-block/10 border-block/30';
    case 'ESCALATE': return 'text-escalate bg-escalate/10 border-escalate/30';
    case 'VARIES': return 'text-muted-foreground bg-muted/30 border-border';
    default: return 'text-allow bg-allow/10 border-allow/30';
  }
};

export default function ReasonCodesPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [decisionFilter, setDecisionFilter] = useState('All');

  const filteredCodes = reasonCodes.filter(code => {
    const matchesSearch = search === '' || 
      code.code.toLowerCase().includes(search.toLowerCase()) ||
      code.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || code.category === categoryFilter;
    const matchesDecision = decisionFilter === 'All' || code.decision === decisionFilter;
    return matchesSearch && matchesCategory && matchesDecision;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      <AnimatedBackground variant="subtle" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8">
          <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">Library</p>
          <h1 className="text-4xl md:text-5xl font-medium mb-4" style={{ fontFamily: "'Akira Expanded', 'Arial Black', sans-serif" }}>
            Reason Codes Reference
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Complete reference for all 45+ xBPP reason codes.
          </p>
        </header>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 mb-8">
          {decisions.map(dec => (
            <Button
              key={dec}
              variant={decisionFilter === dec ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setDecisionFilter(dec)}
              className={decisionFilter === dec ? '' : getDecisionColor(dec)}
            >
              {dec}
            </Button>
          ))}
        </div>
        
        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredCodes.length} of {reasonCodes.length} codes
        </p>
        
        {/* Reason Codes Grid */}
        <div className="grid gap-4">
          {filteredCodes.map((code) => {
            const Icon = getDecisionIcon(code.decision);
            return (
              <div 
                key={code.code}
                className="p-4 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-lg border shrink-0",
                    getDecisionColor(code.decision)
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <code className="font-mono font-medium text-foreground">{code.code}</code>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-mono",
                        getDecisionColor(code.decision)
                      )}>
                        {code.decision}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                        {code.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{code.description}</p>
                    <p className="text-xs text-muted-foreground/70 italic">
                      Example: {code.example}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="shrink-0">
                    <Link to={`/playground?code=${code.code}`}>
                      <Play className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  ShieldAlert, 
  Check, 
  X, 
  AlertTriangle,
  DollarSign,
  PenTool,
  Eye
} from 'lucide-react';
import { scenarios } from '@/lib/data/scenarios';
import { runs } from '@/lib/data/runs';
import { AnimatedBackground } from '@/components/effects';
import { cn } from '@/lib/utils';
import { Category, DecisionType } from '@/lib/types';

const categoryConfig: Record<Category, { icon: typeof DollarSign; label: string; color: string }> = {
  SPEND: { icon: DollarSign, label: 'Spend', color: 'text-emerald-400' },
  SIGN: { icon: PenTool, label: 'Sign', color: 'text-blue-400' },
  DEFENSE: { icon: Eye, label: 'Defense', color: 'text-purple-400' },
};

const decisionConfig: Record<DecisionType, { icon: typeof Check; label: string; bg: string; text: string }> = {
  ALLOW: { 
    icon: Check, 
    label: 'Allow', 
    bg: 'bg-emerald-500/20 border-emerald-500/30', 
    text: 'text-emerald-400' 
  },
  BLOCK: { 
    icon: X, 
    label: 'Block', 
    bg: 'bg-red-500/20 border-red-500/30', 
    text: 'text-red-400' 
  },
  ESCALATE: { 
    icon: AlertTriangle, 
    label: 'Escalate', 
    bg: 'bg-amber-500/20 border-amber-500/30', 
    text: 'text-amber-400' 
  },
};

function DecisionBadge({ decision }: { decision: DecisionType }) {
  const config = decisionConfig[decision];
  const Icon = config.icon;
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium',
        config.bg,
        config.text
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </motion.div>
  );
}

function MatrixRow({ 
  scenario, 
  permissiveDecision, 
  restrictiveDecision, 
  index 
}: { 
  scenario: typeof scenarios[0];
  permissiveDecision: DecisionType;
  restrictiveDecision: DecisionType;
  index: number;
}) {
  const categoryInfo = categoryConfig[scenario.category];
  const CategoryIcon = categoryInfo.icon;
  const isDivergent = permissiveDecision !== restrictiveDecision;
  
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={cn(
        'group border-b border-border/30 transition-colors',
        isDivergent ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/30'
      )}
    >
      {/* Scenario Info */}
      <td className="py-4 px-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            'p-2 rounded-lg bg-muted/50 shrink-0',
            categoryInfo.color
          )}>
            <CategoryIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <Link 
              to={`/compare?scenario=${scenario.id}`}
              className="font-medium text-foreground hover:text-primary transition-colors block truncate"
            >
              {scenario.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {scenario.narrative}
            </p>
          </div>
        </div>
      </td>
      
      {/* Category */}
      <td className="py-4 px-4">
        <span className={cn('text-sm font-medium', categoryInfo.color)}>
          {categoryInfo.label}
        </span>
      </td>
      
      {/* Risk Level */}
      <td className="py-4 px-4">
        <span className={cn(
          'text-sm font-medium',
          scenario.risk_level === 'HIGH' && 'text-red-400',
          scenario.risk_level === 'MEDIUM' && 'text-amber-400',
          scenario.risk_level === 'LOW' && 'text-emerald-400'
        )}>
          {scenario.risk_level}
        </span>
      </td>
      
      {/* Permissive Policy */}
      <td className="py-4 px-4">
        <DecisionBadge decision={permissiveDecision} />
      </td>
      
      {/* Restrictive Policy */}
      <td className="py-4 px-4">
        <DecisionBadge decision={restrictiveDecision} />
      </td>
      
      {/* Divergence Indicator */}
      <td className="py-4 px-4">
        {isDivergent ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 + 0.2, type: 'spring', stiffness: 500 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium">Divergent</span>
          </motion.div>
        ) : (
          <span className="text-xs text-muted-foreground">Same</span>
        )}
      </td>
      
      {/* Action */}
      <td className="py-4 px-4">
        <Link
          to={`/compare?scenario=${scenario.id}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
        >
          Explore
          <ArrowRight className="w-3 h-3" />
        </Link>
      </td>
    </motion.tr>
  );
}

export default function Matrix() {
  const [categoryFilter, setCategoryFilter] = useState<Category | 'ALL'>('ALL');
  const [showDivergentOnly, setShowDivergentOnly] = useState(false);
  
  const matrixData = useMemo(() => {
    return scenarios.map(scenario => {
      const permissiveRun = runs[`${scenario.id}-permissive`];
      const restrictiveRun = runs[`${scenario.id}-restrictive`];
      
      return {
        scenario,
        permissiveDecision: permissiveRun?.decisions[0]?.decision || 'ALLOW',
        restrictiveDecision: restrictiveRun?.decisions[0]?.decision || 'BLOCK',
      };
    });
  }, []);
  
  const filteredData = useMemo(() => {
    return matrixData.filter(item => {
      if (categoryFilter !== 'ALL' && item.scenario.category !== categoryFilter) {
        return false;
      }
      if (showDivergentOnly && item.permissiveDecision === item.restrictiveDecision) {
        return false;
      }
      return true;
    });
  }, [matrixData, categoryFilter, showDivergentOnly]);
  
  const stats = useMemo(() => {
    const divergent = matrixData.filter(d => d.permissiveDecision !== d.restrictiveDecision).length;
    const byCategory = {
      SPEND: matrixData.filter(d => d.scenario.category === 'SPEND').length,
      SIGN: matrixData.filter(d => d.scenario.category === 'SIGN').length,
      DEFENSE: matrixData.filter(d => d.scenario.category === 'DEFENSE').length,
    };
    return { total: matrixData.length, divergent, byCategory };
  }, [matrixData]);
  
  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <AnimatedBackground variant="subtle" />
      
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Comparison Matrix
          </h1>
          <p className="text-muted-foreground">
            All scenarios with their outcomes under each policy, side by side.
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Scenarios</div>
          </div>
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{stats.divergent}</div>
            <div className="text-sm text-primary/70">Divergent Outcomes</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">{stats.byCategory.SPEND}</div>
            <div className="text-sm text-muted-foreground">Spend Scenarios</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.byCategory.SIGN}</div>
            <div className="text-sm text-muted-foreground">Sign Scenarios</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">{stats.byCategory.DEFENSE}</div>
            <div className="text-sm text-muted-foreground">Defense Scenarios</div>
          </div>
        </motion.div>
        
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-4 mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <div className="flex gap-1">
              {(['ALL', 'SPEND', 'SIGN', 'DEFENSE'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-lg transition-colors',
                    categoryFilter === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {cat === 'ALL' ? 'All' : categoryConfig[cat].label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-6 w-px bg-border/50" />
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDivergentOnly}
              onChange={(e) => setShowDivergentOnly(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
            />
            <span className="text-sm text-muted-foreground">Show divergent only</span>
          </label>
        </motion.div>
        
        {/* Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Scenario
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Risk
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      Permissive
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      Restrictive
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <MatrixRow
                    key={item.scenario.id}
                    scenario={item.scenario}
                    permissiveDecision={item.permissiveDecision}
                    restrictiveDecision={item.restrictiveDecision}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No scenarios match the current filters.
            </div>
          )}
        </motion.div>
        
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500/50 border border-emerald-500/50" />
            <span>Allow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/50" />
            <span>Block</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/50 border border-amber-500/50" />
            <span>Escalate</span>
          </div>
          <div className="h-4 w-px bg-border/50" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Policies diverge</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

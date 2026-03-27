import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Lock, Eye, Users, GitBranch,
  Check, ChevronDown, ChevronRight, Star, FileText, Code,
  AlertTriangle, Clock, Database, Cpu
} from 'lucide-react';
import { TracedWizard } from '@/components/visualization';

/* =============================================================================
   GREPTILE PIXEL-PERFECT CLONE FOR xBPP
   Based on https://www.greptile.com/ captured 2026-03-27

   Exact values extracted via Playwright:
   - Body BG: rgb(241,239,235) = #F1EFEB
   - Green: rgb(16,122,77) = #107A4D
   - Dark green: rgb(6,40,27) = #06281B
   - Text: rgb(42,42,42) = #2A2A2A
   - Text secondary: rgb(106,106,106) = #6A6A6A
   - Border: rgb(204,204,204) = #CCCCCC
   - H1: 72px/72px, weight 600, tracking -2.88px, tasaOrbiter
   - H2: 48px, weight 600, tasaOrbiter
   - Mono: 14-16px, geistMono
   - Nav: 57px, border-bottom 1px solid #CCC
   - Buttons: 8px 16px padding, 0 border-radius
   - Content: border-x, margin 0 96px (lg:mx-24)
   ============================================================================= */

// Design tokens — exact Greptile values
const C = {
  bg: '#F1EFEB',
  green: '#107A4D',
  greenDark: '#06281B',
  text: '#2A2A2A',
  textSecondary: '#6A6A6A',
  textTertiary: '#999999',
  border: '#CCCCCC',
  white: '#FFFFFF',
};

// Font classes matching Greptile's typography
const FONT = {
  display: 'font-[\'Instrument_Serif\',Georgia,serif]',
  mono: 'font-mono', // JetBrains Mono via tailwind config
  body: 'font-[\'Inter\',sans-serif]',
};

// ============================================================================
// PROGRESSIVE LINE-FILL BUTTON
// Greptile-style button with border lines that expand on hover
// ============================================================================
function LineButton({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  icon,
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
  icon?: React.ReactNode;
}) {
  const baseClasses = `
    group relative inline-flex items-center gap-2
    text-[14px] font-mono tracking-normal
    transition-all duration-200
  `;

  const variants = {
    primary: `bg-[${C.green}] text-white px-[16px] py-[8px]`,
    secondary: `bg-transparent text-[${C.text}] px-[16px] py-[8px]`,
    dark: `bg-[${C.greenDark}] text-white px-[16px] py-[8px]`,
  };

  const content = (
    <>
      {/* Progressive line fill - left side */}
      {variant === 'secondary' && (
        <>
          <span className="absolute top-0 left-0 w-[5.5px] h-full border-t border-l border-b border-[#414141] transition-[width] duration-500 group-hover:w-full group-hover:border-b-0" />
          <span className="absolute bottom-0 right-0 w-[5.5px] h-full border-t border-r border-b border-[#414141] transition-[width] duration-500 group-hover:w-full group-hover:border-t-0" />
        </>
      )}
      {children}
      {icon}
    </>
  );

  const allClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={allClasses}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={allClasses}>{content}</a>;
  }
  return <button className={allClasses}>{content}</button>;
}

// ============================================================================
// NAVBAR — exact Greptile: 57px height, 1px border-bottom #CCC
// ============================================================================
function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: C.bg,
        borderColor: C.border,
        height: '57px',
      }}
    >
      <div className="h-full mx-4 md:mx-8 lg:mx-24 xl:mx-32 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6" style={{ color: C.green }} />
          <span
            className={`${FONT.display} text-[20px] font-normal`}
            style={{ color: C.text }}
          >
            xBPP
          </span>
        </Link>

        {/* Center links — 14px Inter */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'Spec', to: '/spec' },
            { label: 'Playground', to: '/playground' },
            { label: 'Library', to: '/library' },
            { label: 'Test Suite', to: '/test-suite' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[14px] transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: C.text,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.green)}
              onMouseLeave={e => (e.currentTarget.style.color = C.text)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right buttons — Greptile has Sign In (dark) + Start Now (green) */}
        <div className="flex items-center gap-3">
          <Link
            to="/spec"
            className="hidden sm:inline-flex items-center text-[14px] font-mono px-[16px] py-[8px]"
            style={{
              backgroundColor: C.greenDark,
              color: C.white,
            }}
          >
            Docs
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center text-[14px] font-mono px-[16px] py-[8px]"
            style={{
              backgroundColor: C.green,
              color: C.white,
            }}
          >
            Start Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// BORDERED CONTENT WRAPPER
// Greptile pattern: border-x border-[#CCC] with mx-24 at desktop
// ============================================================================
function BorderedContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`border-x mx-4 md:mx-8 lg:mx-24 xl:mx-32 ${className}`}
      style={{ borderColor: C.border }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// HR SEPARATOR — Greptile: 1px solid #CCC, inside bordered area
// ============================================================================
function Separator() {
  return (
    <hr
      className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 border-0 border-t"
      style={{ borderColor: C.border }}
    />
  );
}

// ============================================================================
// SECTION BADGE — Greptile bracket notation: [ SHIP FASTER ]
// Mono font, scrambled chars after tag text
// ============================================================================
function SectionBadge({ text }: { text: string }) {
  // Generate scrambled chars like Greptile does
  const scrambleChars = ')*^&.?$`]*$+={#_|';
  const scrambled = scrambleChars.slice(0, Math.min(text.length, 12));

  return (
    <p
      className="text-[14px] font-mono mb-3"
      style={{ color: C.textSecondary }}
    >
      <span style={{ color: C.green }}>[ {text}</span>
      <span style={{ color: C.textTertiary }}>{scrambled}</span>
    </p>
  );
}

// ============================================================================
// HERO SECTION — Centered layout matching Greptile exactly
// H1: 72px, weight 600, line-height 72px, tracking -2.88px, COLOR: GREEN
// Mascot positioned like Greptile's crow (upper right, overlapping)
// ============================================================================
function HeroSection() {
  const [isEvaluating, setIsEvaluating] = useState(false);

  return (
    <BorderedContent>
      <div className="relative overflow-hidden" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        {/* Wizard mascot — positioned like Greptile's crow: upper right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 right-0 z-10 hidden lg:block"
          style={{ right: '-20px', top: '-10px' }}
          onMouseEnter={() => setIsEvaluating(true)}
          onMouseLeave={() => setIsEvaluating(false)}
        >
          <TracedWizard
            width={380}
            height={340}
            isEvaluating={isEvaluating}
          />
        </motion.div>

        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* H1 — Greptile: 72px, 600 weight, line-height 72px, letter-spacing -2.88px, GREEN */}
            <h1
              className={`${FONT.display} max-w-[700px]`}
              style={{
                fontSize: '72px',
                fontWeight: 600,
                lineHeight: '72px',
                letterSpacing: '-2.88px',
                color: C.green,
              }}
            >
              The Agent<br />Gatekeeper
            </h1>
          </motion.div>

          {/* Eyebrow text — Greptile: geistMono 16px, green, uppercase */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6"
          >
            <p className="text-[16px] font-mono leading-[24px]" style={{ color: C.green }}>
              AI AGENTS THAT PROVE INTENT
            </p>
            <p className="text-[16px] font-mono leading-[24px]" style={{ color: C.green }}>
              BEFORE SPENDING WITH
            </p>
            <p className="text-[16px] font-mono leading-[24px]" style={{ color: C.green }}>
              FULL CONTEXT OF YOUR POLICY
            </p>
          </motion.div>

          {/* CTA — Greptile: green bg, mono 14px, 8px 16px padding, 0 radius */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 text-[14px] font-mono px-[16px] py-[8px]"
              style={{
                backgroundColor: C.green,
                color: C.white,
              }}
            >
              Try the Playground
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[14px] font-mono mt-2" style={{ color: C.textSecondary }}>
              open standard &bull; no account required
            </p>
          </motion.div>
        </div>
      </div>
    </BorderedContent>
  );
}

// ============================================================================
// ANIMATED SECTION WRAPPER
// ============================================================================
function Section({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <BorderedContent>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 ${className}`}
      >
        {children}
      </motion.div>
    </BorderedContent>
  );
}

// ============================================================================
// DARK SECTION — for full-width dark background areas
// ============================================================================
function DarkSection({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div
      className="mx-4 md:mx-8 lg:mx-24 xl:mx-32 border-x"
      style={{ borderColor: C.border, backgroundColor: C.greenDark }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// FEATURE CARD — Greptile style with corner squares
// Border 1px solid #CCC, no border-radius, corner accents
// ============================================================================
function FeatureCard({ title, description, icon: Icon, badge }: {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
}) {
  return (
    <div
      className="relative border p-6 group transition-colors cursor-default"
      style={{ borderColor: C.border, backgroundColor: 'rgba(255,255,255,0.5)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = C.text;
        e.currentTarget.querySelectorAll('.corner-sq').forEach(el => {
          (el as HTMLElement).style.backgroundColor = C.green;
        });
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.querySelectorAll('.corner-sq').forEach(el => {
          (el as HTMLElement).style.backgroundColor = C.border;
        });
      }}
    >
      {/* Corner squares — 6x6px, positioned at exact corners */}
      <div className="corner-sq absolute top-0 left-0 w-[6px] h-[6px] transition-colors duration-200" style={{ backgroundColor: C.border }} />
      <div className="corner-sq absolute top-0 right-0 w-[6px] h-[6px] transition-colors duration-200" style={{ backgroundColor: C.border }} />
      <div className="corner-sq absolute bottom-0 left-0 w-[6px] h-[6px] transition-colors duration-200" style={{ backgroundColor: C.border }} />
      <div className="corner-sq absolute bottom-0 right-0 w-[6px] h-[6px] transition-colors duration-200" style={{ backgroundColor: C.border }} />

      {badge && (
        <p className="text-[12px] font-mono mb-3" style={{ color: C.green }}>
          [{badge}]
        </p>
      )}
      <Icon className="w-5 h-5 mb-4" style={{ color: C.green }} />
      <h3
        className={`${FONT.display} text-[20px] font-semibold mb-2`}
        style={{ color: C.text }}
      >
        {title}
      </h3>
      <p className="text-[14px] leading-[20px]" style={{ color: C.textSecondary }}>
        {description}
      </p>
    </div>
  );
}

// ============================================================================
// SOCIAL PROOF BANNER — Greptile: "1000+ TEAMS..." section
// ============================================================================
function SocialProofSection() {
  return (
    <Section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[14px] font-mono" style={{ color: C.text }}>
          THE OPEN STANDARD FOR AI AGENT TRANSACTION TRUST.
        </p>
        <Link
          to="/spec"
          className="inline-flex items-center gap-2 text-[14px] font-mono transition-colors"
          style={{ color: C.textSecondary }}
          onMouseEnter={e => (e.currentTarget.style.color = C.text)}
          onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
        >
          READ THE SPECIFICATION
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Partner logos placeholder - Greptile has client logos here */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {['VanarChain', 'Agent SDK', 'OpenTrust', 'ChainGuard'].map(name => (
          <div
            key={name}
            className="flex items-center justify-center py-4 text-[14px] font-mono"
            style={{ color: C.textTertiary }}
          >
            {name}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// FEATURES SECTION — "Your second pair of eyes" / "Your transaction gatekeeper"
// Greptile: H2 48px tasaOrbiter, 2x2 feature card grid
// ============================================================================
function FeaturesSection() {
  return (
    <Section>
      {/* Header — Greptile style */}
      <div className="mb-12">
        <SectionBadge text="THE PROTOCOL" />
        <h2
          className={`${FONT.display} mb-4`}
          style={{
            fontSize: '48px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Your transaction gatekeeper.
        </h2>
        <p className="text-[16px] max-w-2xl" style={{ color: C.textSecondary }}>
          xBPP evaluates every agent transaction against your policy before execution.
        </p>
      </div>

      {/* Greptile-style "See in action" button */}
      <div className="mb-8">
        <Link
          to="/playground"
          className="hover-btn"
        >
          See xBPP in action
        </Link>
      </div>

      {/* 2x2 Feature Grid — matching Greptile's feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t" style={{ borderColor: C.border }}>
        <FeatureCard
          icon={Shield}
          badge="EVALUATION"
          title="9-Phase Evaluation"
          description="Every transaction passes through identity, scope, limits, risk, anomaly, context, escalation, audit, and verdict phases."
        />
        <FeatureCard
          icon={FileText}
          badge="POLICY"
          title="Policy-as-Code"
          description="Define your trust boundaries in code. Version control your agent permissions like infrastructure."
        />
        <FeatureCard
          icon={Eye}
          badge="MONITORING"
          title="Real-time Monitoring"
          description="Watch transactions flow through evaluation. See exactly why each was allowed, blocked, or escalated."
        />
        <FeatureCard
          icon={Users}
          badge="ESCALATION"
          title="Human Escalation"
          description="High-risk transactions route to human approval. You stay in control of what matters."
        />
      </div>
    </Section>
  );
}

// ============================================================================
// CONTEXT SECTION — Dark background, trust visualization
// ============================================================================
function ContextSection() {
  return (
    <DarkSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[14px] font-mono mb-3" style={{ color: '#3ECFA5' }}>
            [ FULL CONTEXT
            <span style={{ color: 'rgba(255,255,255,0.3)' }}> +/%|+)!&lt;{'}'}</span>
          </p>
          <h2
            className={FONT.display}
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: C.white,
            }}
          >
            Trust is the product.
          </h2>
          <p className="text-[16px] mt-4 mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            In the near future, no autonomous agent will execute a transaction
            without a trust receipt. xBPP is building that future.
          </p>

          {/* Checklist — Greptile style */}
          <ul className="space-y-3">
            {[
              'Immutable audit trail for every decision',
              'Cryptographic proof of policy compliance',
              'On-chain verification via VanarChain',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[14px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#3ECFA5' }} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              to="/spec"
              className="inline-flex items-center gap-2 text-[14px] font-mono px-[16px] py-[8px]"
              style={{ backgroundColor: '#3ECFA5', color: C.greenDark }}
            >
              <ArrowRight className="w-4 h-4" />
              Learn more
            </Link>
          </div>
        </div>

        {/* Network visualization */}
        <div className="relative h-80 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 150 + i * 80,
                  height: 150 + i * 80,
                  border: '1px solid rgba(62, 207, 165, 0.2)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
            <div
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#3ECFA5' }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </DarkSection>
  );
}

// ============================================================================
// POLICY SECTION — "Your house, your rules."
// Greptile: split layout with code editor + explanation
// ============================================================================
function PolicySection() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <SectionBadge text="CUSTOM CONTEXT" />
          <h2
            className={FONT.display}
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: C.text,
            }}
          >
            Your house, your rules.
          </h2>
          <p className="text-[16px] mt-4 mb-8" style={{ color: C.textSecondary }}>
            xBPP is better when personalized to your team.
          </p>

          {/* Feature list — Greptile style with numbered items */}
          <div className="space-y-6">
            {[
              {
                icon: FileText,
                title: 'Write policies in YAML or point to a config',
                desc: 'Define spending limits, scope restrictions, and escalation rules in a simple config file.',
              },
              {
                icon: GitBranch,
                title: 'Scope policies by agent or context',
                desc: 'Apply different trust boundaries to different agents, environments, or transaction types.',
              },
              {
                icon: Eye,
                title: 'Track policy effectiveness over time',
                desc: 'Analyze whether policies are catching real issues or need adjustment.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 cursor-pointer group"
              >
                <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: C.green }} />
                <div>
                  <h5
                    className="text-[16px] font-semibold mb-1 transition-colors"
                    style={{ color: C.text }}
                  >
                    {item.title}
                  </h5>
                  <p className="text-[14px]" style={{ color: C.textSecondary }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/spec" className="hover-btn">
              Explore Policies
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Code editor — Greptile style */}
        <div className="border overflow-hidden" style={{ borderColor: C.border, backgroundColor: '#0A0A0A' }}>
          <div className="px-4 py-2 border-b flex items-center gap-2" style={{ borderColor: '#333' }}>
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="text-[12px] font-mono ml-2" style={{ color: '#666' }}>policy.yaml</span>
          </div>
          <pre className="p-4 text-[13px] leading-[20px] font-mono overflow-x-auto" style={{ color: '#E0E0E0' }}>
{`posture: BALANCED

limits:
  daily_spend: 1000 USDC
  single_tx: 100 USDC

escalation:
  threshold: 50 USDC
  require: human_approval

block:
  - unknown_counterparty
  - after_hours

audit:
  store: vanarchain
  retention: 90d`}
          </pre>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// HOW IT WORKS — 9 phases (Greptile-style data section)
// ============================================================================
function HowItWorksSection() {
  const phases = [
    { num: 1, name: 'Identity', desc: 'Verify agent credentials' },
    { num: 2, name: 'Scope', desc: 'Confirm action permitted' },
    { num: 3, name: 'Limits', desc: 'Validate spending caps' },
    { num: 4, name: 'Risk', desc: 'Calculate exposure' },
    { num: 5, name: 'Anomaly', desc: 'Detect deviations' },
    { num: 6, name: 'Context', desc: 'Evaluate patterns' },
    { num: 7, name: 'Escalate', desc: 'Route if needed' },
    { num: 8, name: 'Audit', desc: 'Record decision' },
    { num: 9, name: 'Verdict', desc: 'ALLOW / BLOCK' },
  ];

  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <div>
          <SectionBadge text="THE 9 PHASES" />
          <h2
            className={FONT.display}
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: C.text,
            }}
          >
            How xBPP evaluates transactions.
          </h2>
        </div>
        <Link to="/spec" className="hover-btn mt-4 md:mt-0">
          <ArrowRight className="w-4 h-4 mr-2" />
          View full spec
        </Link>
      </div>

      {/* Phase grid — horizontal strip */}
      <div
        className="grid grid-cols-3 md:grid-cols-9 border-t"
        style={{ borderColor: C.border }}
      >
        {phases.map((phase) => (
          <div
            key={phase.num}
            className="border-b border-r px-3 py-4 text-center group transition-colors"
            style={{ borderColor: C.border }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(16,122,77,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div
              className="text-[20px] font-mono font-medium mb-1"
              style={{ color: C.green }}
            >
              {phase.num}
            </div>
            <p className="text-[12px] font-semibold" style={{ color: C.text }}>
              {phase.name}
            </p>
            <p className="text-[11px] mt-0.5 hidden md:block" style={{ color: C.textSecondary }}>
              {phase.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// SECURITY SECTION — Greptile: "Security-First Design"
// ============================================================================
function SecuritySection() {
  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <SectionBadge text="SECURITY" />
          <h2
            className={FONT.display}
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: C.text,
            }}
          >
            Security-First Design
          </h2>
        </div>
        <Link to="/spec" className="hover-btn mt-4 md:mt-0">
          View our security model
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <hr style={{ borderColor: C.border }} className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3
            className={`${FONT.display} text-[24px] font-semibold mb-2`}
            style={{ color: C.text }}
          >
            On-Chain Verification
          </h3>
          <p className="text-[14px] leading-[20px]" style={{ color: C.textSecondary }}>
            Every evaluation verdict is cryptographically signed and recorded on VanarChain.
            Tamper-proof audit trails for complete transparency.
          </p>
        </div>
        <div>
          <h3
            className={`${FONT.display} text-[24px] font-semibold mb-2`}
            style={{ color: C.text }}
          >
            Zero-Trust Architecture
          </h3>
          <p className="text-[14px] leading-[20px]" style={{ color: C.textSecondary }}>
            No implicit trust. Every agent must prove identity, scope, and intent
            before any transaction is permitted to execute.
          </p>
        </div>
      </div>
    </Section>
  );
}

// ============================================================================
// AUDIENCE SECTION — "Built for builders"
// ============================================================================
function AudienceSection() {
  const audiences = [
    { title: 'AI Agent Developers', desc: 'Ship agents that prove their intent before spending.', icon: Code, badge: 'DEVELOPERS' },
    { title: 'Payment Providers', desc: 'Add trust verification to agent transactions.', icon: Cpu, badge: 'PAYMENTS' },
    { title: 'Enterprises', desc: 'Govern AI spending with policy-as-code controls.', icon: Database, badge: 'ENTERPRISE' },
    { title: 'Compliance Teams', desc: 'Immutable audit trails for every agent decision.', icon: FileText, badge: 'COMPLIANCE' },
  ];

  return (
    <Section>
      <div className="mb-12">
        <SectionBadge text="WHO IT'S FOR" />
        <h2
          className={`${FONT.display} max-w-3xl`}
          style={{
            fontSize: '48px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Built for builders who know how systems behave.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t" style={{ borderColor: C.border }}>
        {audiences.map((item, i) => (
          <FeatureCard
            key={i}
            icon={item.icon}
            title={item.title}
            description={item.desc}
            badge={item.badge}
          />
        ))}
      </div>
    </Section>
  );
}

// ============================================================================
// FAQ SECTION — Greptile: accordion style
// ============================================================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is xBPP?',
      a: 'xBPP (Execution Boundary Permission Protocol) is an open standard for verifying AI agent transactions before execution. It provides a trust layer between AI agents and payment systems.',
    },
    {
      q: 'How does the 9-phase evaluation work?',
      a: 'Every transaction passes through 9 phases: identity verification, scope matching, limit checking, risk scoring, anomaly detection, context analysis, escalation logic, audit logging, and final verdict (ALLOW/BLOCK/ESCALATE).',
    },
    {
      q: 'Is xBPP open source?',
      a: 'Yes, xBPP is an open standard built on VanarChain. The specification, reference implementations, and tooling are all open source.',
    },
    {
      q: 'How do I integrate xBPP?',
      a: 'Start with the Playground to understand the evaluation flow, then read the Spec for implementation details. SDKs are available for common languages.',
    },
  ];

  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
        <div>
          <SectionBadge text="FAQ" />
          <h2
            className={FONT.display}
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: C.text,
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-[14px]" style={{ color: C.textSecondary }}>
            Your question not answered here?
          </p>
          <Link to="/spec" className="hover-btn mt-2">
            <ArrowRight className="w-4 h-4 mr-2" />
            Contact Us
          </Link>
        </div>
      </div>

      <div className="space-y-0">
        {faqs.map((faq, i) => (
          <div key={i} className="border-t" style={{ borderColor: C.border }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <h3
                className={`${FONT.display} text-[20px] font-semibold`}
                style={{ color: C.text }}
              >
                {faq.q}
              </h3>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                style={{ color: C.textSecondary }}
              />
            </button>
            {openIndex === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
                className="pb-5 text-[14px] leading-[22px]"
                style={{ color: C.textSecondary }}
              >
                {faq.a}
              </motion.div>
            )}
          </div>
        ))}
        <div className="border-t" style={{ borderColor: C.border }} />
      </div>
    </Section>
  );
}

// ============================================================================
// CTA SECTION — Greptile: "Tell your CTO about Greptile"
// ============================================================================
function CTASection() {
  return (
    <Section>
      <div className="mb-8">
        <SectionBadge text="GET STARTED" />
        <h2
          className={FONT.display}
          style={{
            fontSize: '48px',
            fontWeight: 600,
            color: C.text,
          }}
        >
          Build agents worth trusting.
        </h2>
        <p className="text-[16px] mt-4" style={{ color: C.textSecondary }}>
          Start with the playground, read the spec, or integrate today.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/playground"
          className="inline-flex items-center gap-2 text-[14px] font-mono px-[16px] py-[8px]"
          style={{ backgroundColor: C.green, color: C.white }}
        >
          Try the Playground
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/spec" className="hover-btn">
          Read the Full Spec
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <p className="text-[14px] font-mono mt-4" style={{ color: C.textTertiary }}>
        open standard &bull; no account required &bull; built on VanarChain
      </p>
    </Section>
  );
}

// ============================================================================
// FOOTER — Greptile: multi-column, mono links, h6 headings
// ============================================================================
function Footer() {
  return (
    <footer>
      <BorderedContent>
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Logo */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6" style={{ color: C.green }} />
                <span className={`${FONT.display} text-[20px]`} style={{ color: C.text }}>
                  xBPP
                </span>
              </Link>
              <p className="text-[14px] max-w-[280px]" style={{ color: C.textSecondary }}>
                The Execution Boundary Permission Protocol — an open standard for AI agent transaction trust.
              </p>
            </div>

            {/* Links columns — Greptile: h6 18px 600 weight, links 14px mono */}
            <div>
              <h6
                className="text-[14px] font-semibold mb-3"
                style={{ color: C.text }}
              >
                Protocol
              </h6>
              <ul className="space-y-2">
                {[
                  { label: 'Specification', to: '/spec' },
                  { label: 'Playground', to: '/playground' },
                  { label: 'Library', to: '/library' },
                  { label: 'Test Suite', to: '/test-suite' },
                ].map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[14px] font-mono transition-colors"
                      style={{ color: C.textSecondary }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6
                className="text-[14px] font-semibold mb-3"
                style={{ color: C.text }}
              >
                Resources
              </h6>
              <ul className="space-y-2">
                {[
                  { label: 'GitHub', href: 'https://github.com/vanarchain/xbpp' },
                  { label: 'VanarChain', href: 'https://vanarchain.com' },
                  { label: 'Documentation', to: '/spec' },
                ].map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-[14px] font-mono transition-colors"
                        style={{ color: C.textSecondary }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[14px] font-mono transition-colors"
                        style={{ color: C.textSecondary }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6
                className="text-[14px] font-semibold mb-3"
                style={{ color: C.text }}
              >
                Company
              </h6>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://vanarchain.com"
                    className="text-[14px] font-mono transition-colors"
                    style={{ color: C.textSecondary }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar — Greptile: socials left, copyright right */}
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-mono" style={{ color: C.textTertiary }}>
                SOCIALS
              </span>
              <a
                href="https://github.com/vanarchain/xbpp"
                className="text-[14px] font-mono transition-colors"
                style={{ color: C.textSecondary }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textSecondary)}
              >
                GitHub
              </a>
            </div>
            <p className="text-[14px] font-mono" style={{ color: C.textTertiary }}>
              &copy; 2026 VanarChain. All rights reserved.
            </p>
          </div>
        </div>
      </BorderedContent>
    </footer>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function LandingV3() {
  return (
    <div className="min-h-screen scroll-smooth" style={{ backgroundColor: C.bg, fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main>
        <HeroSection />
        <Separator />
        <SocialProofSection />
        <Separator />
        <FeaturesSection />
        <Separator />
        <ContextSection />
        <Separator />
        <PolicySection />
        <Separator />
        <HowItWorksSection />
        <Separator />
        <SecuritySection />
        <Separator />
        <AudienceSection />
        <Separator />
        <FAQSection />
        <Separator />
        <CTASection />
        <Separator />
      </main>
      <Footer />
    </div>
  );
}

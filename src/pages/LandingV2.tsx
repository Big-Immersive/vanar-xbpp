import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock, Eye, Users, GitBranch } from 'lucide-react';
import { TracedWizard } from '@/components/visualization';

// Greptile-style button with line animation
function GreenButton({ children, href, variant = 'primary' }: { 
  children: React.ReactNode; 
  href?: string;
  variant?: 'primary' | 'secondary';
}) {
  const baseClass = variant === 'primary' 
    ? 'bg-[#2D8A7A] text-white' 
    : 'bg-[#3ECFA5] text-white';
  
  const button = (
    <button className={`${baseClass} px-4 py-2 rounded-md font-mono text-sm tracking-wider relative overflow-hidden group inline-flex items-center gap-2`}>
      <div className="absolute inset-0 pointer-events-none">
        {[8,16,24,32].map(top => (
          <div 
            key={top}
            className="absolute left-0 h-[1px] w-0 bg-white/15 group-hover:w-full transition-all duration-500 ease-out"
            style={{ top: `${top}px`, transitionDelay: `${top * 3.75}ms` }}
          />
        ))}
      </div>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );

  if (href) {
    return <Link to={href}>{button}</Link>;
  }
  return button;
}

// Section header with [ LABEL ] format
function SectionHeader({ label, title, subtitle, align = 'center' }: {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <div className="text-base uppercase tracking-[0.2em] font-light mb-2 text-[#3ECFA5]">
        <span className="font-mono">[ {label} ]</span>
      </div>
      <h2 className="text-[#1E2D2D] text-3xl md:text-4xl font-medium">{title}</h2>
      {subtitle && (
        <p className="text-[#6B6B6B] font-mono mt-2 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

// Card with corner squares (Greptile style)
function CornerCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-[#E5E5E5] p-4 bg-[#F5F4F0]/80 ${className}`}>
      <div className="absolute top-0 left-0 w-2 h-2 bg-[#E5E5E5]" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#E5E5E5]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#E5E5E5]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#E5E5E5]" />
      {children}
    </div>
  );
}

// Animated section wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Floating circles background (Greptile style)
function FloatingCircles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute border-2 border-gray-300 rounded-full opacity-20 animate-[float_20s_ease-in-out_infinite]" 
           style={{ top: '-5rem', left: '-5rem', width: 600, height: 600 }} />
      <div className="absolute border-2 border-gray-300 rounded-full opacity-20 animate-[float_25s_ease-in-out_infinite_reverse]"
           style={{ bottom: '-10rem', right: '-10rem', width: 800, height: 800 }} />
      <div className="absolute border-2 border-gray-300 rounded-full opacity-20 animate-[float_22s_ease-in-out_infinite]"
           style={{ top: '50%', right: '-5rem', width: 400, height: 400 }} />
    </div>
  );
}

export default function LandingV2() {
  const [wizardEvaluating, setWizardEvaluating] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F4F0]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#F5F4F0]/95 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-24">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#3ECFA5] rounded flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-[#1E2D2D]">xBPP</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/spec" className="text-sm font-mono text-[#6B6B6B] hover:text-[#1E2D2D]">Spec</Link>
              <Link to="/playground" className="text-sm font-mono text-[#6B6B6B] hover:text-[#1E2D2D]">Playground</Link>
              <Link to="/library" className="text-sm font-mono text-[#6B6B6B] hover:text-[#1E2D2D]">Library</Link>
            </div>
            <div className="flex items-center gap-3">
              <GreenButton href="/playground">Try Playground</GreenButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with border */}
      <div className="max-w-[1500px] mx-auto">
        <div className="border-x border-[#E5E5E5] mx-4 sm:mx-6 lg:mx-24">
          
          {/* Hero Section */}
          <section className="px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#1E2D2D] leading-[1.1]">
                    The Agent<br />Gatekeeper
                  </h1>
                  <div className="mt-6 flex flex-wrap gap-2 text-sm font-mono text-[#3ECFA5] uppercase tracking-wider">
                    <span>AGENTS CAN SPEND MONEY.</span>
                    <span>THEY JUST CAN'T</span>
                    <span>PROVE THEY SHOULD.</span>
                  </div>
                  <p className="mt-6 text-lg text-[#6B6B6B] max-w-lg">
                    xBPP is the Execution Boundary Permission Protocol — a trust layer 
                    that lets AI agents prove their intent before spending.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <GreenButton href="/playground">
                      <Zap className="w-4 h-4" />
                      Try the Playground
                    </GreenButton>
                    <GreenButton href="/spec" variant="secondary">
                      Read the Spec
                      <ArrowRight className="w-4 h-4" />
                    </GreenButton>
                  </div>
                </motion.div>
              </div>

              {/* Right: Wizard Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
                onMouseEnter={() => setWizardEvaluating(true)}
                onMouseLeave={() => setWizardEvaluating(false)}
              >
                <div className="relative">
                  <TracedWizard 
                    width={400} 
                    height={350} 
                    isEvaluating={wizardEvaluating}
                  />
                  {wizardEvaluating && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#3ECFA5]/10 border border-[#3ECFA5]/20 rounded-full"
                    >
                      <span className="text-xs font-mono text-[#3ECFA5]">EVALUATING TRANSACTION...</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          <hr className="border-[#E5E5E5]" />

          {/* The Agentic Gap */}
          <AnimatedSection className="px-6 sm:px-8 lg:px-16 py-16">
            <SectionHeader 
              label="THE PROBLEM"
              title="The Agentic Gap"
              subtitle="AI agents are gaining autonomy. But trust infrastructure hasn't caught up."
            />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <CornerCard>
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-5 h-5 text-[#3ECFA5]" />
                  <span className="font-mono text-sm text-[#1E2D2D]">No Proof of Intent</span>
                </div>
                <p className="text-sm text-[#6B6B6B]">
                  Agents can execute payments, but can't prove why or under what authority.
                </p>
              </CornerCard>
              <CornerCard>
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-5 h-5 text-[#3ECFA5]" />
                  <span className="font-mono text-sm text-[#1E2D2D]">No Audit Trail</span>
                </div>
                <p className="text-sm text-[#6B6B6B]">
                  When something goes wrong, there's no way to trace the decision chain.
                </p>
              </CornerCard>
              <CornerCard>
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-[#3ECFA5]" />
                  <span className="font-mono text-sm text-[#1E2D2D]">No Human Override</span>
                </div>
                <p className="text-sm text-[#6B6B6B]">
                  High-risk actions need human approval, but there's no standard for escalation.
                </p>
              </CornerCard>
            </div>
          </AnimatedSection>

          <hr className="border-[#E5E5E5]" />

          {/* How xBPP Works */}
          <AnimatedSection className="px-6 sm:px-8 lg:px-16 py-16 relative">
            <FloatingCircles />
            <div className="relative z-10">
              <SectionHeader 
                label="THE SOLUTION"
                title="xBPP: Trust by Design"
                subtitle="A 9-phase evaluation protocol that makes agent decisions verifiable."
              />
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {[
                    { phase: '1', name: 'Identity Check', desc: 'Verify the agent is who it claims to be' },
                    { phase: '2', name: 'Scope Match', desc: 'Confirm the action is within allowed boundaries' },
                    { phase: '3', name: 'Limit Check', desc: 'Validate against rate limits and spending caps' },
                    { phase: '4', name: 'Risk Score', desc: 'Calculate cumulative risk exposure' },
                    { phase: '5', name: 'Anomaly Scan', desc: 'Detect behavioral deviations' },
                  ].map((item) => (
                    <div key={item.phase} className="flex items-start gap-4 p-4 border border-dashed border-[#E5E5E5] rounded">
                      <span className="flex-shrink-0 w-8 h-8 bg-[#3ECFA5]/10 rounded-full flex items-center justify-center font-mono text-[#3ECFA5]">
                        {item.phase}
                      </span>
                      <div>
                        <div className="font-mono text-sm text-[#1E2D2D]">{item.name}</div>
                        <div className="text-sm text-[#6B6B6B]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[
                    { phase: '6', name: 'Context Window', desc: 'Evaluate recent transaction patterns' },
                    { phase: '7', name: 'Escalation Logic', desc: 'Route high-risk to human approval' },
                    { phase: '8', name: 'Audit Log', desc: 'Record immutable decision trail' },
                    { phase: '9', name: 'Verdict', desc: 'ALLOW / BLOCK / ESCALATE' },
                  ].map((item) => (
                    <div key={item.phase} className="flex items-start gap-4 p-4 border border-dashed border-[#E5E5E5] rounded">
                      <span className="flex-shrink-0 w-8 h-8 bg-[#3ECFA5]/10 rounded-full flex items-center justify-center font-mono text-[#3ECFA5]">
                        {item.phase}
                      </span>
                      <div>
                        <div className="font-mono text-sm text-[#1E2D2D]">{item.name}</div>
                        <div className="text-sm text-[#6B6B6B]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <GreenButton href="/playground">
                      <GitBranch className="w-4 h-4" />
                      Try in Playground
                    </GreenButton>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <hr className="border-[#E5E5E5]" />

          {/* Trust is the Product */}
          <AnimatedSection className="bg-[#0A0A0A] px-6 sm:px-8 lg:px-16 py-16">
            <div className="text-center">
              <div className="text-base uppercase tracking-[0.2em] font-light mb-2 text-[#3ECFA5]">
                <span className="font-mono">[ THE VISION ]</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-medium">Trust is the Product</h2>
              <p className="text-gray-400 font-mono mt-4 max-w-2xl mx-auto">
                In the near future, no autonomous agent will execute without a trust receipt.
                xBPP is building that future.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <GreenButton href="/spec">
                  Read the Full Spec
                  <ArrowRight className="w-4 h-4" />
                </GreenButton>
              </div>
            </div>
          </AnimatedSection>

          <hr className="border-[#E5E5E5]" />

          {/* Who It's For */}
          <AnimatedSection className="px-6 sm:px-8 lg:px-16 py-16">
            <SectionHeader 
              label="WHO IT'S FOR"
              title="Built for builders who know how systems behave."
            />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'AI Agent Developers', desc: 'Ship agents that can prove their intent.' },
                { title: 'Payment Providers', desc: 'Add trust verification to agent transactions.' },
                { title: 'Enterprises', desc: 'Govern AI spending with policy-as-code.' },
                { title: 'Compliance Teams', desc: 'Immutable audit trails for every decision.' },
              ].map((item, i) => (
                <CornerCard key={i}>
                  <div className="font-mono text-sm text-[#1E2D2D] mb-2">{item.title}</div>
                  <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
                </CornerCard>
              ))}
            </div>
          </AnimatedSection>

          <hr className="border-[#E5E5E5]" />

          {/* CTA */}
          <AnimatedSection className="px-6 sm:px-8 lg:px-16 py-24 text-center">
            <h2 className="text-4xl md:text-5xl font-medium text-[#1E2D2D]">
              Build agents worth trusting.
            </h2>
            <div className="mt-8 flex justify-center gap-4">
              <GreenButton href="/playground">
                <Zap className="w-4 h-4" />
                Try the Playground
              </GreenButton>
              <GreenButton href="/spec" variant="secondary">
                Read the Spec
                <ArrowRight className="w-4 h-4" />
              </GreenButton>
            </div>
          </AnimatedSection>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-[#F5F4F0]">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-24 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#3ECFA5] rounded flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono text-sm text-[#6B6B6B]">xBPP — VanarChain</span>
            </div>
            <div className="flex items-center gap-6 font-mono text-sm text-[#6B6B6B]">
              <Link to="/spec" className="hover:text-[#1E2D2D]">Spec</Link>
              <Link to="/playground" className="hover:text-[#1E2D2D]">Playground</Link>
              <a href="https://github.com/vanarchain/xbpp" target="_blank" rel="noopener" className="hover:text-[#1E2D2D]">GitHub</a>
            </div>
            <p className="text-sm font-mono text-[#9B9B9B]">© 2026 VanarChain</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

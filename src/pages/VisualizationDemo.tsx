import { TransactionFlow } from '@/components/visualization';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VisualizationDemo() {
  return (
    <div className="min-h-screen bg-[#EDEDEA] p-8">
      {/* Back link */}
      <Link 
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#3ECFA5]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#3ECFA5] uppercase">
              Hero Visualization Concept
            </span>
          </div>
          <h1 className="text-5xl font-display font-bold italic text-[#1E2D2D] uppercase tracking-tight">
            The Gatekeeper
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Real-time visualization of AI agent transactions flowing through xBPP policy evaluation.
            Each particle represents a transaction being evaluated against your policy.
          </p>
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TransactionFlow />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 rounded-full bg-[#3ECFA5]" />
              <span className="font-semibold text-[#1E2D2D]">Incoming</span>
            </div>
            <p className="text-sm text-gray-600">
              Transactions enter from the left, flowing toward the xBPP evaluator
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 border-2 border-[#3ECFA5] rotate-45" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              <span className="font-semibold text-[#1E2D2D]">Evaluator</span>
            </div>
            <p className="text-sm text-gray-600">
              The central xBPP policy engine evaluates each transaction against your rules
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-red-500" />
              </div>
              <span className="font-semibold text-[#1E2D2D]">Verdicts</span>
            </div>
            <p className="text-sm text-gray-600">
              ALLOW (proceed), ESCALATE (human approval), or BLOCK (policy violation)
            </p>
          </div>
        </motion.div>

        {/* Technical notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-[#1A1A1A] rounded-xl text-white"
        >
          <h3 className="text-sm font-semibold tracking-wider text-[#3ECFA5] uppercase mb-4">
            Technical Implementation
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <strong>Canvas 2D</strong> — requestAnimationFrame particle system (~60fps)</li>
            <li>• <strong>Framer Motion</strong> — entrance animations and stats overlay</li>
            <li>• <strong>Real-time stats</strong> — counters update as particles are evaluated</li>
            <li>• <strong>Responsive</strong> — canvas resizes with container</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            Next iteration: Three.js for 3D depth, bloom post-processing, interactive camera
          </p>
        </motion.div>
      </div>
    </div>
  );
}

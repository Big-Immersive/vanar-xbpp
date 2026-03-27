import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Verdict = 'allow' | 'escalate' | 'block';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: 'incoming' | 'evaluating' | 'decided';
  verdict?: Verdict;
  opacity: number;
  size: number;
  hue: number;
}

interface Stats {
  allowed: number;
  escalated: number;
  blocked: number;
}

const COLORS = {
  incoming: { r: 62, g: 207, b: 165 },   // teal
  allow: { r: 34, g: 197, b: 94 },       // green
  escalate: { r: 245, g: 158, b: 11 },   // amber
  block: { r: 239, g: 68, b: 68 },       // red
};

export function TransactionFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const statsRef = useRef<Stats>({ allowed: 0, escalated: 0, blocked: 0 });
  const [stats, setStats] = useState<Stats>({ allowed: 0, escalated: 0, blocked: 0 });
  const frameRef = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height;
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const evaluatorRadius = 60;

    // Spawn new particle
    const spawnParticle = () => {
      const particle: Particle = {
        id: idCounter.current++,
        x: -20,
        y: centerY + (Math.random() - 0.5) * 150,
        vx: 1.5 + Math.random() * 0.5,
        vy: (Math.random() - 0.5) * 0.3,
        phase: 'incoming',
        opacity: 0.8,
        size: 3 + Math.random() * 2,
        hue: Math.random() * 20, // slight color variation
      };
      particlesRef.current.push(particle);
    };

    // Evaluate particle (determine verdict)
    const evaluate = (p: Particle): Verdict => {
      const r = Math.random();
      if (r < 0.75) return 'allow';      // 75% allowed
      if (r < 0.90) return 'escalate';   // 15% escalated
      return 'block';                     // 10% blocked
    };

    // Get target Y for verdict
    const getVerdictTargetY = (verdict: Verdict): number => {
      switch (verdict) {
        case 'allow': return centerY - 80;
        case 'escalate': return centerY;
        case 'block': return centerY + 80;
      }
    };

    // Animation loop
    const animate = () => {
      frameRef.current++;

      // Spawn particles periodically
      if (frameRef.current % 15 === 0) {
        spawnParticle();
      }

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Draw evaluator node
      const pulse = Math.sin(frameRef.current * 0.05) * 0.2 + 0.8;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, evaluatorRadius * 2
      );
      gradient.addColorStop(0, `rgba(62, 207, 165, ${0.3 * pulse})`);
      gradient.addColorStop(0.5, `rgba(62, 207, 165, ${0.1 * pulse})`);
      gradient.addColorStop(1, 'rgba(62, 207, 165, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, evaluatorRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core hexagon
      ctx.strokeStyle = `rgba(62, 207, 165, ${0.8 * pulse})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * evaluatorRadius;
        const y = centerY + Math.sin(angle) * evaluatorRadius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner hexagon
      ctx.strokeStyle = `rgba(62, 207, 165, ${0.4 * pulse})`;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6 - Math.PI / 2 + frameRef.current * 0.01;
        const x = centerX + Math.cos(angle) * (evaluatorRadius * 0.6);
        const y = centerY + Math.sin(angle) * (evaluatorRadius * 0.6);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw "xBPP" text
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pulse})`;
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('xBPP', centerX, centerY);

      // Draw verdict labels
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.fillText('ALLOW', width - 60, centerY - 80);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.fillText('ESCALATE', width - 60, centerY);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.fillText('BLOCK', width - 60, centerY + 80);

      // Draw verdict paths
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.beginPath();
      ctx.moveTo(centerX + evaluatorRadius + 20, centerY - 20);
      ctx.quadraticCurveTo(width * 0.75, centerY - 60, width - 100, centerY - 80);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.beginPath();
      ctx.moveTo(centerX + evaluatorRadius + 20, centerY);
      ctx.lineTo(width - 100, centerY);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.beginPath();
      ctx.moveTo(centerX + evaluatorRadius + 20, centerY + 20);
      ctx.quadraticCurveTo(width * 0.75, centerY + 60, width - 100, centerY + 80);
      ctx.stroke();

      ctx.setLineDash([]);

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update based on phase
        if (p.phase === 'incoming') {
          // Move toward evaluator
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < evaluatorRadius + 10) {
            // Reached evaluator - evaluate
            p.phase = 'evaluating';
            p.verdict = evaluate(p);
            p.phase = 'decided';
            
            // Update stats
            if (p.verdict === 'allow') statsRef.current.allowed++;
            else if (p.verdict === 'escalate') statsRef.current.escalated++;
            else statsRef.current.blocked++;
          } else {
            // Curve toward center
            p.vy += (centerY - p.y) * 0.001;
            p.x += p.vx;
            p.y += p.vy;
          }
        } else if (p.phase === 'decided' && p.verdict) {
          // Move toward verdict stream
          const targetY = getVerdictTargetY(p.verdict);
          const targetX = width + 50;
          
          p.vy += (targetY - p.y) * 0.02;
          p.vy *= 0.95; // damping
          p.vx = 2;
          
          p.x += p.vx;
          p.y += p.vy;

          // Fade out blocks
          if (p.verdict === 'block') {
            p.opacity -= 0.02;
          }

          // Remove if off screen
          if (p.x > width + 30 || p.opacity <= 0) {
            particles.splice(i, 1);
            continue;
          }
        }

        // Draw particle
        let color = COLORS.incoming;
        if (p.verdict) {
          color = COLORS[p.verdict];
        }

        // Glow
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${p.opacity * 0.5})`);
        glowGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update stats display periodically
      if (frameRef.current % 30 === 0) {
        setStats({ ...statsRef.current });
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-[#0A0A0A] rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Stats overlay */}
      <motion.div 
        className="absolute bottom-4 left-4 flex gap-6 text-sm font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-green-500">{stats.allowed.toLocaleString()} ALLOWED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-amber-500">{stats.escalated.toLocaleString()} ESCALATED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-red-500">{stats.blocked.toLocaleString()} BLOCKED</span>
        </div>
      </motion.div>

      {/* Label */}
      <div className="absolute top-4 left-4 text-xs text-white/40 font-mono tracking-wider">
        LIVE TRANSACTION FLOW
      </div>
    </div>
  );
}

export default TransactionFlow;

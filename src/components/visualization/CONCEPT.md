# xBPP Hero Visualization — Transaction Flow

## Concept: "The Gatekeeper"

A real-time visualization showing AI agent transactions flowing through xBPP policy evaluation.

```
     ┌─────────────────────────────────────────────────────────────┐
     │                                                             │
     │   ○ ○ ○         ┌─────────┐         ● ● ● → ALLOW (green)   │
     │    ○ ○ ○  ───→  │  xBPP   │  ───→   ◐ ◐ ◐ → ESCALATE (amber)│
     │     ○ ○ ○       │ POLICY  │         ○ ○ ○ → BLOCK (red)     │
     │      ○ ○ ○      └─────────┘                                 │
     │       ○ ○ ○                                                 │
     │        ○ ○ ○   (particles evaluated in real-time)           │
     │                                                             │
     └─────────────────────────────────────────────────────────────┘
```

## Visual Elements

### 1. Incoming Transactions (left side)
- Small glowing particles spawning continuously
- Each particle = one agent transaction
- Hover shows: agent ID, amount, counterparty
- Particles have slight randomness in path (organic feel)

### 2. xBPP Evaluator (center)
- Glowing hexagonal node (or shield shape)
- Pulses when evaluating
- Shows current policy posture (CAUTIOUS/BALANCED/AGGRESSIVE)
- Ring of the 9 evaluation phases orbiting it

### 3. Verdict Streams (right side)
- Three diverging paths:
  - **Top path (green):** ALLOW — particles accelerate, glow brighter
  - **Middle path (amber):** ESCALATE — particles slow, pulse for attention
  - **Bottom path (red):** BLOCK — particles fade and dissipate
- Running counters: "847 ALLOWED • 23 ESCALATED • 12 BLOCKED"

### 4. Interactivity
- Hover on particle → show transaction details
- Click on evaluator → expand 9-phase breakdown
- Drag to rotate/zoom (if 3D)

## Technical Implementation

### Option A: Canvas 2D (simpler, performant)
```
framer-motion + HTML Canvas
- Particle system with requestAnimationFrame
- ~100-200 particles active
- Bezier curves for organic flow
- Glow effects via radial gradients
```

### Option B: Three.js / React Three Fiber (3D, impressive)
```
@react-three/fiber + @react-three/drei
- 3D particle system with instanced meshes
- Post-processing glow (bloom)
- Camera orbits slowly
- Depth adds gravitas
```

### Option C: SVG + Framer Motion (lightest)
```
Pure SVG with animated paths
- motion.circle for particles
- Staggered animations
- Works well but limited particle count
```

## Recommendation

**Start with Option A (Canvas 2D)** — best balance of visual impact and performance.
Then iterate to Option B (Three.js) if we want more "wow factor".

## Files to Create

1. `TransactionFlow.tsx` — main visualization component
2. `useParticleSystem.ts` — particle physics/animation hook
3. `PolicyNode.tsx` — central evaluator visualization
4. `VerdictStream.tsx` — the three output paths

## Color Palette

```css
--particle-default: rgba(62, 207, 165, 0.6);  /* teal, incoming */
--verdict-allow: #22C55E;                      /* green */
--verdict-escalate: #F59E0B;                   /* amber */
--verdict-block: #EF4444;                      /* red */
--glow-core: rgba(62, 207, 165, 0.3);         /* evaluator glow */
--bg-dark: #0A0A0A;                            /* visualization bg */
```

## Inspiration

- Stripe's payment flow animations
- GitHub's contribution graph (particle feel)
- Network traffic visualizations (Cloudflare Radar)
- The Matrix digital rain (organic flow)

import { motion } from 'framer-motion';

interface AnimatedWizardProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  isEvaluating?: boolean;
}

export function AnimatedWizard({ 
  className, 
  color = '#3ECFA5', // xBPP teal
  width = 400, 
  height = 500,
  isEvaluating = false 
}: AnimatedWizardProps) {
  
  // Walking animation for the whole wizard
  const walkingVariants = {
    walking: {
      x: [0, 5, 0, -5, 0],
      y: [0, -3, 0, -3, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Staff glow when evaluating
  const staffGlowVariants = {
    idle: { 
      filter: 'drop-shadow(0 0 0px transparent)',
      scale: 1
    },
    evaluating: {
      filter: [
        'drop-shadow(0 0 5px rgba(62,207,165,0.5))',
        'drop-shadow(0 0 15px rgba(62,207,165,0.8))',
        'drop-shadow(0 0 5px rgba(62,207,165,0.5))'
      ],
      scale: [1, 1.02, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Cloak flow animation
  const cloakVariants = {
    flowing: {
      d: [
        "M 170 200 Q 150 220, 130 280 Q 100 350, 80 420 Q 60 470, 70 490 L 280 490 Q 290 470, 280 440 Q 265 400, 270 350 Q 275 300, 260 250 Q 250 220, 240 200 Q 230 190, 220 195 Q 200 200, 170 200 Z",
        "M 170 200 Q 145 225, 125 285 Q 95 355, 75 425 Q 55 475, 65 495 L 280 490 Q 290 470, 280 440 Q 265 400, 270 350 Q 275 300, 260 250 Q 250 220, 240 200 Q 230 190, 220 195 Q 200 200, 170 200 Z",
        "M 170 200 Q 150 220, 130 280 Q 100 350, 80 420 Q 60 470, 70 490 L 280 490 Q 290 470, 280 440 Q 265 400, 270 350 Q 275 300, 260 250 Q 250 220, 240 200 Q 230 190, 220 195 Q 200 200, 170 200 Z"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Beard sway animation
  const beardVariants = {
    swaying: {
      rotate: [-1, 1, -1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={className}
      variants={walkingVariants}
      animate="walking"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 500" 
        fill={color}
        width={width}
        height={height}
      >
        {/* Hat */}
        <motion.path 
          id="hat" 
          d="M 180 50 Q 200 10, 220 30 Q 240 60, 230 100 Q 220 130, 240 140 L 280 150 Q 300 155, 290 165 L 140 180 Q 120 175, 130 165 L 170 155 Q 180 145, 175 130 Q 165 110, 180 50 Z"
          animate={{ rotate: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '200px 120px' }}
        />
        
        {/* Hat creases */}
        <path d="M 190 70 Q 210 75, 215 85" stroke={color} strokeWidth="3" fill="none" opacity={0.6}/>
        <path d="M 195 95 Q 215 100, 220 115" stroke={color} strokeWidth="3" fill="none" opacity={0.6}/>
        
        {/* Face (negative space) */}
        <path d="M 205 160 L 230 165 Q 245 168, 250 180 L 255 200 Q 250 210, 240 215 L 235 220 Q 230 225, 225 220 L 220 210 Q 218 205, 220 200 Z" fill="#0A0A0A"/>
        
        {/* Brow and eye */}
        <path d="M 225 175 Q 240 170, 250 178" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
        <motion.path 
          d="M 235 185 Q 242 188, 245 185" 
          stroke={color} 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Mustache */}
        <path d="M 220 215 Q 230 225, 225 240 Q 222 250, 215 245 Q 210 240, 212 230 Q 215 220, 220 215 Z"/>
        
        {/* Beard */}
        <motion.g 
          id="beard"
          variants={beardVariants}
          animate="swaying"
          style={{ transformOrigin: '200px 240px' }}
        >
          <path d="M 200 235 Q 205 280, 195 340 Q 192 360, 185 380 L 188 380 Q 200 350, 205 300 Q 210 260, 200 235 Z"/>
          <path d="M 210 240 Q 215 290, 210 350 Q 207 380, 200 410 L 204 410 Q 215 370, 218 320 Q 222 270, 210 240 Z"/>
          <path d="M 195 238 Q 198 280, 188 330 Q 183 360, 175 390 L 179 390 Q 192 355, 195 310 Q 200 265, 195 238 Z"/>
          <path d="M 188 240 Q 185 290, 175 340 Q 168 375, 160 400 L 165 400 Q 178 365, 183 320 Q 190 270, 188 240 Z"/>
          <path d="M 218 245 Q 225 300, 222 360 Q 220 400, 215 430 L 220 430 Q 228 390, 230 340 Q 232 280, 218 245 Z"/>
        </motion.g>
        
        {/* Hair */}
        <motion.g 
          id="hair"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 145 175 Q 130 200, 125 250 Q 120 290, 115 320 L 122 318 Q 130 280, 135 240 Q 142 195, 145 175 Z"/>
          <path d="M 155 178 Q 145 210, 140 260 Q 135 300, 130 340 L 138 338 Q 145 295, 150 250 Q 158 200, 155 178 Z"/>
          <path d="M 165 180 Q 158 220, 155 270 Q 150 320, 148 360 L 156 358 Q 162 310, 166 260 Q 172 210, 165 180 Z"/>
        </motion.g>
        
        {/* Cloak */}
        <motion.path 
          id="cloak"
          variants={cloakVariants}
          animate="flowing"
        />
        
        {/* Arm */}
        <path d="M 250 220 Q 280 240, 310 270 Q 330 290, 340 300 Q 345 310, 340 320 Q 330 330, 315 325 Q 290 315, 270 290 Q 255 270, 250 250 Q 248 235, 250 220 Z"/>
        
        {/* Hand */}
        <path d="M 325 290 Q 335 285, 345 290 Q 355 300, 350 315 Q 345 325, 335 325 Q 325 322, 320 310 Q 318 298, 325 290 Z"/>
        
        {/* Staff - with glow effect when evaluating */}
        <motion.g 
          id="staff"
          variants={staffGlowVariants}
          animate={isEvaluating ? "evaluating" : "idle"}
        >
          <rect x="338" y="180" width="8" height="200" rx="2" transform="rotate(25 342 280)"/>
          {/* Staff head crystal */}
          <path d="M 375 130 L 385 155 L 380 175 L 370 175 L 365 155 Z" transform="rotate(25 375 155)"/>
          
          {/* Magic particles when evaluating */}
          {isEvaluating && (
            <>
              <motion.circle 
                cx="380" cy="140" r="3" 
                fill="#fff"
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-10, -30],
                  x: [0, 10]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.circle 
                cx="370" cy="145" r="2" 
                fill="#fff"
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-10, -25],
                  x: [0, -8]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle 
                cx="385" cy="150" r="2.5" 
                fill="#fff"
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-10, -35],
                  x: [0, 5]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              />
            </>
          )}
        </motion.g>
        
        {/* Cloak details */}
        <path d="M 120 350 Q 140 380, 130 420" stroke={color} strokeWidth="3" fill="none" opacity={0.5}/>
        <path d="M 180 400 Q 200 430, 190 470" stroke={color} strokeWidth="3" fill="none" opacity={0.5}/>
        
        {/* Legs */}
        <motion.path 
          d="M 200 470 Q 210 485, 220 500 L 235 500 Q 225 485, 215 465 Z"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 150 475 Q 140 490, 135 500 L 155 500 Q 165 490, 170 475 Z"
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

export default AnimatedWizard;

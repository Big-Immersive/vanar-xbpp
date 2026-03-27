import { motion } from 'framer-motion';

interface TracedWizardProps {
  className?: string;
  width?: number;
  height?: number;
  isEvaluating?: boolean;
}

export function TracedWizard({ 
  className, 
  width = 400, 
  height = 300,
  isEvaluating = false 
}: TracedWizardProps) {
  
  return (
    <motion.div 
      className={className}
      animate={{
        x: [0, 5, 0, -5, 0],
        y: [0, -3, 0, -3, 0],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        {/* The traced wizard SVG */}
        <motion.img 
          src="/wizard-traced.svg" 
          alt="xBPP Wizard Gatekeeper"
          width={width}
          height={height}
          className="object-contain"
          animate={isEvaluating ? {
            filter: [
              'drop-shadow(0 0 5px rgba(62,207,165,0.3))',
              'drop-shadow(0 0 20px rgba(62,207,165,0.8))',
              'drop-shadow(0 0 5px rgba(62,207,165,0.3))'
            ]
          } : {
            filter: 'drop-shadow(0 0 0px transparent)'
          }}
          transition={{
            duration: 1,
            repeat: isEvaluating ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        
        {/* Magic particles when evaluating */}
        {isEvaluating && (
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#3ECFA5] rounded-full"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 30}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -40],
                  x: [0, (Math.random() - 0.5) * 30],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default TracedWizard;

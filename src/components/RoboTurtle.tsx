import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface RoboTurtleProps {
  speed?: number;
  size?: number;
  delay?: number;
  colorScheme?: "cyan" | "purple" | "green" | "pink";
}

export const RoboTurtle = ({
  speed = 2,
  size = 180,
  delay = 0,
  colorScheme = "cyan"
}: RoboTurtleProps) => {
  const [position, setPosition] = useState({ x: -300, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isDancing, setIsDancing] = useState(false);
  const controls = useAnimation();

  const colors = {
    cyan: { primary: "hsl(180, 100%, 50%)", secondary: "hsl(280, 100%, 70%)", accent: "hsl(120, 100%, 50%)" },
    purple: { primary: "hsl(280, 100%, 70%)", secondary: "hsl(320, 100%, 70%)", accent: "hsl(180, 100%, 50%)" },
    green: { primary: "hsl(120, 100%, 50%)", secondary: "hsl(180, 100%, 50%)", accent: "hsl(280, 100%, 70%)" },
    pink: { primary: "hsl(320, 100%, 70%)", secondary: "hsl(0, 100%, 50%)", accent: "hsl(280, 100%, 70%)" }
  };

  const turtleColors = colors[colorScheme];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDancing) return;

    setIsDancing(true);

    // Dance sequence - spin, jump, wiggle!
    controls.start({
      rotate: [0, 360, -360, 0],
      scale: [1, 1.4, 0.8, 1.3, 1],
      y: [0, -60, -30, -70, -20, 0],
      transition: {
        duration: 2.5,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut",
        onComplete: () => setIsDancing(false)
      }
    });
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;

    // Set initial opacity with delay
    setTimeout(() => {
      controls.set({ opacity: 1 });
    }, delay);

    const animateTurtle = () => {
      setIsVisible(true);
      // Keep turtle within hero section height (approximately viewport height)
      const heroHeight = Math.min(window.innerHeight, 800);
      setPosition({ x: -300, y: Math.random() * (heroHeight - 300) + 150 });

      const interval = setInterval(() => {
        setPosition(prev => {
          const newX = prev.x + speed;
          if (newX > screenWidth + 300) {
            // Reset to start after crossing screen
            setTimeout(() => {
              const heroHeight = Math.min(window.innerHeight, 800);
              setPosition({ x: -300, y: Math.random() * (heroHeight - 300) + 150 });
            }, 5000); // Wait 5 seconds before next crossing
            return prev;
          }
          return { ...prev, x: newX };
        });
      }, 16); // ~60fps

      return () => clearInterval(interval);
    };

    const cleanup = animateTurtle();
    return cleanup;
  }, [controls, delay, speed]);

  return (
    <motion.div
      className="absolute z-40 cursor-pointer pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
    >
      <svg
        width={size}
        height={size * 0.67}
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Turtle Shell - Robotic with circuits */}
        <motion.ellipse
          cx="60"
          cy="40"
          rx="35"
          ry="25"
          fill="url(#shellGradient)"
          stroke={turtleColors.primary}
          strokeWidth="2"
          animate={{
            strokeOpacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Shell pattern - circuit lines */}
        <motion.path
          d="M 40 30 L 60 30 L 60 50 L 40 50 Z"
          stroke={turtleColors.secondary}
          strokeWidth="1.5"
          fill="none"
          animate={{
            pathLength: [0, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.path
          d="M 60 30 L 80 30 L 80 50 L 60 50"
          stroke={turtleColors.accent}
          strokeWidth="1.5"
          fill="none"
          animate={{
            pathLength: [0, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />

        {/* Head */}
        <motion.circle
          cx="95"
          cy="40"
          r="12"
          fill="hsl(220, 13%, 15%)"
          stroke="hsl(180, 100%, 50%)"
          strokeWidth="2"
          animate={{
            x: [0, 3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Robotic Eye */}
        <motion.circle
          cx="100"
          cy="38"
          r="4"
          fill="hsl(0, 100%, 50%)"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Front Legs - mechanical */}
        <motion.g
          animate={{
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ originX: "75px", originY: "55px" }}
        >
          <rect x="75" y="55" width="8" height="18" rx="2" fill="hsl(220, 13%, 15%)" stroke="hsl(180, 100%, 50%)" strokeWidth="1"/>
          <circle cx="79" cy="73" r="3" fill="hsl(120, 100%, 50%)" />
        </motion.g>

        <motion.g
          animate={{
            rotate: [0, -15, 0, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{ originX: "90px", originY: "55px" }}
        >
          <rect x="90" y="55" width="8" height="18" rx="2" fill="hsl(220, 13%, 15%)" stroke="hsl(180, 100%, 50%)" strokeWidth="1"/>
          <circle cx="94" cy="73" r="3" fill="hsl(120, 100%, 50%)" />
        </motion.g>

        {/* Back Legs - mechanical */}
        <motion.g
          animate={{
            rotate: [0, -15, 0, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
          style={{ originX: "35px", originY: "55px" }}
        >
          <rect x="35" y="55" width="8" height="18" rx="2" fill="hsl(220, 13%, 15%)" stroke="hsl(280, 100%, 70%)" strokeWidth="1"/>
          <circle cx="39" cy="73" r="3" fill="hsl(280, 100%, 70%)" />
        </motion.g>

        <motion.g
          animate={{
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }}
          style={{ originX: "50px", originY: "55px" }}
        >
          <rect x="50" y="55" width="8" height="18" rx="2" fill="hsl(220, 13%, 15%)" stroke="hsl(280, 100%, 70%)" strokeWidth="1"/>
          <circle cx="54" cy="73" r="3" fill="hsl(280, 100%, 70%)" />
        </motion.g>

        {/* Tail - antenna */}
        <motion.line
          x1="25"
          y1="40"
          x2="15"
          y2="30"
          stroke="hsl(180, 100%, 50%)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            rotate: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ originX: "25px", originY: "40px" }}
        />
        <motion.circle
          cx="15"
          cy="30"
          r="3"
          fill="hsl(320, 100%, 70%)"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="shellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 13%, 20%)" />
            <stop offset="50%" stopColor="hsl(220, 13%, 15%)" />
            <stop offset="100%" stopColor="hsl(220, 13%, 10%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-xl opacity-50"
        style={{
          background: "radial-gradient(circle, hsl(180, 100%, 50%) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

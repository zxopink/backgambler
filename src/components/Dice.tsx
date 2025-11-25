import { motion, animate } from 'framer-motion';
import { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

interface DiceProps {
  dice: [number, number] | null;
  position?: { x: number; y: number };
  onThrown?: () => void;
}

export interface DiceRef {
  throwDice: (velocity: { x: number; y: number }) => void;
}

const Dice = forwardRef<DiceRef, DiceProps>(({ dice, position, onThrown }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const die1Ref = useRef<HTMLDivElement>(null);
  const die2Ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const previousPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());

  const SWIPE_THRESHOLD = 3; // Velocity threshold for throw detection
  const FOLLOW_SPEED = 0.067; // How closely dice follow the finger (3x faster)

  // Helper function to animate a single die throw
  const animateSingleDieThrow = (
    dieRef: React.RefObject<HTMLDivElement>,
    directionX: number,
    directionY: number,
    duration: number
  ) => {
    if (!dieRef.current) return;

    const throwDistance = 250 + Math.random() * 20;
    const endX = directionX * throwDistance;
    const endY = directionY * throwDistance;
    const rotation = Math.random() * 720 + 360;

    // Position and rotation animation
    animate(dieRef.current, {
      x: endX,
      y: endY,
      rotate: rotation,
    }, {
      type: 'tween',
      ease: [0.34, 1.56, 0.64, 1], // easeOutBack
      duration,
    });
    
    // Separate scale animation with easeOutBounce
    animate(dieRef.current, {
      scale: 0.6,
    }, {
      type: 'tween',
      ease: [0.68, -0.55, 0.265, 1.55], // easeOutBounce
      duration: 0.4,
    });
  };

  // Helper function to reset a single die
  const resetSingleDie = (dieRef: React.RefObject<HTMLDivElement>) => {
    if (!dieRef.current) return;

    animate(dieRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    }, {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    });
  };

  const throwDice = async (velocity: { x: number; y: number }) => {
    setIsThrowing(true);

    console.log('Throw velocity:', velocity);

    // Calculate throw direction from velocity with random variation
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
    
    // If speed is too low, velocity direction might be unreliable
    if (speed === 0) {
      console.warn('Zero velocity detected');
      velocity = { x: 0, y: -1 }; // Default to upward
    }
    
    const normalizedVelX = velocity.x / speed;
    const normalizedVelY = velocity.y / speed;

    console.log('Normalized direction:', { x: normalizedVelX, y: normalizedVelY });

    // Calculate direction for die 1 with random variation (-20 to +20 degrees)
    const randomAngle1 = (Math.random() - 0.5) * (Math.PI / 4.5);
    const cos1 = Math.cos(randomAngle1);
    const sin1 = Math.sin(randomAngle1);
    const die1DirX = normalizedVelX * cos1 - normalizedVelY * sin1;
    const die1DirY = normalizedVelX * sin1 + normalizedVelY * cos1;
    
    // Calculate direction for die 2 with different random variation
    const randomAngle2 = (Math.random() - 0.5) * (Math.PI / 4.5);
    const cos2 = Math.cos(randomAngle2);
    const sin2 = Math.sin(randomAngle2);
    const die2DirX = normalizedVelX * cos2 - normalizedVelY * sin2;
    const die2DirY = normalizedVelX * sin2 + normalizedVelY * cos2;

    // Animate both dice with slightly different timing
    animateSingleDieThrow(die1Ref, die1DirX, die1DirY, 0.8);
    animateSingleDieThrow(die2Ref, die2DirX, die2DirY, 0.85);

    // Wait for animation to complete, then reset
    await new Promise(resolve => setTimeout(resolve, 1500));

    resetSingleDie(die1Ref);
    resetSingleDie(die2Ref);

    setIsThrowing(false);
  };

  // Expose throwDice method to parent
  useImperativeHandle(ref, () => ({
    throwDice,
  }));

  const handlePointerDown = (event: PointerEvent) => {
    if (!containerRef.current || isThrowing) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    pointerPosRef.current = {
      x: event.clientX - rect.left - rect.width / 2,
      y: event.clientY - rect.top - rect.height / 2,
    };
    previousPosRef.current = { ...pointerPosRef.current };
    velocityRef.current = { x: 0, y: 0 };
    lastTimeRef.current = Date.now();
    setIsDragging(true);
    event.preventDefault();
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = {
      x: event.clientX - rect.left - rect.width / 2,
      y: event.clientY - rect.top - rect.height / 2,
    };

    const now = Date.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    
    // Calculate velocity
    velocityRef.current = {
      x: (newPos.x - previousPosRef.current.x) / dt,
      y: (newPos.y - previousPosRef.current.y) / dt,
    };

    previousPosRef.current = { ...pointerPosRef.current };
    pointerPosRef.current = newPos;
    lastTimeRef.current = now;

    // Both dice follow the same pointer position
    if (die1Ref.current) {
      animate(die1Ref.current, {
        x: newPos.x,
        y: newPos.y,
      }, {
        type: 'tween',
        ease: 'linear',
        duration: FOLLOW_SPEED,
      });
    }
    
    if (die2Ref.current) {
      animate(die2Ref.current, {
        x: newPos.x,
        y: newPos.y,
      }, {
        type: 'tween',
        ease: 'linear',
        duration: FOLLOW_SPEED,
      });
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Check if thrown (swipe up with high velocity)
    const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
    const isUpward = velocityRef.current.y < -SWIPE_THRESHOLD;
    
    if (speed > SWIPE_THRESHOLD && isUpward) {
      console.log('Dice thrown!', { velocity: velocityRef.current, speed });
      const vel = { ...velocityRef.current };
      velocityRef.current = { x: 0, y: 0 };
      onThrown?.();
      throwDice(vel);
      return;
    }

    // Spring back to original positions
    if (die1Ref.current) {
      animate(die1Ref.current, {
        x: 0,
        y: 0,
      }, {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      });
    }
    
    if (die2Ref.current) {
      animate(die2Ref.current, {
        x: 0,
        y: 0,
      }, {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      });
    }

    velocityRef.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDownWrapper = (e: PointerEvent) => handlePointerDown(e);
    const handlePointerMoveWrapper = (e: PointerEvent) => handlePointerMove(e);
    const handlePointerUpWrapper = () => handlePointerUp();

    container.addEventListener('pointerdown', handlePointerDownWrapper);
    window.addEventListener('pointermove', handlePointerMoveWrapper);
    window.addEventListener('pointerup', handlePointerUpWrapper);
    window.addEventListener('pointercancel', handlePointerUpWrapper);
    
    return () => {
      container.removeEventListener('pointerdown', handlePointerDownWrapper);
      window.removeEventListener('pointermove', handlePointerMoveWrapper);
      window.removeEventListener('pointerup', handlePointerUpWrapper);
      window.removeEventListener('pointercancel', handlePointerUpWrapper);
    };
  }, [isDragging, isThrowing]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute bottom-20 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 sm:gap-4 z-20 touch-none"
      animate={{
        x: position?.x ?? 0,
        y: position?.y ?? 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{ pointerEvents: isThrowing ? 'none' : 'auto' }}
    >
      <motion.div
        ref={die1Ref}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold shadow-[0_6px_16px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {dice ? dice[0] : '—'}
      </motion.div>
      <motion.div
        ref={die2Ref}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-gray-800 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold shadow-[0_6px_16px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {dice ? dice[1] : '—'}
      </motion.div>
    </motion.div>
  );
});

Dice.displayName = 'Dice';

export default Dice;

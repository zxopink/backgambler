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

    // Add random variation to direction (-20 to +20 degrees)
    const randomAngle = (Math.random() - 0.5) * (Math.PI / 4.5); // ~20 degrees
    const cos = Math.cos(randomAngle);
    const sin = Math.sin(randomAngle);
    
    const die1DirX = normalizedVelX * cos - normalizedVelY * sin;
    const die1DirY = normalizedVelX * sin + normalizedVelY * cos;
    
    // Different random angle for die 2
    const randomAngle2 = (Math.random() - 0.5) * (Math.PI / 4.5);
    const cos2 = Math.cos(randomAngle2);
    const sin2 = Math.sin(randomAngle2);
    
    const die2DirX = normalizedVelX * cos2 - normalizedVelY * sin2;
    const die2DirY = normalizedVelX * sin2 + normalizedVelY * cos2;

    // Calculate end positions based on direction
    const throwDistance = 200 + Math.random() * 100;
    const die1EndX = die1DirX * throwDistance;
    const die1EndY = die1DirY * throwDistance;
    
    const throwDistance2 = 200 + Math.random() * 100;
    const die2EndX = die2DirX * throwDistance2;
    const die2EndY = die2DirY * throwDistance2;

    console.log('Die 1 throw to:', { x: die1EndX, y: die1EndY });
    console.log('Die 2 throw to:', { x: die2EndX, y: die2EndY });

    // Random rotation for visual effect
    const die1Rotation = Math.random() * 720 + 360;
    const die2Rotation = Math.random() * 720 + 360;

    // Animate die 1 throw
    if (die1Ref.current) {
      animate(die1Ref.current, {
        x: die1EndX,
        y: die1EndY,
        rotate: die1Rotation,
      }, {
        type: 'tween',
        ease: [0.34, 1.56, 0.64, 1], // easeOutBack
        duration: 0.8,
      });
    }

    // Animate die 2 throw with slightly different timing
    if (die2Ref.current) {
      animate(die2Ref.current, {
        x: die2EndX,
        y: die2EndY,
        rotate: die2Rotation,
      }, {
        type: 'tween',
        ease: [0.34, 1.56, 0.64, 1], // easeOutBack
        duration: 0.85,
      });
    }

    // Wait for animation to complete, then reset
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Reset to original position
    if (die1Ref.current) {
      animate(die1Ref.current, {
        x: 0,
        y: 0,
        rotate: 0,
      }, {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      });
    }

    if (die2Ref.current) {
      animate(die2Ref.current, {
        x: 0,
        y: 0,
        rotate: 0,
      }, {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      });
    }

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

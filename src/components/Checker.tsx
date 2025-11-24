interface CheckerProps {
  variant: 'light' | 'dark';
  className?: string;
}

function Checker({ variant, className = '' }: CheckerProps) {
  const baseStyles =
    variant === 'light'
      ? 'bg-white border-[#d6d6d6] shadow-[0_6px_18px_rgba(0,0,0,0.08)]'
      : 'bg-[#161616] border-[#2d2d2d] shadow-[0_6px_18px_rgba(0,0,0,0.18)]';

  return <div className={`rounded-full border ${baseStyles} ${className}`} />;
}

export default Checker;

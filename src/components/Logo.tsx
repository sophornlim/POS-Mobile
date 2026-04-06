import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { APP_LOGO } from '../constants';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  containerClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className, containerClassName }) => {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-primary text-white rounded-lg font-black font-headline text-[10px] text-center p-1", containerClassName)}>
        NK
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center overflow-hidden border-0 outline-none bg-transparent p-0 shadow-none", containerClassName)}>
      <img 
        src={APP_LOGO} 
        alt="Neary Khmer Logo" 
        className={cn("w-full h-full object-contain border-0 outline-none block p-0 m-0 mix-blend-multiply contrast-[1.1] brightness-[1.05]", className)}
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default Logo;

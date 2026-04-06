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
    <div className={cn("flex items-center justify-center overflow-hidden bg-white mix-blend-multiply", containerClassName)}>
      <img 
        src={APP_LOGO} 
        alt="Neary Khmer Logo" 
        className={cn("w-full h-full object-contain contrast-[1.2] brightness-[1.1]", className)}
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default Logo;

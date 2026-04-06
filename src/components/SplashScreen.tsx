import { motion } from 'motion/react';
import Logo from './Logo';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6
        }}
        className="relative"
      >
        <Logo containerClassName="w-48 h-48" />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -bottom-8 left-0 h-1 bg-primary rounded-full"
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h1 className="text-3xl font-black font-headline tracking-tighter text-on-surface mb-2">NEARY KHMER</h1>
        <p className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Restaurant Management System</p>
      </motion.div>
    </motion.div>
  );
}

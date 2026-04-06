import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { APP_LOGO } from '../constants';
import Logo from './Logo';

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Temporary credentials
    if (username === 'Admin' && password === 'l10S02p84') {
      setTimeout(() => {
        onLogin();
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid username or password');
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 main-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[320px] bg-white rounded-[2rem] p-6 shadow-2xl shadow-primary/10"
      >
        <div className="flex flex-col items-center mb-6">
          <Logo containerClassName="w-20 h-20" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest pl-3">Username</label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
                className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary text-on-surface placeholder-on-surface-variant/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest pl-3">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant group-focus-within:text-primary transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-10 pr-10 text-xs focus:ring-2 focus:ring-primary text-on-surface placeholder-on-surface-variant/20 transition-all"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-600 p-2.5 rounded-lg flex items-center gap-2 text-[10px] font-bold"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full primary-gradient text-white py-3.5 rounded-lg font-headline font-extrabold text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-xs text-on-surface-variant">
            © 2026 Neary Khmer Restaurant. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl px-8 py-4 transition-all duration-500">
      <div className="flex items-center gap-6 lg:hidden">
        <span className="material-symbols-outlined cursor-pointer dark:text-white text-2xl">menu</span>
        <h2 className="text-gray-900 dark:text-white text-xl font-black tracking-tighter">DocuBrain</h2>
      </div>

      <div className="hidden lg:flex flex-1 items-center gap-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
            <span>Org</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-gray-900 dark:text-white">Prod_Stack</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-green-500 text-[9px] font-black uppercase">Sync Ativo</span>
          </div>
        </div>

        <div className={`max-w-xl w-full relative group transition-all duration-300 ${isSearching ? 'scale-105' : ''}`}>
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary text-[20px]">search_spark</span>
          <input 
            type="text" 
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
            placeholder="Busca Semântica Pro (ex: 'onde guardo emails?')..." 
            className="w-full bg-gray-100 dark:bg-surface-dark/50 border border-gray-200 dark:border-border-dark rounded-[16px] py-2.5 pl-12 pr-12 text-sm focus:ring-4 focus:ring-primary/10 text-gray-900 dark:text-white placeholder-gray-400 transition-all font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-1 text-[9px] font-black text-gray-400 bg-white dark:bg-background-dark border border-gray-200 dark:border-border-dark rounded-lg shadow-sm">CMD</kbd>
            <kbd className="hidden sm:inline-block px-2 py-1 text-[9px] font-black text-gray-400 bg-white dark:bg-background-dark border border-gray-200 dark:border-border-dark rounded-lg shadow-sm">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 items-center ml-8">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center rounded-xl h-10 w-10 border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:shadow-lg transition-all"
        >
          <span className="material-symbols-outlined text-[20px] dark:text-white">{isDark ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <div className="h-8 w-px bg-gray-200 dark:bg-border-dark mx-2 hidden sm:block"></div>
        <button className="hidden sm:flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 text-sm font-black shadow-2xl shadow-black/10 dark:shadow-white/5 hover:scale-[1.02] active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          <span>Sincronizar Produção</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

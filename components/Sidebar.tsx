
import React from 'react';
import { NavItem } from '../types';

interface SidebarProps {
  activeItem: NavItem;
  setActiveItem: (item: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const groups = [
    {
      title: 'Principal',
      items: [
        { name: NavItem.OVERVIEW, icon: 'grid_view' },
        { name: NavItem.SCHEMA_EDITOR, icon: 'schema' },
        { name: NavItem.DATA_BROWSER, icon: 'database' },
      ]
    },
    {
      title: 'Engine',
      items: [
        { name: NavItem.PLAYGROUND, icon: 'terminal' },
        { name: NavItem.WIKI, icon: 'auto_stories' },
        { name: NavItem.COMPLIANCE, icon: 'gavel' },
      ]
    },
    {
      title: 'Gestão',
      items: [
        { name: NavItem.HISTORY, icon: 'history' },
        { name: NavItem.BILLING, icon: 'payments' },
        { name: NavItem.SETTINGS, icon: 'settings' },
      ]
    }
  ];

  return (
    <aside className="w-68 flex-shrink-0 border-r border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-background-dark/80 backdrop-blur-xl hidden lg:flex flex-col h-full sticky top-0 overflow-y-auto custom-scrollbar transition-all duration-500">
      <div className="flex flex-col gap-6 p-6 h-full justify-between">
        <div>
          <div className="flex gap-4 items-center px-2 py-4 mb-6 group cursor-pointer">
            <div className="bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center rounded-2xl size-12 group-hover:rotate-6 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-3xl font-bold">dataset</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-gray-900 dark:text-white text-xl font-black tracking-tighter leading-none">DocuBrain</h1>
              <span className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mt-1">Data Infra</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-1.5">
                <p className="px-3 text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em] mb-2">{group.title}</p>
                {group.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group/btn ${
                      activeItem === item.name
                        ? 'bg-white dark:bg-surface-dark text-primary dark:text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_25px_-6px_rgba(19,91,236,0.2)] border border-gray-200/50 dark:border-border-dark'
                        : 'text-gray-500 hover:text-primary dark:hover:text-white hover:bg-white/50 dark:hover:bg-surface-dark/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[22px] transition-all duration-300 ${
                        activeItem === item.name ? 'text-primary' : 'group-hover/btn:text-primary group-hover/btn:scale-110'
                      }`}>
                        {item.icon}
                      </span>
                      <p className={`text-sm tracking-tight transition-all ${
                        activeItem === item.name ? 'font-black' : 'font-semibold'
                      }`}>{item.name}</p>
                    </div>
                    {activeItem === item.name && (
                      <div className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(19,91,236,0.8)]"></div>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
           {/* Widget de Custo Rápido */}
           <div className="bg-gradient-to-br from-[#135bec] via-[#1e4ad9] to-[#2563eb] p-5 rounded-[2rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <span className="material-symbols-outlined text-6xl">account_balance_wallet</span>
              </div>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-80">Estimativa de Custos</span>
                <span className="material-symbols-outlined text-sm opacity-60">trending_up</span>
              </div>
              <p className="text-2xl font-black relative z-10 leading-none">$142.50</p>
              <div className="mt-4 flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold opacity-70">Uso de Tokens</p>
                  <div className="w-24 h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden">
                    <div className="w-[65%] h-full bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded-lg">65%</span>
              </div>
           </div>

          <div className="flex items-center gap-4 px-2 py-2 group cursor-pointer hover:bg-gray-100 dark:hover:bg-surface-dark/50 rounded-2xl transition-colors">
            <div className="relative">
               <img src="https://picsum.photos/seed/matheus/64/64" className="rounded-2xl size-11 border-2 border-primary/20 group-hover:border-primary transition-colors" alt="Matheus OBS" />
               <span className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-4 border-white dark:border-background-dark"></span>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-900 dark:text-white text-sm font-black tracking-tight line-clamp-1">Matheus OBS</p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 bg-primary rounded-full"></span>
                <p className="text-primary text-[10px] font-black uppercase tracking-tighter">Enterprise Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

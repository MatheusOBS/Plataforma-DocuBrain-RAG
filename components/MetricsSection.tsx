
import React from 'react';
import { METRICS } from '../constants';

const MetricsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {METRICS.map((metric) => (
        <div 
          key={metric.label}
          className="flex flex-col gap-6 rounded-[32px] border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden cursor-default"
        >
          {metric.isSpecial && (
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all"></div>
          )}
          
          <div className="flex items-center justify-between relative z-10">
            <div className={`p-3.5 rounded-2xl bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-border-dark transition-all group-hover:scale-110 shadow-inner ${
              metric.isSpecial ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
            }`}>
              <span className="material-symbols-outlined text-[28px]">{metric.icon}</span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest leading-none mb-1">{metric.subtitle}</span>
               <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  {metric.trend}
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 relative z-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-bold">{metric.label}</p>
            <h2 className="text-gray-900 dark:text-white text-4xl font-black leading-none tabular-nums tracking-tighter">{metric.value}</h2>
          </div>
          
          <div className="w-full bg-gray-100 dark:bg-background-dark h-1 rounded-full overflow-hidden relative z-10">
             <div className="bg-primary h-full rounded-full transition-all duration-1000 w-[65%]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsSection;

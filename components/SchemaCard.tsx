
import React from 'react';
import { SchemaModel } from '../types';

interface SchemaCardProps {
  model: SchemaModel;
}

const SchemaCard: React.FC<SchemaCardProps> = ({ model }) => {
  const isVector = model.type === 'PGVector';

  return (
    <div className={`flex flex-col rounded-[2rem] border transition-all duration-500 bg-white dark:bg-[#121721] overflow-hidden relative group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_70px_-15px_rgba(19,91,236,0.15)] ${
      isVector 
        ? 'border-primary/40 ring-1 ring-primary/10 bg-gradient-to-b from-primary/[0.03] to-transparent' 
        : 'border-gray-200/60 dark:border-border-dark/60 hover:border-primary/40'
    }`}>
      <div className={`px-7 py-6 border-b border-gray-100 dark:border-border-dark/50 flex justify-between items-start ${
        isVector ? 'bg-primary/5' : 'bg-gray-50/30 dark:bg-background-dark/20'
      }`}>
        <div className="flex items-start gap-5">
          <div className={`p-3 rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
            isVector ? 'bg-primary text-white shadow-primary/20' : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-border-dark shadow-gray-200/20'
          }`}>
            <span className={`material-symbols-outlined text-[24px]`}>{model.icon}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-gray-900 dark:text-white font-black font-display text-lg tracking-tight leading-none">{model.name}</h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{isVector ? 'HNSW Vector Index' : 'Standard PostgreSQL Table'}</p>
            {model.description && (
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mt-1 max-w-[200px] line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                {model.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="size-9 rounded-xl bg-white dark:bg-background-dark border border-gray-100 dark:border-border-dark flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
             <span className="material-symbols-outlined text-lg">more_vert</span>
           </button>
        </div>
      </div>

      <div className="p-7 flex flex-col gap-4 font-mono text-xs">
        {model.fields.map((field, idx) => {
          const isSpecialField = field.isVector || field.name === 'embedding';
          
          return (
            <React.Fragment key={field.name}>
              {field.isRelation && !model.fields[idx-1]?.isRelation && (
                <div className="flex items-center gap-3 my-1">
                  <div className="h-px flex-1 bg-gray-100 dark:bg-border-dark/30"></div>
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Relações</span>
                  <div className="h-px flex-1 bg-gray-100 dark:bg-border-dark/30"></div>
                </div>
              )}
              
              <div className={`flex flex-col gap-1 group/item cursor-pointer transition-all duration-300 hover:translate-x-1.5 p-2 rounded-xl border border-transparent ${
                field.isRelation ? 'bg-gray-50/50 dark:bg-background-dark/20' : ''
              } ${isSpecialField ? 'bg-primary/5 border-primary/10 p-4 my-2 ring-1 ring-primary/5' : 'hover:bg-gray-50 dark:hover:bg-background-dark/40'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className={`material-symbols-outlined text-[20px] transition-transform group-hover/item:scale-110 ${
                      field.isPK ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 
                      field.isFK ? 'text-indigo-500' : 
                      field.isRelation ? 'text-primary' : 
                      isSpecialField ? 'text-primary animate-pulse' : 'text-gray-300 dark:text-gray-600'
                    }`}>
                      {field.icon}
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`${isSpecialField ? 'font-black text-primary' : 'font-bold'} group-hover/item:text-primary transition-colors`}>{field.name}</span>
                        {field.pii && (
                          <span className="text-[8px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">PII</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    {field.dimensions && (
                      <span className="text-[9px] bg-primary text-white px-2 py-0.5 rounded-lg font-black shadow-lg shadow-primary/20">
                        {field.dimensions}D
                      </span>
                    )}
                    <span className={`text-[11px] font-black tracking-tighter uppercase ${
                      field.isRelation || isSpecialField ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {field.type}
                    </span>
                  </div>
                </div>
                {field.description && (
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 ml-8 leading-normal font-display line-clamp-1 group-hover/item:text-gray-500 transition-colors">
                    {field.description}
                  </p>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="px-7 py-5 bg-gray-50/30 dark:bg-background-dark/10 border-t border-gray-100 dark:border-border-dark/50 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
         <div className="flex -space-x-3 items-center">
           {[1, 2, 3].map(i => (
             <img key={i} src={`https://picsum.photos/seed/${model.name}${i}/48/48`} className="size-7 rounded-full border-2 border-white dark:border-[#121721] shadow-sm transform hover:-translate-y-1 transition-transform" />
           ))}
           <div className="size-7 rounded-full bg-gray-100 dark:bg-border-dark flex items-center justify-center text-[8px] font-black text-gray-500 border-2 border-white dark:border-[#121721]">
             +4
           </div>
         </div>
         <button className="text-[10px] font-black text-primary hover:text-white hover:bg-primary px-3 py-1.5 rounded-xl transition-all uppercase tracking-widest flex items-center gap-2 border border-primary/20 hover:border-primary shadow-sm active:scale-95">
            <span className="material-symbols-outlined text-[16px]">analytics</span> Analisar Estrutura
         </button>
      </div>
    </div>
  );
};

export default SchemaCard;

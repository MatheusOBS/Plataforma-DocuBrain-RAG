import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SchemaCard from "./components/SchemaCard";
import MetricsSection from "./components/MetricsSection";
import { NavItem, ChatMessage, SchemaModel } from "./types";
import { SCHEMA_MODELS, VERSIONS } from "./constants";
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavItem>(NavItem.OVERVIEW);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDoc, setAiDoc] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "DocuBrain Engine v1.5 pronto. Aguardando processamento de consulta semântica.",
      timestamp: new Date(),
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const generateAutoDoc = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      // Usando gemini-1.5-flash para melhor performance e precisão
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Analise este esquema de banco de dados RAG e gere uma documentação técnica estruturada:
        Modelos:
        - Usuario: Gestão central de identidades.
        - Documento: Repositório de texto bruto para RAG.
        - Fragmento: Chunks de texto segmentados para busca.
        - Vetor: Embeddings de 1536 dimensões (cos_sim).

        Explique o fluxo de ingestão e a arquitetura de busca semântica.`,
      });
      setAiDoc(response.text || "Documentação indisponível.");
      setActiveItem(NavItem.WIKI);
    } catch (err) {
      setAiDoc(
        "Erro ao conectar com a IA. Por favor, configure sua GEMINI_API_KEY no arquivo .env.local.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = (type: string) => {
    const data = JSON.stringify(SCHEMA_MODELS, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `docubrain_schema_${type.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert(
      `Exportando esquema em formato ${type}... O download começará em instantes.`,
    );
  };

  const executeRAGSearch = () => {
    if (!prompt.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setPrompt("");

    // Simulação de RAG (Busca Semântica)
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: `🔍 **Iniciando Busca RAG...**\n\n1. Gerando embedding de 1536 dimensões para: "${prompt}"\n2. Consultando tabela \`public.Vetor\` via *vector_cosine_ops*\n3. Recuperando contextos relevantes da tabela \`public.Fragmento\`...\n\n**Resultado Encontrado:** "A arquitetura DocuBrain utiliza segmentação recursiva para garantir que o contexto semântico nunca seja perdido durante a tokenização."\n\nPrecisa que eu transforme isso em uma query SQL para o seu backend?`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }, 800);
  };

  const renderContent = () => {
    switch (activeItem) {
      case NavItem.WIKI:
        return (
          <div className="max-w-5xl mx-auto py-8 animate-in fade-in zoom-in duration-700">
            <h1 className="text-4xl font-black mb-10 dark:text-white flex items-center gap-4">
              <span className="material-symbols-outlined text-4xl text-primary">
                auto_stories
              </span>
              Repositório de Documentação
            </h1>
            <div className="bg-white dark:bg-[#121721] border border-gray-200 dark:border-border-dark rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[120px]">
                  architecture
                </span>
              </div>
              {aiDoc ? (
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed font-display text-lg prose dark:prose-invert">
                  {aiDoc}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 gap-8">
                  <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center animate-bounce">
                    <span className="material-symbols-outlined text-6xl text-primary">
                      model_training
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-gray-500 font-bold">
                      Documentação pronta para processamento.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Agregando metadados e estruturas de busca semântica...
                    </p>
                  </div>
                  <button
                    onClick={generateAutoDoc}
                    className="bg-primary hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined">analytics</span>
                    Processar Documentação
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case NavItem.HISTORY:
        return (
          <div className="py-8 space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex justify-between items-end">
              <h1 className="text-4xl font-black dark:text-white">
                Linha do Tempo <span className="text-primary">Git Schema</span>
              </h1>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-primary/20">
                3 Revisões Ativas
              </div>
            </div>
            <div className="bg-white dark:bg-[#121721] border border-gray-200 dark:border-border-dark rounded-[2.5rem] overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 dark:bg-background-dark/50 border-b border-gray-100 dark:border-border-dark">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Versão
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Autor Responsável
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Alterações Estruturais
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Data
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Checkpoint
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-border-dark">
                  {VERSIONS.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-primary/5 transition-all group"
                    >
                      <td className="px-8 py-6">
                        <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                          {v.id}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-black dark:text-white">
                        {v.author}
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {v.changes}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-400 font-bold tracking-tight">
                        {v.date}
                      </td>
                      <td className="px-8 py-6">
                        <button className="bg-white dark:bg-surface-dark px-4 py-2 border border-gray-200 dark:border-border-dark rounded-xl text-primary hover:bg-primary hover:text-white text-[10px] font-black transition-all shadow-sm">
                          RESTAURAR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case NavItem.PLAYGROUND:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[80%] py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col bg-white dark:bg-[#121721] rounded-[2.5rem] border border-gray-200 dark:border-border-dark shadow-2xl overflow-hidden group">
              <div className="p-6 border-b border-gray-100 dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-background-dark/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 bg-red-400 rounded-full"></div>
                  <div className="size-3 bg-yellow-400 rounded-full"></div>
                  <div className="size-3 bg-green-400 rounded-full"></div>
                  <span className="text-[10px] ml-4 font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      terminal
                    </span>{" "}
                    pgvector console
                  </span>
                </div>
                <button
                  onClick={() => alert("Executando Query...")}
                  className="bg-primary hover:bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                >
                  Executar
                </button>
              </div>
              <textarea
                className="flex-1 p-8 font-mono text-sm bg-transparent border-none focus:ring-0 text-primary dark:text-blue-400 resize-none leading-relaxed"
                placeholder="-- Insira seu SQL ou solicite processamento à direita..."
                defaultValue={`-- Busca Semântica por Similaridade de Cosseno\nSELECT fragmento.texto, vetor.embedding <-> '[0.12, 0.45, ...]' as distancia\nFROM public.Fragmento fragmento\nJOIN public.Vetor vetor ON fragmento.id = vetor.idFragmento\nORDER BY distancia LIMIT 5;`}
              />
            </div>

            <div className="flex flex-col bg-[#090c12] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
              <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl animate-pulse">
                      database
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-white uppercase tracking-[0.1em]">
                      DocuBrain Analysis Engine
                    </span>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">
                      System Ready - v1.5-Pro
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar relative z-10">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div
                      className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-xl ${
                        m.role === "user"
                          ? "bg-primary text-white shadow-primary/10 rounded-br-none"
                          : "bg-[#1a202c] text-gray-200 border border-white/5 rounded-bl-none"
                      }`}
                    >
                      <div className="prose prose-invert prose-sm">
                        {m.content}
                      </div>
                      <span className="block text-[10px] font-bold opacity-40 mt-2 text-right tracking-tight">
                        {m.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-6 border-t border-white/5 relative z-10">
                <div className="relative flex items-center group">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && executeRAGSearch()}
                    className="w-full bg-[#1a202c] border-white/5 border rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                    placeholder="Simule uma consulta de busca semântica..."
                  />
                  <button
                    onClick={executeRAGSearch}
                    className="absolute right-2 p-2.5 text-primary hover:bg-white/5 rounded-xl transition-all hover:scale-110 active:scale-90"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      search_check
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case NavItem.SCHEMA_EDITOR:
        return (
          <div className="py-8 relative h-[800px] overflow-hidden bg-gray-100/50 dark:bg-background-dark/30 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-border-dark p-10 animate-in zoom-in-95 duration-700">
            <div className="absolute top-8 left-8 flex gap-3 z-20">
              <div className="bg-white/80 dark:bg-[#121721]/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-gray-200 dark:border-border-dark flex items-center gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                <div className="size-8 bg-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">
                    gesture
                  </span>
                </div>
                <div>
                  <span className="text-sm font-black dark:text-white block leading-none">
                    Editor Visual
                  </span>
                  <span className="text-[10px] text-green-500 font-black uppercase tracking-tighter">
                    Modo Interativo Ativo
                  </span>
                </div>
              </div>
            </div>

            {/* Conexões SVG Dinâmicas (Simuladas) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#135bec" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <path
                d="M 280 200 Q 350 250 420 280"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,8"
                className="animate-[dash_20s_linear_infinite]"
              />
              <path
                d="M 640 280 Q 710 210 780 180"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,8"
                className="animate-[dash_20s_linear_infinite]"
              />
              <path
                d="M 520 400 L 520 520"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,8"
              />
            </svg>

            <style>{`
                @keyframes dash { to { stroke-dashoffset: -200; } }
             `}</style>

            <div className="relative w-full h-full">
              {SCHEMA_MODELS.map((m) => (
                <div
                  key={m.name}
                  className="absolute shadow-2xl scale-90 hover:scale-[0.95] transition-all cursor-grab active:cursor-grabbing hover:z-50"
                  style={{ left: m.position?.x, top: m.position?.y }}
                >
                  <SchemaCard model={m} />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-14 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-primary/10 text-primary text-[11px] font-black px-4 py-1.5 rounded-full border border-primary/20 shadow-sm animate-pulse uppercase tracking-[0.2em]">
                    Enterprise Core v1.5.0
                  </span>
                  <div className="size-2 bg-green-500 rounded-full"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Status: Ready to Scale
                  </span>
                </div>
                <h1 className="text-gray-900 dark:text-white text-6xl font-black leading-tight tracking-tighter">
                  Data <span className="text-primary italic">Intelligence</span>{" "}
                  Control
                </h1>
                <p className="text-gray-500 dark:text-[#9da6b9] text-xl font-medium max-w-3xl leading-relaxed">
                  Infraestrutura de alta performance para{" "}
                  <span className="text-gray-900 dark:text-white font-bold underline decoration-primary/50 decoration-4 underline-offset-8">
                    LLMs, RAG e Busca Semântica
                  </span>{" "}
                  distribuída em nuvem.
                </p>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={generateAutoDoc}
                  disabled={isAnalyzing}
                  className="flex items-center justify-center rounded-[1.5rem] h-16 px-10 bg-primary text-white shadow-[0_15px_40px_-10px_rgba(19,91,236,0.4)] text-base font-black gap-4 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span
                    className={`material-symbols-outlined text-[24px] ${isAnalyzing ? "animate-spin" : ""}`}
                  >
                    analytics
                  </span>
                  <span>
                    {isAnalyzing ? "Processando..." : "Analisar Estrutura"}
                  </span>
                </button>
                <div className="relative group">
                  <button className="flex items-center justify-center rounded-[1.5rem] h-16 px-8 bg-white dark:bg-[#121721] border-2 border-gray-100 dark:border-border-dark text-gray-800 dark:text-white text-base font-black gap-4 hover:border-primary/50 transition-all shadow-xl shadow-black/5">
                    <span className="material-symbols-outlined text-[24px]">
                      download
                    </span>
                    <span>Exportar</span>
                  </button>
                  <div className="absolute right-0 top-20 w-64 bg-white dark:bg-[#121721] border border-gray-200 dark:border-border-dark rounded-[2rem] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] py-4 invisible group-hover:visible z-50 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 p-2 space-y-1">
                    <button
                      onClick={() => handleExport("Prisma")}
                      className="w-full text-left px-5 py-4 text-xs font-black hover:bg-primary/10 hover:text-primary rounded-2xl transition-all flex items-center justify-between group/item"
                    >
                      <span>Prisma Schema</span>
                      <span className="material-symbols-outlined text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                        chevron_right
                      </span>
                    </button>
                    <button
                      onClick={() => handleExport("SQL")}
                      className="w-full text-left px-5 py-4 text-xs font-black hover:bg-primary/10 hover:text-primary rounded-2xl transition-all flex items-center justify-between group/item"
                    >
                      <span>PostgreSQL DDL</span>
                      <span className="material-symbols-outlined text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                        chevron_right
                      </span>
                    </button>
                    <button
                      onClick={() => handleExport("JSON")}
                      className="w-full text-left px-5 py-4 text-xs font-black hover:bg-primary/10 hover:text-primary rounded-2xl transition-all flex items-center justify-between group/item"
                    >
                      <span>JSON Configuration</span>
                      <span className="material-symbols-outlined text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <MetricsSection />

            <div className="flex items-center justify-between mb-10 mt-16 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
              <div className="flex items-center gap-5">
                <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    architecture
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white text-3xl font-black tracking-tight leading-none">
                    Mapa de Arquitetura
                  </h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                    <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                    Prod Cluster: aws-us-east-1
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-100/50 dark:bg-surface-dark/50 p-2 rounded-2xl border border-gray-200 dark:border-border-dark">
                <button className="bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-border-dark p-3 rounded-xl text-primary transition-all">
                  <span className="material-symbols-outlined scale-110">
                    grid_view
                  </span>
                </button>
                <button className="p-3 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined scale-110">
                    list
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-start pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              {SCHEMA_MODELS.map((model) => (
                <SchemaCard key={model.name} model={model} />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-row overflow-hidden bg-white dark:bg-[#090c12] transition-colors duration-700 font-display">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative px-10">
        <Header />
        <div className="flex-1 py-10 max-w-[1800px] mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

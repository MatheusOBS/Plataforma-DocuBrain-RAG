# DocuBrain: Enterprise RAG & Semantic Infrastructure

![DocuBrain Header](https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop)

**DocuBrain** is a high-performance data orchestration platform designed for modern AI applications. It provides a visual interface and technical infrastructure to manage **Retrieval-Augmented Generation (RAG)** flows, semantic search, and vector databases at scale.

## 🚀 Key Features

- **Visual Schema Designer:** Architect your data models with specialized support for `pgvector` and semantic embeddings.
- **RAG Playground:** Technical sandbox to simulate search flows, test cosine similarity, and refine context retrieval.
- **Automated Documentation Hub:** Real-time generation of technical specifications based on your active data schema.
- **Git-Style Versioning:** Track every schema change with a detailed audit trail and restoration capabilities.
- **Enterprise-Ready Metrics:** Monitor ingestion rates, search latency, and token consumption via a professional dashboard.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Intelligence Engine:** Google Gemini 1.5-Flash (via @google/genai)
- **Database Architecture:** Optimized for PostgreSQL + `pgvector`
- **Build Tool:** Vite

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MatheusOBS/Plataforma-DocuBrain-RAG.git
   cd Plataforma-DocuBrain-RAG
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📐 Architecture Overview

DocuBrain simplifies the complex lifecycle of RAG systems by separating the concerns into three main pillars:
1. **Ingestion:** Segmenting and chunking raw text into searchable fragments.
2. **Embedding:** Generating high-dimensional vectors (1536D) for semantic representation.
3. **Retrieval:** Executing nearest-neighbor searches to provide precise context to LLMs.

## 👤 Author

Developed with focus on performance and architectural excellence by **MatheusOBS**.

---
*Professional Data Infrastructure for the next generation of LLM-powered applications.*

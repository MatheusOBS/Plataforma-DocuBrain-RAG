# @matheusobs/use-ai-stream 🚀

[![NPM Version](https://img.shields.io/npm/v/@matheusobs/use-ai-stream?style=flat-square)](https://www.npmjs.com/package/@matheusobs/use-ai-stream)
[![Build Status](https://github.com/MatheusOBS/Plataforma-DocuBrain-RAG/actions/workflows/library-ci.yml/badge.svg)](https://github.com/MatheusOBS/Plataforma-DocuBrain-RAG/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A lightweight, zero-dependency React Hook designed to handle streaming text responses from AI models (OpenAI, Anthropic, Gemini, or local models) with ease.

## ✨ Features

- **Chunk-based Updates**: Updates your UI in real-time as data arrives.
- **Micro-size**: Less than 1kb gzipped.
- **Type-Safe**: Built with 100% TypeScript.
- **Universal**: Works with any `ReadableStream` or `Response` body.

## 📦 Installation

```bash
npm install @matheusobs/use-ai-stream
# or
yarn add @matheusobs/use-ai-stream
```

## 💻 Usage

```tsx
import { useAIStream } from "@matheusobs/use-ai-stream";

function AIChat() {
  const { data, isLoading, start, error } = useAIStream({
    onComplete: (fullText) => console.log("Finished:", fullText),
  });

  const handleSubmit = async () => {
    const response = await fetch("/api/chat", { method: "POST" });
    await start(response);
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Generating..." : "Start AI Generation"}
      </button>

      <div className="output">{data}</div>
    </div>
  );
}
```

## 📚 API

### `useAIStream(options)`

| Option | Type | Description |
|Obs | --- | --- |
| `onChunk` | `(chunk: string) => void` | Fired on every new text chunk |
| `onComplete` | `(text: string) => void` | Fired when stream finishes |
| `onError` | `(err: Error) => void` | Fired on failure |

### Returns

| Property    | Description                               |
| ----------- | ----------------------------------------- |
| `data`      | The accumulated text string               |
| `isLoading` | Boolean status of the stream              |
| `start`     | Function to trigger the stream processing |
| `reset`     | Function to clear data and state          |

## 📄 License

MIT © [MatheusOBS](https://github.com/MatheusOBS)

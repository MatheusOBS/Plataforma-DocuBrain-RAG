import { useState, useCallback, useRef } from "react";

export interface UseAIStreamOptions {
  /**
   * Callback fired when a new chunk is received.
   */
  onChunk?: (chunk: string) => void;
  /**
   * Callback fired when the stream completes successfully.
   */
  onComplete?: (fullText: string) => void;
  /**
   * Callback fired when an error occurs.
   */
  onError?: (error: Error) => void;
}

export interface UseAIStreamResult {
  /**
   * The accumulated text from the stream.
   */
  data: string;
  /**
   * Access to the raw chunks array.
   */
  chunks: string[];
  /**
   * Whether the stream is currently active.
   */
  isLoading: boolean;
  /**
   * Any error that occurred during the stream.
   */
  error: Error | null;
  /**
   * Function to start the stream from a readable stream or fetch response.
   */
  start: (stream: ReadableStream<Uint8Array> | Response) => Promise<void>;
  /**
   * Function to manually reset the state.
   */
  reset: () => void;
}

/**
 * A hook to consume AI streaming responses (e.g., from OpenAI or local LLMs).
 */
export function useAIStream(
  options: UseAIStreamOptions = {},
): UseAIStreamResult {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const chunksRef = useRef<string[]>([]);

  const reset = useCallback(() => {
    setData("");
    setIsLoading(false);
    setError(null);
    chunksRef.current = [];
  }, []);

  const start = useCallback(
    async (input: ReadableStream<Uint8Array> | Response) => {
      reset();
      setIsLoading(true);

      try {
        let readableStream: ReadableStream<Uint8Array>;

        if (input instanceof Response) {
          if (!input.body) throw new Error("Response body is null");
          readableStream = input.body;
        } else {
          readableStream = input;
        }

        const reader = readableStream.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          chunksRef.current.push(chunk);

          setData((prev) => prev + chunk);
          options.onChunk?.(chunk);
        }

        options.onComplete?.(accumulatedText);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        options.onError?.(errorObj);
      } finally {
        setIsLoading(false);
      }
    },
    [options, reset],
  );

  return {
    data,
    chunks: chunksRef.current,
    isLoading,
    error,
    start,
    reset,
  };
}

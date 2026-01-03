import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAIStream } from '../src/useAIStream';

// Mock TextEncoder/Decoder for JSDOM
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

describe('useAIStream', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAIStream());
    expect(result.current.data).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle streaming data correctly', async () => {
    const { result } = renderHook(() => useAIStream());

    // Create a mock stream
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('Hello '));
        controller.enqueue(new TextEncoder().encode('World'));
        controller.close();
      }
    });

    await act(async () => {
      await result.current.start(stream);
    });

    expect(result.current.data).toBe('Hello World');
    expect(result.current.isLoading).toBe(false);
  });
});

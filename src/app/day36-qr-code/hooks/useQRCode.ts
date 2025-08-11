'use client';

import { useEffect, useMemo, useState } from 'react';
import type { QRCodeOptions } from '../types';

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function useQRCode(options: QRCodeOptions) {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const debouncedText = useDebouncedValue(options.text, 250);

  const sanitized = useMemo(() => {
    const size = Math.min(1024, Math.max(128, Math.floor(options.size)));
    const margin = Math.min(8, Math.max(0, Math.floor(options.margin)));
    return { ...options, size, margin };
  }, [options]);

  useEffect(() => {
    let mounted = true;
    async function generate() {
      if (!sanitized.text) {
        setDataUrl('');
        return;
      }
      try {
        setError(null);
        const QR = await import('qrcode');
        const url = await QR.toDataURL(sanitized.text, {
          errorCorrectionLevel: sanitized.level,
          margin: sanitized.margin,
          width: sanitized.size,
          color: {
            dark: sanitized.foregroundColor,
            light: sanitized.backgroundColor,
          },
        });
        if (mounted) setDataUrl(url);
      } catch (e: unknown) {
        if (mounted) setError('QRコードの生成に失敗しました');
        if (e instanceof Error) {
          // ログ出力（開発用）
          console.error(e.message);
        }
      }
    }
    generate();
    return () => {
      mounted = false;
    };
  }, [sanitized.text, sanitized.level, sanitized.margin, sanitized.size, sanitized.foregroundColor, sanitized.backgroundColor, debouncedText]);

  return { dataUrl, error };
}



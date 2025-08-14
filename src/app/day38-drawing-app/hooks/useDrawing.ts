'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type StrokeStyle = {
  color: string;
  width: number;
};

export function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [style, setStyle] = useState<StrokeStyle>({ color: '#111827', width: 4 });

  const setCanvas = useCallback((el: HTMLCanvasElement | null) => {
    canvasRef.current = el;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctxRef.current = ctx;
  }, [style.color, style.width]);

  useEffect(() => {
    if (!ctxRef.current) return;
    ctxRef.current.strokeStyle = style.color;
    ctxRef.current.lineWidth = style.width;
  }, [style]);

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const onPointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    if (!ctxRef.current || !canvasRef.current) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  }, []);

  const onPointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDrawing || !ctxRef.current) return;
    const { x, y } = getPos(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  }, [isDrawing]);

  const onPointerUp = useCallback(() => {
    setIsDrawing(false);
    ctxRef.current?.closePath();
  }, []);

  const clear = useCallback(() => {
    const el = canvasRef.current;
    const ctx = ctxRef.current;
    if (el && ctx) ctx.clearRect(0, 0, el.width, el.height);
  }, []);

  return { setCanvas, style, setStyle, onPointerDown, onPointerMove, onPointerUp, clear };
}



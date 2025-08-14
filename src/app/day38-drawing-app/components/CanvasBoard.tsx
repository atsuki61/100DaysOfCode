'use client';

import { useEffect, useRef } from 'react';
import { useDrawing } from '../hooks/useDrawing';

type Props = {
  width?: number;
  height?: number;
};

export default function CanvasBoard({ width = 800, height = 500 }: Props) {
  const { setCanvas, onPointerDown, onPointerMove, onPointerUp } = useDrawing();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onDown = (e: MouseEvent) => onPointerDown(e);
    const onMove = (e: MouseEvent) => onPointerMove(e);
    const onUp = () => onPointerUp();
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    // タッチ
    const onTDown = (e: TouchEvent) => onPointerDown(e);
    const onTMove = (e: TouchEvent) => onPointerMove(e);
    const onTUp = () => onPointerUp();
    el.addEventListener('touchstart', onTDown, { passive: false });
    window.addEventListener('touchmove', onTMove, { passive: false });
    window.addEventListener('touchend', onTUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onTDown);
      window.removeEventListener('touchmove', onTMove);
      window.removeEventListener('touchend', onTUp);
    };
  }, [onPointerDown, onPointerMove, onPointerUp]);

  return (
    <div ref={wrapperRef} className="inline-block rounded-xl border bg-white shadow p-2"> {/* インラインブロック, 角丸, 枠線, 白背景, 影, 余白 */}
      <canvas ref={setCanvas} width={width} height={height} className="rounded-md bg-gray-50" /> {/* 角丸, 薄灰背景 */}
    </div>
  );
}



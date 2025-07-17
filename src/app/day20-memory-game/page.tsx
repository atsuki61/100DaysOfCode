import React from 'react';
import MemoryGame from './components/MemoryGame';

export default function Day20Page() {
  return (
    <div className="py-10 px-4"> {/* 上下パディング10, 左右パディング4 */}
      <div className="max-w-4xl mx-auto"> {/* 最大幅4xl, 中央寄せ */}
      </div>
      <MemoryGame/>
    </div>
  );
}
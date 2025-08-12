'use client';

import { useMemo, useState } from 'react';
import { validateCard } from '../utils/cardUtils';
import type { ValidationResult } from '../types';

export default function CardValidatorApp() {
  const [input, setInput] = useState('');
  const result: ValidationResult = useMemo(() => validateCard(input), [input]);

  const brandLabel: Record<string, string> = {
    visa: 'VISA',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
    jcb: 'JCB',
    diners: 'Diners Club',
    unknown: '不明',
  };

  return (
    <div className="max-w-xl mx-auto"> {/* 最大幅, 中央寄せ */}
      <div className="space-y-4"> {/* 縦間隔 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">カード番号</label> {/* ラベル */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 入力スタイル
          />
          <p className="mt-1 text-xs text-gray-500">スペースやハイフンは自動で無視されます</p> {/* 補足 */}
        </div>

        <div className="bg-white rounded-xl border p-4"> {/* カード風パネル */}
          <div className="text-sm text-gray-600">検出ブランド</div>
          <div className="text-lg font-semibold mt-1">{brandLabel[result.brand]}</div>
          <div className="mt-3 text-sm text-gray-600">整形表示</div>
          <div className="text-xl font-mono tracking-widest mt-1">{result.formatted || '—'}</div> {/* 等幅, 文字間広め */}
          <div className="mt-3 text-sm text-gray-600">Luhnチェック</div>
          <div className={result.isValidLuhn ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {result.normalized.length > 0 ? (result.isValidLuhn ? '有効' : '無効') : '未入力'}
          </div>
        </div>
      </div>
    </div>
  );
}



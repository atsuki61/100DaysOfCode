'use client';

import type { QRCodeOptions, ErrorCorrectionLevel } from '../types';
import { useId } from 'react';

type Props = {
  value: QRCodeOptions;
  onChange: <K extends keyof QRCodeOptions>(key: K, value: QRCodeOptions[K]) => void;
  onPreset: (text: string) => void;
};

const LEVELS: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H'];

export default function OptionsForm({ value, onChange, onPreset }: Props) {
  const textId = useId();
  const sizeId = useId();
  const marginId = useId();
  const levelId = useId();
  const fgId = useId();
  const bgId = useId();

  return (
    <form className="space-y-4"> {/* 縦方向の余白 */}
      <div>
        <label htmlFor={textId} className="block text-sm font-medium text-gray-700 mb-1">入力テキスト</label> {/* ラベル, 小サイズ, 太字, 下余白 */}
        <textarea
          id={textId}
          value={value.text}
          onChange={(e) => onChange('text', e.target.value)}
          placeholder="URLやテキストを入力"
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 幅いっぱい, 余白, 枠線, 角丸, フォーカスリング
        />
        <div className="mt-2 flex flex-wrap gap-2"> {/* 上余白, 折返し, 間隔 */}
          <button type="button" onClick={() => onPreset('https://example.com')} className="px-3 py-1.5 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors"> {/* 小ボタン, 灰背景, 角丸 */}
            https://example.com
          </button>
          <button type="button" onClick={() => onPreset('WIFI:S:MySSID;T:WPA;P:password;;')} className="px-3 py-1.5 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors"> {/* 小ボタン */}
            Wi-Fi テンプレ
          </button>
          <button type="button" onClick={() => onPreset('MATMSG:TO:hello@example.com;SUB:Hello;BODY:Nice to meet you;;')} className="px-3 py-1.5 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors"> {/* 小ボタン */}
            メール テンプレ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4"> {/* 2列グリッド, 間隔 */}
        <div>
          <label htmlFor={sizeId} className="block text-sm font-medium text-gray-700 mb-1">サイズ(px)</label>
          <input
            id={sizeId}
            type="number"
            min={128}
            max={1024}
            step={16}
            value={value.size}
            onChange={(e) => onChange('size', Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // 幅いっぱい, 余白, 枠線, 角丸, フォーカスリング
          />
        </div>
        <div>
          <label htmlFor={marginId} className="block text-sm font-medium text-gray-700 mb-1">マージン</label>
          <input
            id={marginId}
            type="number"
            min={0}
            max={8}
            step={1}
            value={value.margin}
            onChange={(e) => onChange('margin', Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4"> {/* 2列グリッド */}
        <div>
          <label htmlFor={levelId} className="block text-sm font-medium text-gray-700 mb-1">誤り訂正レベル</label>
          <select
            id={levelId}
            value={value.level}
            onChange={(e) => onChange('level', e.target.value as ErrorCorrectionLevel)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" // 幅いっぱい, 余白, 枠線, 背景白, フォーカス
          >
            {LEVELS.map((lv) => (
              <option key={lv} value={lv}>{lv}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4"> {/* 色2つを横並び */}
          <div>
            <label htmlFor={fgId} className="block text-sm font-medium text-gray-700 mb-1">前景色</label>
            <input
              id={fgId}
              type="color"
              value={value.foregroundColor}
              onChange={(e) => onChange('foregroundColor', e.target.value)}
              className="w-full h-10 border rounded-md" // 幅いっぱい, 高さ, 枠線, 角丸
            />
          </div>
          <div>
            <label htmlFor={bgId} className="block text-sm font-medium text-gray-700 mb-1">背景色</label>
            <input
              id={bgId}
              type="color"
              value={value.backgroundColor}
              onChange={(e) => onChange('backgroundColor', e.target.value)}
              className="w-full h-10 border rounded-md"
            />
          </div>
        </div>
      </div>
    </form>
  );
}



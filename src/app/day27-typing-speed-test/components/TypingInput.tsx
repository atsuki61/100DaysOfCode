import React from 'react';

interface TypingInputProps {
  value: string; // 入力値
  onChange: (value: string) => void; // 入力変更時のコールバック
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void; // キー押下時のコールバック
  disabled?: boolean; // 無効状態
  placeholder?: string; // プレースホルダー
  autoFocus?: boolean; // 自動フォーカス
  className?: string; // 追加クラス
}

export default function TypingInput({ 
  value, 
  onChange, 
  onKeyDown,
  disabled = false, 
  placeholder = "ここに入力してください...", 
  autoFocus = false,
  className = '' 
}: TypingInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // 自動フォーカス
  React.useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // 入力時の処理
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // キー押下時の処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+A, Ctrl+V, Backspace, Delete などは制限しない
    const isCtrlKey = e.ctrlKey || e.metaKey;
    
    // コピペ防止（ただし全選択は許可）
    if (isCtrlKey && (e.key === 'v' || e.key === 'V')) {
      e.preventDefault();
      return;
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="typing-input" className="block text-sm font-medium text-gray-700 mb-2"> {/* ブロック要素, 文字サイズsm, 太字, グレー700テキスト, 下マージン2 */}
        入力エリア
      </label>
      <textarea
        ref={textareaRef}
        id="typing-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={4}
        className={`
          w-full px-4 py-3 border-2 rounded-lg resize-none font-mono text-lg
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
          ${disabled ? 'border-gray-300' : 'border-gray-300 hover:border-gray-400'}
        `} // 横幅いっぱい, 横パディング4, 縦パディング3, ボーダー2, 角丸lg, サイズ変更なし, 等幅フォント, 文字サイズlg, 全プロパティにトランジション, フォーカス時アウトラインなし青500リング2ボーダー, 無効時グレー100背景カーソルなし不透明度60
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      
      {/* 文字数カウンター */}
      <div className="absolute bottom-2 right-3 text-xs text-gray-500 bg-white px-1 rounded"> {/* 絶対配置, 下2, 右3, 文字サイズxs, グレー500テキスト, 白背景, 横パディング1, 角丸 */}
        {value.length}文字
      </div>

      {/* ヒント */}
      {!disabled && (
        <div className="mt-2 text-xs text-gray-500"> {/* 上マージン2, 文字サイズxs, グレー500テキスト */}
          💡 ヒント: コピー&ペーストは無効です。正確に入力してください。
        </div>
      )}
    </div>
  );
}
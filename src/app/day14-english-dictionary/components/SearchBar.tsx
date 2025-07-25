'use client'

import { useState, FormEvent } from 'react';

interface SearchBarProps {// 検索バーのprops
  onSearch: (word: string) => void;// 検索ボタンのクリックイベント
  isLoading: boolean;// 検索中かどうか
  placeholder?: string;// プレースホルダー
}

export default function SearchBar({ onSearch, isLoading, placeholder = "英単語を入力してください（例: hello, computer, beautiful）" }: SearchBarProps) {// 検索バーのコンポーネント
  const [inputValue, setInputValue] = useState('');// 入力値

  const handleSubmit = (e: FormEvent) => {// 検索ボタンのクリックイベント
    e.preventDefault();// フォームの送信をキャンセル
    if (inputValue.trim() && !isLoading) {// 入力値が存在し、検索中でない場合
      onSearch(inputValue.trim());// 検索ボタンのクリックイベント
    }
    };

  const handleInputChange = (value: string) => {// 入力値の変更イベント
    // 英語以外の文字を入力時に警告（実際の検索時にバリデーション）
    setInputValue(value);// 入力値を更新
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8"> {/* 横幅いっぱい, 最大横幅2xl, 中央寄せ, 下マージン8 */}
      <form onSubmit={handleSubmit} className="relative"> {/* 相対位置 */}
        <div className="relative"> {/* 相対位置 */}
          <input
            type="text"// テキスト入力
            value={inputValue}// 入力値
            onChange={(e) => handleInputChange(e.target.value)}// 入力値の変更イベント
            placeholder={placeholder}// プレースホルダー
            disabled={isLoading}// 検索中の場合は無効
            className="w-full px-6 py-4 text-lg border-2 border-indigo-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-lg" // 横幅いっぱい, 横パディング6, 縦パディング4, 文字サイズlg, ボーダー2, インディゴ200ボーダー, 角丸2xl, フォーカス時アウトラインなし・インディゴ500ボーダー・リング4・インディゴ100リング, 全プロパティトランジション, 無効時グレー100背景・カーソル禁止, 影lg */}
          />
          <button
            type="submit"// フォームの送信
            disabled={!inputValue.trim() || isLoading}// 入力値が存在し、検索中でない場合は無効
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold" // 絶対位置, 右2, 上50%, 変形・Y軸-50%移動, 横パディング6, 縦パディング2, インディゴ600背景, 白文字, 角丸xl, ホバー時インディゴ700背景, フォーカス時アウトラインなし・リング4・インディゴ100リング, 無効時グレー400背景・カーソル禁止, 全プロパティトランジション, 太字 */}
          >
            {isLoading ? (
              <div className="flex items-center gap-2"> {/* Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {/* 横幅4, 高さ4, ボーダー2, 白ボーダー, 上透明ボーダー, 角丸円形, 回転アニメーション */}
                検索中...
              </div>
            ) : (
              '検索'
            )}
          </button>
        </div>
      </form>
      
      {/* 検索のヒント */}
      <div className="mt-3 text-sm text-gray-600 text-center"> {/* 上マージン3, 文字サイズsm, グレー600文字, 中央揃え */}
        💡 英語の単語を入力してEnterキーまたは検索ボタンをクリックしてください
      </div>
    </div>
  );
} 
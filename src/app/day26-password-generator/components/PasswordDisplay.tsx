'use client';

import React, { useState } from 'react';
import { PasswordStrength } from '../types';
import { copyToClipboard, evaluatePasswordStrength } from '../utils/passwordUtils';

interface PasswordDisplayProps {
  password: string;
}

export default function PasswordDisplay({ password }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [showToast, setShowToast] = useState(false);

  // パスワードが変更されたときに強度を評価
  React.useEffect(() => {
    if (password) {
      setStrength(evaluatePasswordStrength(password));
    } else {
      setStrength(null);
    }
  }, [password]);

  const handleCopy = async () => {
    if (password) {
      try {
        const success = await copyToClipboard(password);
        if (success) {
          setCopied(true);
          setShowToast(true);
          setTimeout(() => {
            setCopied(false);
            setShowToast(false);
          }, 2000); // 2秒後にリセット
        } else {
          // フォールバック: 古いブラウザ向け
          const textArea = document.createElement('textarea');
          textArea.value = password;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          setShowToast(true);
          setTimeout(() => {
            setCopied(false);
            setShowToast(false);
          }, 2000);
        }
      } catch (error) {
        console.error('コピーに失敗しました:', error);
        // ユーザーにエラーを通知
        alert('パスワードのコピーに失敗しました。手動でコピーしてください。');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* パスワード表示エリア */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                生成されたパスワード
              </label>
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-inner hover:shadow-md transition-shadow duration-300">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="w-full bg-transparent text-xl font-mono text-gray-800 outline-none text-center select-all cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  placeholder="パスワードがここに表示されます"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
              </div>
            </div>
            <div className="ml-4">
              <button
                onClick={handleCopy}
                disabled={!password}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl ${
                  copied
                    ? 'bg-green-500 hover:bg-green-600 text-white transform scale-105'
                    : password
                    ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">完了!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg">コピー</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* トースト通知 */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">パスワードをコピーしました！</span>
          </div>
        </div>
      )}

      {/* パスワード強度表示 */}
      {strength && password && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">セキュリティ強度</h3>
            <div className={`px-4 py-2 rounded-full font-semibold text-sm ${strength.color} bg-opacity-10`}>
              {strength.label}
            </div>
          </div>
          
          {/* プログレスバー */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>弱い</span>
              <span>非常に強い</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                className={`h-3 rounded-full transition-all duration-500 shadow-sm ${
                  strength.score <= 2
                    ? 'bg-gradient-to-r from-red-400 to-red-600'
                    : strength.score <= 4
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : strength.score <= 6
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                    : 'bg-gradient-to-r from-green-400 to-green-600'
                }`}
                style={{ width: `${(strength.score / 7) * 100}%` }}
              />
            </div>
          </div>
          
          {/* 詳細スコア */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              スコア: <span className="font-semibold text-gray-800">{strength.score}/7</span>
            </div>
            <div className="flex space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < strength.score
                      ? strength.score <= 2
                        ? 'bg-red-500'
                        : strength.score <= 4
                        ? 'bg-yellow-500'
                        : strength.score <= 6
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
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
      const success = await copyToClipboard(password);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2秒後にリセット
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* パスワード表示エリア */}
      <div className="relative">
        <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 bg-transparent text-lg font-mono text-gray-800 outline-none"
            placeholder="パスワードがここに表示されます"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className={`ml-3 px-4 py-2 rounded-md font-medium transition-colors ${
              copied
                ? 'bg-green-500 text-white'
                : password
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {copied ? 'コピー完了!' : 'コピー'}
          </button>
        </div>
      </div>

      {/* パスワード強度表示 */}
      {strength && password && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">パスワード強度:</span>
            <span className={`text-sm font-semibold ${strength.color}`}>
              {strength.label}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                strength.score <= 2
                  ? 'bg-red-500'
                  : strength.score <= 4
                  ? 'bg-yellow-500'
                  : strength.score <= 6
                  ? 'bg-blue-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${(strength.score / 7) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-600">
            スコア: {strength.score}/7
          </div>
        </div>
      )}
    </div>
  );
} 
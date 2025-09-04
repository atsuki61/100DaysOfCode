'use client';

import React, { useState } from 'react';
import PasswordDisplay from './components/PasswordDisplay';
import PasswordOptions from './components/PasswordOptions';
import type { PasswordOptions as PasswordOptionsType } from './types';
import { generatePassword } from './utils/passwordUtils';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptionsType>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false
  });

  const handleGeneratePassword = React.useCallback(() => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  }, [options]);

  // コンポーネントマウント時に初期パスワードを生成
  React.useEffect(() => {
    handleGeneratePassword();
  }, [handleGeneratePassword]);

  const handleOptionsChange = (newOptions: PasswordOptionsType) => {
    setOptions(newOptions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側: パスワード表示 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">生成されたパスワード</h2>
            <PasswordDisplay password={password} />
          </div>

          <div className="text-center">
            <button
              onClick={handleGeneratePassword}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              パスワードを生成
            </button>
          </div>
        </div>

        {/* 右側: オプション設定 */}
        <div>
          <PasswordOptions options={options} onOptionsChange={handleOptionsChange} />
        </div>
      </div>

      {/* 使用例とヒント */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">パスワードのヒント</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-medium mb-2">強力なパスワードの条件:</h4>
            <ul className="space-y-1">
              <li>• 最低8文字以上</li>
              <li>• 大文字と小文字を含む</li>
              <li>• 数字を含む</li>
              <li>• 記号を含む</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">セキュリティのベストプラクティス:</h4>
            <ul className="space-y-1">
              <li>• 各サービスで異なるパスワードを使用</li>
              <li>• 定期的にパスワードを変更</li>
              <li>• パスワードマネージャーの使用を検討</li>
              <li>• 個人情報を含めない</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
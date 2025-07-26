'use client';

import React from 'react';
import type { PasswordOptions } from '../types';

interface PasswordOptionsProps {
  options: PasswordOptions;
  onOptionsChange: (options: PasswordOptions) => void;
}

export default function PasswordOptions({ options, onOptionsChange }: PasswordOptionsProps) {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = parseInt(e.target.value);
    onOptionsChange({ ...options, length });
  };

  const handleCheckboxChange = (key: keyof Omit<PasswordOptions, 'length'>) => {
    onOptionsChange({
      ...options,
      [key]: !options[key]
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">パスワード設定</h3>
      
      {/* パスワード長さ */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          パスワード長さ: {options.length}文字
        </label>
        <input
          type="range"
          min="4"
          max="50"
          value={options.length}
          onChange={handleLengthChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>4</span>
          <span>50</span>
        </div>
      </div>

      {/* 文字種オプション */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">含める文字種:</h4>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeUppercase}
            onChange={() => handleCheckboxChange('includeUppercase')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">大文字 (A-Z)</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeLowercase}
            onChange={() => handleCheckboxChange('includeLowercase')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">小文字 (a-z)</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={() => handleCheckboxChange('includeNumbers')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">数字 (0-9)</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeSymbols}
            onChange={() => handleCheckboxChange('includeSymbols')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">記号 (!@#$%^&*)</span>
        </label>
      </div>

      {/* 注意事項 */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-800">
          <strong>注意:</strong> 少なくとも1つの文字種を選択してください。何も選択されていない場合は、小文字と数字が自動的に含まれます。
        </p>
      </div>
    </div>
  );
} 
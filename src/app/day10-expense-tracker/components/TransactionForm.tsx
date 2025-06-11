"use client";

import React, { useState } from 'react';

interface TransactionFormProps {
  addTransaction: (transaction: { description: string; amount: number; type: 'income' | 'expense' }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('すべての項目を入力してください');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('正の数値を入力してください');
      return;
    }

    addTransaction({
      description,
      amount: numericAmount,
      type,
    });

    setDescription('');
    setAmount('');
  };

  return (
    <div className="w-full h-fit bg-gray-800/60 backdrop-blur-sm rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/20 p-4">
      <h3 className="text-lg font-bold border-b border-gray-600 pb-2 mb-6 text-white">新しい取引を追加</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">種類</label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
                className="h-4 w-4 text-green-400 focus:ring-green-400 border-gray-600 bg-gray-700"
              />
              <span className="ml-2 text-green-400 font-medium">収入</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
                className="h-4 w-4 text-pink-400 focus:ring-pink-400 border-gray-600 bg-gray-700"
              />
              <span className="ml-2 text-pink-400 font-medium">支出</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            内容
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例：給料、コーヒー代"
            className="w-full p-3 border border-gray-600 bg-gray-700/50 text-white rounded-md shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
            金額
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="正の数値を入力してください"
            className="w-full p-3 border border-gray-600 bg-gray-700/50 text-white rounded-md shadow-sm focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 placeholder-gray-400"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 text-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40">
          取引を追加
        </button>
      </form>
    </div>
  );
};

export default TransactionForm; 
import React from 'react';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
  deleteTransaction: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, deleteTransaction }) => {
  const sign = transaction.type === 'expense' ? '-' : '+';
  const colorClass = transaction.type === 'expense' ? 'border-r-red-500' : 'border-r-green-500';

  return (
    <li className={`bg-white shadow-sm flex justify-between items-center p-3 my-2 border-r-8 rounded-md ${colorClass}`}> {/* リスト項目: 白背景、影、Flexbox、中央揃え、パディング3、縦マージン2、左のボーダー色分け、角丸 */}
      <span className="font-medium">{transaction.description}</span>
      <div className="flex items-center">
        <span className={`font-semibold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
          {sign}¥{transaction.amount.toLocaleString()}
        </span>
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="ml-4 bg-gray-300 hover:bg-red-500 hover:text-white text-gray-700 text-xs font-bold py-1 px-2 rounded-full transition-colors duration-200" // 削除ボタン: 左マージン4、グレー背景、ホバー時赤背景白文字、テキスト細字、角丸
        >
          ✕
        </button>
      </div>
    </li>
  );
};

export default TransactionItem; 
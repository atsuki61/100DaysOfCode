import React from 'react';
import { Transaction } from '../types';

interface TransactionItemProps {// トランザクション項目の型定義
  transaction: Transaction;// トランザクションデータ
  deleteTransaction: (id: string) => void;// トランザクション削除関数
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, deleteTransaction }) => {// トランザクション項目コンポーネント
  const sign = transaction.type === 'expense' ? '-' : '+';// 符号を決定
  const colorClass = transaction.type === 'expense' ? 'border-r-red-500' : 'border-r-green-500';// 色を決定

  return (
    <li className={`bg-white hover:bg-gray-50 shadow-sm flex justify-between items-center p-3 border-r-4 rounded-lg transition-colors duration-200 ${colorClass}`}> {/* リスト項目: 白背景、ホバー効果、影、Flexbox、中央揃え、パディング3、右のボーダー色分け、角丸、トランジション */}
      <span className="font-medium text-gray-800">{transaction.description}</span>
      <div className="flex items-center"> {/* コンテナ: Flexbox、要素を中央揃え */}
        <span className={`font-semibold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}> {/* 金額: フォント細、色分け */}
          {sign}¥{transaction.amount.toLocaleString()} {/* 符号と金額: 符号、円記号、3桁区切り */}
        </span>
        <button // 削除ボタン
          onClick={() => deleteTransaction(transaction.id)} // クリック時の処理
          className="ml-4 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 text-xs font-bold py-1.5 px-2.5 rounded-full transition-colors duration-200" // 削除ボタン: 左マージン4、グレー背景、ホバー時赤背景白文字、テキスト細字、角丸、トランジション
        >
          ✕
        </button>
      </div>
    </li>
  );
};

export default TransactionItem; 
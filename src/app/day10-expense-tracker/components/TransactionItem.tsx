import React from 'react';
import { Transaction } from '../types';

interface TransactionItemProps {// トランザクション項目の型定義
  transaction: Transaction;// トランザクションデータ
  deleteTransaction: (id: string) => void;// トランザクション削除関数
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, deleteTransaction }) => {// トランザクション項目コンポーネント
  const sign = transaction.type === 'expense' ? '-' : '+';// 符号を決定
  const colorClass = transaction.type === 'expense' ? 'border-r-pink-500 shadow-pink-500/20' : 'border-r-green-500 shadow-green-500/20';// 色を決定

  return (
    <li className={`bg-gray-700/50 hover:bg-gray-600/60 backdrop-blur-sm shadow-lg flex justify-between items-center p-3 border-r-4 rounded-lg transition-all duration-300 ${colorClass}`}> {/* リスト項目: ダーク背景、ホバー効果、影、Flexbox、中央揃え、パディング3、右のボーダー色分け、角丸、トランジション */}
      <span className="font-medium text-gray-100">{transaction.description}</span>
      <div className="flex items-center"> {/* コンテナ: Flexbox、要素を中央揃え */}
        <span className={`font-semibold ${transaction.type === 'expense' ? 'text-pink-400' : 'text-green-400'}`}> {/* 金額: フォント細、ネオンカラー */}
          {sign}¥{transaction.amount.toLocaleString()} {/* 符号と金額: 符号、円記号、3桁区切り */}
        </span>
        <button // 削除ボタン
          onClick={() => deleteTransaction(transaction.id)} // クリック時の処理
          className="ml-4 bg-red-500/20 hover:bg-red-500 hover:text-white text-red-400 text-xs font-bold py-1.5 px-2.5 rounded-full transition-all duration-300 border border-red-500/30 hover:shadow-lg hover:shadow-red-500/50" // 削除ボタン: ネオンレッド、ホバー効果
        >
          ✕
        </button>
      </div>
    </li>
  );
};

export default TransactionItem; 
import React from 'react';
import { Transaction } from '../types';

interface BalanceProps {
  transactions: Transaction[];
}

const Balance: React.FC<BalanceProps> = ({ transactions }) => {// 残高コンポーネント
  const income = transactions // 収入額を計算
    .filter(t => t.type === 'income') // 収入のみを抽出
    .reduce((acc, t) => acc + t.amount, 0); // 収入額を合計

  const expense = transactions // 支出額を計算
    .filter(t => t.type === 'expense') // 支出のみを抽出
    .reduce((acc, t) => acc + t.amount, 0); // 支出額を合計

  const total = income - expense; // 残高を計算

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"> {/* コンテナ: 幅全快、最大幅md、中央寄せ、パディング4、白背景、影、角丸 */}
      <h2 className="text-2xl font-bold text-center mb-4">残高</h2> {/* 見出し: 大文字、太字、中央寄せ、下マージン4 */}
      <div className="text-3xl font-bold text-center mb-6">¥{total.toLocaleString()}</div> {/* 残高表示、3桁区切り */}
      <div className="flex justify-around text-center"> {/* コンテナ: Flexbox、要素を均等配置、中央寄せ */}
        <div className="w-1/2 border-r border-gray-200"> {/* コンテナ: 幅半分、右ボーダー */}
          <h3 className="text-lg font-semibold text-green-600">収入</h3> {/* 収入見出し: やや大文字、太字、緑色 */}
          <p className="text-2xl font-bold text-green-500">
            +¥{income.toLocaleString()}
          </p> {/* 収入額表示、3桁区切り */}
        </div>
        <div className="w-1/2"> {/* コンテナ: 幅半分 */}
          <h3 className="text-lg font-semibold text-red-600">支出</h3> {/* 支出見出し: やや大文字、太字、赤色 */}
          <p className="text-2xl font-bold text-red-500">
            -¥{expense.toLocaleString()}
          </p> {/* 支出額表示、3桁区切り */}
        </div>
      </div>
    </div>
  );
};

export default Balance; 
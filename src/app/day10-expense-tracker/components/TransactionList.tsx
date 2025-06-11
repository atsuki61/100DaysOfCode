import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, deleteTransaction }) => {
  return (
    <div className="w-full bg-gray-50 rounded-lg border p-4">
      <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4">履歴</h3>
      {transactions.length > 0 ? (
        <div className="h-80 overflow-y-auto">
          <ul className="list-none p-0 space-y-2">
            {transactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                deleteTransaction={deleteTransaction}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">まだ取引がありません。</p>
      )}
    </div>
  );
};

export default TransactionList; 
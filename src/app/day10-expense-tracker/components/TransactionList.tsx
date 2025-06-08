import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, deleteTransaction }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h3 className="text-xl font-bold border-b pb-2 mb-4">履歴</h3>
      {transactions.length > 0 ? (
        <ul className="list-none p-0">
          {transactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              deleteTransaction={deleteTransaction}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-4">まだ取引がありません。</p>
      )}
    </div>
  );
};

export default TransactionList; 
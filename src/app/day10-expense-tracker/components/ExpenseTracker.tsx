"use client";

import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';
import Balance from './Balance';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const ExpenseTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, isClient]);

  const addTransaction = (transaction: { description: string; amount: number; type: TransactionType }) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...transaction,
    };
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
  };

  if (!isClient) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-700/50 p-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側のカラム */}
          <div className="flex flex-col gap-6">
            {/* 残高 */}
            <Balance transactions={transactions} />
            
            {/* 履歴 */}
            <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
          </div>
          
          {/* 右側のカラム: フォーム */}
          <div className="flex flex-col">
            <TransactionForm addTransaction={addTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker; 
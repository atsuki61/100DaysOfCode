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
    <div className="container mx-auto p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
          <div className="order-1 md:order-1">
            <Balance transactions={transactions} />
          </div>
          <div className="order-3 md:order-2">
            <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
          </div>
          <div className="order-2 md:order-3 md:col-start-2 md:row-start-1 md:row-span-2 flex flex-col">
            <TransactionForm addTransaction={addTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker; 
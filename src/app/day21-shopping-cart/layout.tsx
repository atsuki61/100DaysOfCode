import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import PageHeader from '@/components/common/PageHeader';
import React from 'react';
import { CartProvider } from './contexts/CartContext';

export default function Day21Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header title="100DaysOfCode" />
        <main className="flex-grow bg-gray-50 min-h-screen">
          <PageHeader
            title="Day 21: ショッピングカート"
            description="商品一覧からカートに追加・削除し、合計金額を表示するアプリです。"
          />
          {children}
        </main>
        <Footer currentDay={21} />
      </div>
    </CartProvider>
  );
} 
'use client';

import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { state, clearCart } = useCart();
  const { items, totalItems, totalPrice } = state;

  // 価格を日本円でフォーマット
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price);
  };

  // 税込み価格を計算（10%の消費税）
  const taxRate = 0.1;
  const tax = Math.floor(totalPrice * taxRate);
  const totalWithTax = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🛒</span>
          ショッピングカート
        </h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-lg">カートは空です</p>
          <p className="text-gray-400 text-sm mt-2">商品を追加してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">🛒</span>
          ショッピングカート
        </h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {totalItems}個の商品
        </span>
      </div>

      {/* カート内商品一覧 */}
      <div className="mb-6">
        {items.map(item => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      {/* 合計金額エリア */}
      <div className="border-t pt-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-600">
            <span>小計</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>消費税（10%）</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
            <span>合計</span>
            <span>{formatPrice(totalWithTax)}</span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex space-x-3">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            カートを空にする
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            購入手続きへ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 
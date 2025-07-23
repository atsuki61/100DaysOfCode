'use client';

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { state, clearCart } = useCart();
  const { items, totalItems, totalPrice } = state;
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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

  const handleClearCart = () => {
    if (showClearConfirm) {
      clearCart();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      // 3秒後に確認状態をリセット
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3 p-2 bg-blue-100 rounded-lg">🛒</span>
          ショッピングカート
        </h2>
        <div className="text-center py-12">
          <div className="relative mb-6">
            <div className="text-8xl opacity-20">🛒</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-50 rounded-full p-4">
                <span className="text-4xl">✨</span>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">カートは空です</h3>
          <p className="text-gray-500 mb-6">お気に入りの商品を見つけて追加してください</p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">💡 商品一覧から気になる商品を選んでみてください</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-3 p-2 bg-blue-500 text-white rounded-lg">🛒</span>
            ショッピングカート
          </h2>
          <div className="flex items-center space-x-3">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              {totalItems}個の商品
            </span>
            <span className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-200">
              {formatPrice(totalWithTax)}
            </span>
          </div>
        </div>
      </div>

      {/* カート内商品一覧 */}
      <div className="p-6">
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {items.map((item, index) => (
            <div key={item.product.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* 合計金額エリア */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            注文内容
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>小計（{totalItems}個の商品）</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>消費税（10%）</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            <div className="border-t-2 border-gray-200 pt-3">
              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>合計</span>
                <span className="text-blue-600">{formatPrice(totalWithTax)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタンエリア */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleClearCart}
            className={`flex-1 sm:flex-none sm:w-auto font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
              showClearConfirm
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg scale-95'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
            }`}
          >
            <span>{showClearConfirm ? '🗑️' : '💫'}</span>
            <span>{showClearConfirm ? '本当に削除しますか？' : 'カートを空にする'}</span>
          </button>
          
          <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2">
            <span>🚀</span>
            <span>購入手続きへ進む</span>
          </button>
        </div>

        {/* 配送情報 */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 text-green-700">
            <span>🚚</span>
            <span className="text-sm font-medium">
              ¥3,000以上のご注文で送料無料
              {totalWithTax >= 3000 ? '（適用済み）' : `（あと${formatPrice(3000 - totalWithTax)}）`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 
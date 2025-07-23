'use client';

import React, { useState } from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 価格を日本円でフォーマット
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price);
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    
    updateQuantity(product.id, newQuantity);
    
    // 短時間のフィードバック
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleRemove = () => {
    if (showRemoveConfirm) {
      removeFromCart(product.id);
    } else {
      setShowRemoveConfirm(true);
      // 3秒後に確認状態をリセット
      setTimeout(() => setShowRemoveConfirm(false), 3000);
    }
  };

  const itemTotal = product.price * quantity;

  return (
    <div className="group bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start space-x-4">
          {/* 商品画像 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl w-20 h-20 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {product.image}
          </div>

          {/* 商品情報エリア */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-grow pr-4">
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-blue-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1"></span>
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  {formatPrice(product.price)} <span className="text-gray-400">× {quantity}</span>
                </p>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={handleRemove}
                className={`p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  showRemoveConfirm
                    ? 'bg-red-500 text-white hover:bg-red-600 scale-110 shadow-lg'
                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 group-hover:bg-red-50'
                }`}
                title={showRemoveConfirm ? 'クリックで削除' : '商品を削除'}
              >
                {showRemoveConfirm ? '🗑️' : '✕'}
              </button>
            </div>

            {/* 数量コントロールと小計エリア */}
            <div className="flex items-center justify-between">
              {/* 数量コントロール */}
              <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isUpdating}
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-bold transition-all duration-200 ${
                    quantity <= 1 || isUpdating
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'
                  }`}
                >
                  −
                </button>
                
                <div className={`w-12 text-center font-bold text-gray-900 transition-all duration-300 ${
                  isUpdating ? 'scale-110 text-blue-600' : ''
                }`}>
                  {quantity}
                </div>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isUpdating}
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-bold transition-all duration-200 ${
                    isUpdating
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'
                  }`}
                >
                  +
                </button>
              </div>

              {/* 小計表示 */}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {formatPrice(itemTotal)}
                </div>
                {quantity > 1 && (
                  <div className="text-xs text-gray-500">
                    {formatPrice(product.price)} × {quantity}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 確認メッセージ */}
        {showRemoveConfirm && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-red-700">
                <span>⚠️</span>
                <span className="text-sm font-medium">この商品をカートから削除しますか？</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowRemoveConfirm(false)}
                  className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleRemove}
                  className="text-xs px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem; 
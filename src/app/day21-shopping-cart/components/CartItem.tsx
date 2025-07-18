'use client';

import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  // 価格を日本円でフォーマット
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm border p-4 mb-3">
      {/* 商品画像 */}
      <div className="bg-gray-100 rounded-lg w-16 h-16 flex items-center justify-center text-2xl mr-4">
        {product.image}
      </div>

      {/* 商品情報 */}
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.category}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* 数量コントロール */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
            disabled={quantity <= 1}
          >
            −
          </button>
          
          <span className="w-8 text-center font-semibold text-gray-900">
            {quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
          >
            +
          </button>
        </div>

        {/* 小計 */}
        <div className="text-right min-w-[80px]">
          <p className="font-bold text-gray-900">
            {formatPrice(product.price * quantity)}
          </p>
        </div>

        {/* 削除ボタン */}
        <button
          onClick={handleRemove}
          className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 transition-colors ml-3"
          title="商品を削除"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem; 
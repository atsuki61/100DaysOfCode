'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    
    // 短時間のフィードバック表示
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  // 価格を日本円でフォーマット
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* 商品画像（絵文字） */}
      <div className="bg-gray-100 h-48 flex items-center justify-center text-6xl">
        {product.image}
      </div>
      
      {/* 商品情報 */}
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
              isAdding
                ? 'bg-green-500 text-white scale-95'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
            }`}
          >
            <span>{isAdding ? '✅' : '🛒'}</span>
            <span>{isAdding ? '追加済み!' : 'カートに追加'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
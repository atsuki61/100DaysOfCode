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
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    
    // 短時間のフィードバック表示
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  // 価格を日本円でフォーマット
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price);
  };

  // 在庫状況をランダムに生成（デモ用）
  const stockStatus = product.id % 3 === 0 ? 'low' : product.id % 5 === 0 ? 'out' : 'in';
  
  const getStockBadge = () => {
    switch (stockStatus) {
      case 'low':
        return (
          <span 
            className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm"
            aria-label="在庫残りわずか"
          >
            残りわずか
          </span>
        );
      case 'out':
        return (
          <span 
            className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm"
            aria-label="在庫切れ"
          >
            在庫切れ
          </span>
        );
      default:
        return null;
    }
  };

  const getButtonAriaLabel = () => {
    if (stockStatus === 'out') return '在庫切れのため購入できません';
    if (isAdding) return 'カートに追加中です';
    return `${product.name}をカートに追加`;
  };

  return (
    <article 
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 group ${
        isHovered ? 'shadow-2xl transform scale-[1.02] border-blue-200' : 'hover:shadow-xl'
      } ${stockStatus === 'out' ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`product-title-${product.id}`}
      aria-describedby={`product-description-${product.id} product-price-${product.id}`}
    >
      {/* 商品画像エリア */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 flex items-center justify-center overflow-hidden">
        {getStockBadge()}
        <div 
          className={`text-6xl transition-transform duration-300 ${
            isHovered ? 'scale-110' : ''
          }`}
          role="img"
          aria-label={`${product.name}の商品画像`}
        >
          {product.image}
        </div>
      </div>
      
      {/* 商品情報 */}
      <div className="p-6">
        {/* カテゴリバッジ */}
        <div className="mb-3">
          <span 
            className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200"
            aria-label={`カテゴリ: ${product.category}`}
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" aria-hidden="true"></span>
            {product.category}
          </span>
        </div>
        
        {/* 商品名 */}
        <h3 
          id={`product-title-${product.id}`}
          className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors"
        >
          {product.name}
        </h3>
        
        {/* 商品説明 */}
        <p 
          id={`product-description-${product.id}`}
          className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed"
        >
          {product.description}
        </p>
        
        {/* 価格とボタンエリア */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span 
              id={`product-price-${product.id}`}
              className="text-2xl font-bold text-gray-900"
              aria-label={`価格 ${formatPrice(product.price)}`}
            >
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500" aria-hidden="true">税込価格</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding || stockStatus === 'out'}
            aria-label={getButtonAriaLabel()}
            aria-describedby={stockStatus === 'out' ? `stock-status-${product.id}` : undefined}
            className={`relative overflow-hidden font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              stockStatus === 'out'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isAdding
                ? 'bg-green-500 text-white scale-95 shadow-lg'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 hover:shadow-xl'
            }`}
          >
            {/* ボタンのアニメーション背景 */}
            <div className={`absolute inset-0 bg-white transition-transform duration-300 ${
              isAdding ? 'translate-x-0' : 'translate-x-full'
            }`} style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} aria-hidden="true" />
            
            <span className="relative z-10 text-lg" aria-hidden="true">
              {stockStatus === 'out' ? '🚫' : isAdding ? '✅' : '🛒'}
            </span>
            <span className="relative z-10 text-xs">
              {stockStatus === 'out' ? '在庫切れ' : isAdding ? '追加済み!' : 'カートに追加'}
            </span>
          </button>
        </div>
        
        {/* スクリーンリーダー用の在庫状況 */}
        {stockStatus === 'out' && (
          <span 
            id={`stock-status-${product.id}`}
            className="sr-only"
          >
            この商品は現在在庫切れです
          </span>
        )}
      </div>
    </article>
  );
};

export default ProductCard; 
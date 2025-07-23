'use client';

import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

  // カテゴリ一覧を取得
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    return ['全て', ...uniqueCategories];
  }, []);

  // フィルタリングとソート処理
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '全て' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // ソート処理（配列をコピーしてからソート）
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name':
      default:
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('全て');
    setSortBy('name');
  };

  return (
    <div className="mb-8">
      {/* ヘッダー */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="mr-3">🛍️</span>
          商品一覧
        </h2>
        <p className="text-gray-600">
          {filteredAndSortedProducts.length}件の商品が見つかりました
        </p>
      </div>

      {/* 検索・フィルターエリア */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 検索バー */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              🔍 商品検索
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="商品名や説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* カテゴリフィルター */}
          <div className="lg:w-64">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              📂 カテゴリ
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* ソート */}
          <div className="lg:w-48">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              📊 並び順
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="name">名前順</option>
              <option value="price-low">価格: 安い順</option>
              <option value="price-high">価格: 高い順</option>
            </select>
          </div>

          {/* クリアボタン */}
          <div className="lg:w-auto flex items-end">
            <button
              onClick={clearFilters}
              className="w-full lg:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>🔄</span>
              <span>リセット</span>
            </button>
          </div>
        </div>
      </div>

      {/* アクティブフィルター表示 */}
      {(searchTerm || selectedCategory !== '全て') && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">アクティブフィルター:</span>
          {searchTerm && (
            <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              検索: {searchTerm}
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </span>
          )}
          {selectedCategory !== '全て' && (
            <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              カテゴリ: {selectedCategory}
              <button
                onClick={() => setSelectedCategory('全て')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      {/* 商品グリッド */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="text-6xl mb-4 opacity-30">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">商品が見つかりませんでした</h3>
          <p className="text-gray-600 mb-4">検索条件を変更してもう一度お試しください</p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            フィルターをリセット
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 
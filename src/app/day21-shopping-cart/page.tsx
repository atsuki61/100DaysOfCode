import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function Day21Page() {
  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 商品一覧エリア (左側, 2/3の幅) */}
          <div className="lg:col-span-2">
            <ProductList />
          </div>
          
          {/* ショッピングカートエリア (右側, 1/3の幅) */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
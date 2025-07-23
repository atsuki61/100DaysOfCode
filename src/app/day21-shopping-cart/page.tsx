import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function Day21Page() {
  return (
    <div className="py-6 px-4 lg:py-10 min-h-screen"> {/* レスポンシブ余白調整、最小高さ設定 */}
      <div className="max-w-7xl mx-auto">
        {/* モバイルでは縦積み、LGサイズ以上では横並び */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 商品一覧エリア */}
          <div className="order-2 lg:order-1 lg:col-span-2"> {/* モバイルでは2番目、デスクトップでは1番目 */}
            <ProductList />
          </div>
          
          {/* ショッピングカートエリア */}
          <div className="order-1 lg:order-2 lg:col-span-1"> {/* モバイルでは1番目（上部）、デスクトップでは2番目 */}
            <div className="lg:sticky lg:top-4"> {/* デスクトップのみスティッキー */}
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
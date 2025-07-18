'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, CartAction, Product, CartItem } from '../types';

// 初期状態
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// カートのReducer関数
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);

      if (existingItem) {
        // 既にカートにある商品の場合、数量を増やす
        const updatedItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateTotals({ ...state, items: updatedItems });
      } else {
        // 新しい商品をカートに追加
        const newItem: CartItem = { product, quantity: 1 };
        return calculateTotals({ ...state, items: [...state.items, newItem] });
      }
    }

    case 'REMOVE_FROM_CART': {
      const productId = action.payload;
      const updatedItems = state.items.filter(item => item.product.id !== productId);
      return calculateTotals({ ...state, items: updatedItems });
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // 数量が0以下の場合は商品を削除
        const updatedItems = state.items.filter(item => item.product.id !== productId);
        return calculateTotals({ ...state, items: updatedItems });
      } else {
        const updatedItems = state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
        return calculateTotals({ ...state, items: updatedItems });
      }
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// 合計値を計算するヘルパー関数
const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  return {
    ...state,
    totalItems,
    totalPrice,
  };
};

// Context型定義
interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Context作成
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider コンポーネント
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// カスタムフック
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
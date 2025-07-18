/**
 * 商品の型定義
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

/**
 * カート内アイテムの型定義
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * カート全体の状態の型定義
 */
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

/**
 * カート操作のアクションの型定義
 */
export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number } // productId
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }; 
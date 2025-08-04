// ユーザー登録フォームの型定義
export interface UserRegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  age: number;
  agreeToTerms: boolean;
}

// フォームエラーの型定義
export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  agreeToTerms?: string;
}

// バリデーションスキーマの型定義
export interface ValidationSchema {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  age: number;
  agreeToTerms: boolean;
} 
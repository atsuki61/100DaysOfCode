export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'diners' | 'unknown';

export type ValidationResult = {
  normalized: string; // 数字のみ
  isValidLuhn: boolean;
  brand: CardBrand;
  formatted: string; // 表示用（ブランドごとのグルーピング）
};



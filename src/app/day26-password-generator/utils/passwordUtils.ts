import { PasswordOptions, PasswordStrength } from '../types';

// 文字セットの定義
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * パスワードを生成する
 */
export function generatePassword(options: PasswordOptions): string {
  let chars = '';
  
  // 選択された文字セットを結合
  if (options.includeUppercase) chars += UPPERCASE_CHARS;
  if (options.includeLowercase) chars += LOWERCASE_CHARS;
  if (options.includeNumbers) chars += NUMBER_CHARS;
  if (options.includeSymbols) chars += SYMBOL_CHARS;
  
  // 少なくとも1つの文字セットが選択されていることを確認
  if (chars === '') {
    chars = LOWERCASE_CHARS + NUMBER_CHARS; // デフォルト
  }
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  
  return password;
}

/**
 * パスワードの強度を評価する
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  
  // 長さによる加点
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // 文字種による加点
  if (/[A-Z]/.test(password)) score += 1; // 大文字
  if (/[a-z]/.test(password)) score += 1; // 小文字
  if (/[0-9]/.test(password)) score += 1; // 数字
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // 記号
  
  // 強度ラベルと色を決定
  let label: string;
  let color: string;
  
  if (score <= 2) {
    label = '弱い';
    color = 'text-red-500';
  } else if (score <= 4) {
    label = '普通';
    color = 'text-yellow-500';
  } else if (score <= 6) {
    label = '強い';
    color = 'text-blue-500';
  } else {
    label = '非常に強い';
    color = 'text-green-500';
  }
  
  return { score, label, color };
}

/**
 * クリップボードにコピーする
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('クリップボードへのコピーに失敗しました:', error);
    return false;
  }
} 
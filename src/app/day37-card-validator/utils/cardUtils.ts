import type { CardBrand, ValidationResult } from '../types';

export function normalizeDigits(input: string): string {
  return (input.match(/\d+/g) ?? []).join('');
}

export function detectBrand(digits: string): CardBrand {
  if (/^4\d{12,18}$/.test(digits)) return 'visa';
  if (/^(5[1-5]\d{14}|2(2[2-9]\d{2}|[3-6]\d{3}|7[01]\d{2}|720\d{2})\d{10})$/.test(digits)) return 'mastercard';
  if (/^3[47]\d{13}$/.test(digits)) return 'amex';
  if (/^6(?:011|5\d{2})\d{12}$/.test(digits)) return 'discover';
  if (/^(?:2131|1800|35\d{3})\d{11}$/.test(digits)) return 'jcb';
  if (/^3(?:0[0-5]|[68]\d)\d{11}$/.test(digits)) return 'diners';
  return 'unknown';
}

export function formatByBrand(digits: string, brand: CardBrand): string {
  if (brand === 'amex') {
    return digits.replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/, (_, a, b = '', c = '') => [a, b, c].filter(Boolean).join(' '));
  }
  return digits.replace(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?/, (_, a, b = '', c = '', d = '', e = '') => [a, b, c, d, e].filter(Boolean).join(' '));
}

export function luhnCheck(digits: string): boolean {
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = digits.charCodeAt(i) - 48; // '0' -> 48
    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

export function validateCard(input: string): ValidationResult {
  const normalized = normalizeDigits(input);
  const brand = detectBrand(normalized);
  const formatted = formatByBrand(normalized, brand);
  const isValidLuhn = normalized.length >= 12 && luhnCheck(normalized);
  return { normalized, brand, formatted, isValidLuhn };
}



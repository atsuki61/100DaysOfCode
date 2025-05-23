import React from 'react';

// Buttonコンポーネントのpropsの型定義
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl';
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}) => {
  // --- ボタンの基本的な見た目に関するCSSクラス ---
  // これらはどの種類のボタンにも共通で適用されるスタイルです。
  // ring-offset-background, focus-visible:ring-ring などのクラスは、
  // CSS変数 (--background, --ringなど) を通じて色が定義されることを期待します。
  let baseClasses = `
    inline-flex items-center justify-center rounded-md
    text-sm font-medium transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    ring-offset-background
  `;

  // --- ボタンの種類 (variant) に応じたCSSクラス ---
  // bg-primary, text-primary-foreground などのクラスは、
  // CSS変数 (--primary, --primary-foregroundなど) を通じて色が定義されることを期待します。
  let variantClasses = "";
  switch (variant) {
    case 'destructive':
      variantClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      break;
    case 'outline':
      variantClasses = "border border-input hover:bg-accent hover:text-accent-foreground";
      break;
    case 'secondary':
      variantClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case 'ghost':
      variantClasses = "hover:bg-accent hover:text-accent-foreground";
      break;
    case 'link':
      variantClasses = "text-primary underline-offset-4 hover:underline";
      break;
    default: // 'default' variant (標準のボタン、プライマリボタンとも呼ばれます)
      variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
      break;
  }

  // --- ボタンの大きさ (size) に応じたCSSクラス ---
  let sizeClasses = "";
  switch (size) {
    case 'sm':
      sizeClasses = "h-9 px-3"; // 高さ9, 横パディング3
      break;
    case 'lg':
      sizeClasses = "h-11 px-8"; // 高さ11, 横パディング8
      break;
    case 'xl': // xlサイズ定義
      sizeClasses = "h-14 px-10 text-lg"; // 高さ14, 横パディング10, 文字サイズlg
      break;
    case 'icon':
      sizeClasses = "h-10 w-10"; // 高さ10, 幅10
      break;
    default: // 'default' size (標準の大きさのボタン)
      sizeClasses = "h-10 py-2 px-4"; // 高さ10, 縦パディング2, 横パディング4
      break;
  }

  // themeReplacements関数を削除したため、クラス名を直接結合します。
  // Tailwind CSS v4では、これらのクラス (例: bg-primary) が
  // CSSファイル内の @theme 定義やCSS変数を参照して解決されることを期待します。
  const finalClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button onClick={onClick} className={finalClassName.trim().replace(/\s+/g, ' ')} {...props}>
      {children}
    </button>
  );
};

export default Button; 
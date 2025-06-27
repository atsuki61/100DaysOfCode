# Day 12: ダークモード切替アプリ

## 📝 今日学んだこと

### Context API によるグローバル状態管理
- `createContext` と `useContext` を使用したテーマ状態の管理
- Provider パターンによる状態の共有
- TypeScript での Context の型定義

### Tailwind CSS のダークモード機能
- `dark:` プレフィックスを使用したダークモード対応スタイリング
- `class` ストラテジーによるテーマ切り替え
- トランジションエフェクトによるスムーズな切り替え

### localStorage による永続化
- ブラウザの localStorage への設定保存
- 次回訪問時の設定復元
- SSR 対応のための条件分岐

### システムテーマとの連携
- `prefers-color-scheme` メディアクエリの活用
- OS の設定との自動同期
- システムテーマ変更の監視

## 🛠️ 使用した技術

- **React Context API**: グローバル状態管理
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: ダークモード対応のスタイリング
- **localStorage**: 設定の永続化
- **Web APIs**: `matchMedia`, `prefers-color-scheme`

## 📁 ファイル構成

```
day12-darkmode/
├── contexts/
│   └── ThemeContext.tsx     # テーマ管理のContext
├── components/
│   ├── ThemeToggle.tsx      # テーマ切り替えボタン
│   └── DemoCard.tsx         # テーマデモ表示
├── types.ts                 # 型定義
├── layout.tsx              # レイアウト
├── page.tsx                # メインページ
└── day12.md                # 学習記録
```

## 🎯 実装のポイント

### 1. Context Provider の実装
```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  // ...
}
```

### 2. システムテーマの検出
```typescript
const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
```

### 3. HTML クラスの動的更新
```typescript
const root = window.document.documentElement;
root.classList.remove('light', 'dark');
root.classList.add(resolved);
```

### 4. Tailwind CSS のダークモード記法
```css
/* ライトモード */
bg-white text-gray-900

/* ダークモード */
dark:bg-gray-800 dark:text-white
```

## 🔄 テーマ切り替えの流れ

1. ユーザーがテーマボタンをクリック
2. Context の `setTheme` 関数が呼ばれる
3. localStorage に設定を保存
4. HTML の class 属性を更新
5. Tailwind CSS がスタイルを適用
6. UI が即座に更新される

## 🎨 UI/UX の工夫

- **直感的なアイコン**: ☀️ (ライト)、🌙 (ダーク)、💻 (システム)
- **スムーズなトランジション**: `transition-all duration-200`
- **状態の視覚的フィードバック**: 選択中のテーマにチェックマーク
- **アクセシビリティ**: キーボード操作対応、適切なコントラスト

## 🚀 今後の改善案

- [ ] **カスタムテーマ**: ユーザー定義のカラーテーマ
- [ ] **アニメーション強化**: より滑らかなテーマ切り替え
- [ ] **テーマプリセット**: 複数のダークテーマバリエーション
- [ ] **スケジュール機能**: 時間帯に応じた自動切り替え
- [ ] **コンポーネント化**: 他のページでも使える汎用的なテーマシステム

## 💡 学習のポイント

- **グローバル状態管理**: Context API の適切な使い方を理解
- **ダークモード実装**: 現代的な Web アプリの必須機能
- **ユーザー体験**: 設定の永続化とシステム連携の重要性
- **CSS フレームワーク**: Tailwind CSS の高度な機能活用

## 🎓 次のステップ

明日は **Day 13: 電卓アプリ** で、複数状態の管理と計算ロジックについて学習予定です。 
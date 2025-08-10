# 技術スタック

## コア技術
- TypeScript: ^5 (from package.json)
- Node.js: ^20 (from package.json @types/node)

## フロントエンド
- Next.js: 15.3.2 (from package.json)
- React: ^19.0.0 (from package.json)
- Tailwind CSS: ^4 (from package.json, postcss.config.mjs)
- shadcn/ui
## バックエンド
- (特になし)

## 開発ツール
- npm (Node.jsに同梱)
- ESLint: ^9 (from package.json, eslint.config.mjs)
  - eslint-config-next
  - eslint-config-prettier
- Prettier (from .prettierrc.json)
  - prettier-plugin-tailwindcss
- TypeScript: ^5 (from package.json)

---

# API バージョン管理
## 重要な制約事項
- (プロジェクト固有のAPI管理ルールがあればここに記載)

## 実装規則
- (プロジェクト固有のAPI実装ルールがあればここに記載)

---

# コーディングスタイル指針（TypeScript）

## any 禁止ポリシー
- 原則として `any` の使用を禁止します。型安全性を損ね、バグの温床になるためです。
- 例外（やむを得ない一時利用）の場合は、対象行に限定した無効化と理由コメントを必須とします。
  - 例: `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ライブラリ型未整備のため暫定。Issue #123 で解消予定`

## 代替指針（any の代わりに使うもの）
- 値の型がまだ不明: `unknown`
- 到達不能/ありえない分岐: `never`
- 任意のオブジェクト: `Record<string, unknown>`
- ジェネリクスの既定値: `T = unknown`

## 例外・外部入力の扱い
- 例外は `catch (e: unknown)` とし、利用前に型ガードで絞り込みます。
  ```ts
  try { /* ... */ }
  catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error('Unknown error', e);
    }
  }
  ```
- 外部APIやサードパーティの入力は一旦 `unknown` とし、スキーマバリデーション（例: Zod）または型ガードで検証後に使用します。

## レビュー観点チェックリスト
- `any` を使っていないか？
- `catch` が `unknown` で適切に型ガードされているか？
- 外部入力に対し、検証（スキーマ or 型ガード）が行われているか？
- ジェネリクスの既定値に `any` を使っていないか？

## ESLint 設定（参考）
プロジェクトでは `@typescript-eslint/no-explicit-any` を有効化します。必要に応じて以下設定を利用してください。
```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": ["error", { "fixToUnknown": true, "ignoreRestArgs": false }]
  }
}
```
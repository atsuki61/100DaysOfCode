# Day16: 音楽検索アプリ

## 📝 プロジェクト概要

**音楽検索アプリ**は、iTunes Search APIを使用してアーティスト名、曲名、アルバム名で音楽を検索し、結果一覧を表示するWebアプリケーションです。検索結果から音楽のプレビューを試聴したり、iTunesで購入することもできます。

## 🎯 学習目標

1. **外部API連携**: iTunes Search APIを使用した動的データ取得
2. **JSON レスポンス処理**: 複雑なAPIレスポンスの型定義と処理
3. **ユーザビリティ**: 検索機能、ローディング状態、エラーハンドリング
4. **メディア制御**: 音声プレビューの再生・停止機能
5. **レスポンシブデザイン**: モバイルフレンドリーなUI設計

## 🔧 技術仕様

### 使用技術
- **React 19**: UI作成とコンポーネント設計
- **Next.js 15**: App Routerによるページ構造
- **TypeScript**: 型安全なAPIレスポンス処理
- **Tailwind CSS 4**: レスポンシブなスタイリング
- **iTunes Search API**: 音楽データの外部API

### APIエンドポイント
```
GET https://itunes.apple.com/search?term={検索語}&media={メディアタイプ}&limit={件数}
```

## 🏗️ プロジェクト構造

```
src/app/day16-music-search/
├── page.tsx              # メインページ（検索とUI制御）
├── layout.tsx            # レイアウト設定
├── types.ts              # TypeScript型定義
├── utils/
│   └── musicApi.ts       # iTunes API呼び出し関数
├── components/
│   ├── SearchBar.tsx     # 検索バーコンポーネント
│   ├── MusicCard.tsx     # 音楽カードコンポーネント
│   ├── ErrorMessage.tsx  # エラー表示コンポーネント
│   ├── LoadingSpinner.tsx # ローディング表示
│   ├── ResultsInfo.tsx   # 検索結果情報
│   └── index.ts          # コンポーネントエクスポート
└── day16.md              # 学習ドキュメント
```

## 📚 実装のポイント

### 1. iTunes Search API連携

iTunes Search APIは、Appleが提供する無料のRESTful APIです。認証なしで使用でき、音楽、映画、TV番組、アプリなどを検索できます。

```typescript
// 基本的な検索URL構造
const ITUNES_API_BASE_URL = 'https://itunes.apple.com/search';

export async function searchMusic(params: SearchParams): Promise<iTunesSearchResponse> {
  const searchParams = new URLSearchParams();
  searchParams.append('term', params.term);
  if (params.media) searchParams.append('media', params.media);
  if (params.limit) searchParams.append('limit', params.limit.toString());
  
  const url = `${ITUNES_API_BASE_URL}?${searchParams.toString()}`;
  const response = await fetch(url);
  return response.json();
}
```

### 2. TypeScript型定義

APIレスポンスの複雑な構造を型安全に扱うため、詳細な型定義を作成しました。

```typescript
export interface iTunesItem {
  wrapperType: 'track' | 'collection' | 'artist';
  kind: 'song' | 'music-video' | 'album' | 'artist';
  artistName?: string;
  collectionName?: string;
  trackName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackPrice?: number;
  trackTimeMillis?: number;
  primaryGenreName?: string;
  // ... その他のフィールド
}
```

### 3. 状態管理

検索状態、ローディング状態、エラー状態を統合的に管理：

```typescript
const [searchState, setSearchState] = useState<SearchState>({
  isLoading: false,
  error: null,
  results: [],
  totalResults: 0,
  currentPage: 1,
  searchTerm: '',
  hasSearched: false
});
```

### 4. 音声プレビュー機能

HTML5のAudio APIを使用したプレビュー再生：

```typescript
const togglePreview = () => {
  if (!item.previewUrl) return;

  if (isPlaying && audio) {
    audio.pause();
    setIsPlaying(false);
  } else {
    const newAudio = new Audio(item.previewUrl);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    
    newAudio.onended = () => {
      setIsPlaying(false);
    };
  }
};
```

## 🔍 コンポーネント解説

### SearchBar.tsx
- フォーム送信処理
- メディアタイプ選択（音楽、映画、ポッドキャストなど）
- ローディング状態に応じたUI制御
- 検索のヒント表示

### MusicCard.tsx
- アートワーク画像の表示（フォールバック付き）
- アーティスト名、曲名、アルバム名の表示
- プレビュー再生/停止ボタン
- iTunesで開くリンク
- 価格情報の表示

### ErrorMessage.tsx
- エラーメッセージの表示
- 再試行ボタン
- ユーザーフレンドリーなエラー表示

### LoadingSpinner.tsx
- ダブルスピナーアニメーション
- ドットバウンスアニメーション
- カスタマイズ可能なメッセージ

### ResultsInfo.tsx
- 検索語と結果件数の表示
- 検索結果が0件の場合の案内
- 検索改善のためのヒント

## 🎨 UI/UXの工夫

1. **レスポンシブデザイン**: モバイルからデスクトップまで対応
2. **直感的な操作**: 分かりやすいアイコンとボタン
3. **視覚的フィードバック**: ローディング、ホバー効果
4. **エラーハンドリング**: 親切なエラーメッセージと対処法
5. **アクセシビリティ**: ラベル、alt属性、フォーカス管理

## 📖 学習のポイント

### 外部API連携の基本
1. **URL構築**: URLSearchParamsを使用した動的クエリ作成
2. **エラーハンドリング**: ネットワークエラー、APIエラーの適切な処理
3. **型安全性**: TypeScriptによるAPIレスポンスの型定義

### 状態管理の実践
1. **複合状態**: 複数の状態を統合的に管理
2. **非同期処理**: async/awaitとエラーハンドリング
3. **useCallback**: パフォーマンス最適化

### メディア制御
1. **Audio API**: HTMLAudioElementの基本的な制御
2. **状態同期**: 音声再生状態とUIの同期
3. **リソース管理**: メモリリークを防ぐための適切なクリーンアップ

## 🚀 発展的な学習課題

1. **ページネーション**: 大量の検索結果を分割表示
2. **検索履歴**: localStorage を使用した検索履歴の保存
3. **お気に入り機能**: 気に入った音楽をブックマーク
4. **フィルタリング**: ジャンル、価格範囲での絞り込み
5. **ソート機能**: 価格、リリース日、人気度でのソート

## 💡 実際の開発での応用

- **音楽ストリーミングサービス**: Spotify、Apple Music風アプリ
- **ECサイト**: 商品検索とフィルタリング機能
- **メディアライブラリ**: 動画、音楽、電子書籍の統合検索
- **レコメンドシステム**: 類似アーティストや楽曲の提案

## 📝 次のステップ

Day16では外部APIの基本的な利用方法を学びました。次回以降は以下のようなより高度な機能に挑戦できます：

- **認証が必要なAPI**: OAuth、JWTトークンの処理
- **リアルタイムデータ**: WebSocketを使用したライブ更新
- **キャッシュ戦略**: APIレスポンスの効率的なキャッシュ
- **無限スクロール**: IntersectionObserver APIの活用

外部APIと連携するWebアプリケーションの基礎がしっかりと身につきました！ 
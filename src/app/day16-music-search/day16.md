# Day16: 音楽検索アプリ

## 📝 プロジェクト概要

**音楽検索アプリ**は、iTunes Search APIを使用してアーティスト名、曲名、アルバム名で音楽を検索し、結果一覧を表示するWebアプリケーションです。検索結果から音楽のプレビューを試聴したり、iTunesで購入することもできます。

## 🎯 学習目標

1.  **外部API連携**: iTunes Search APIを使用した動的データ取得
2.  **JSON レスポンス処理**: 複雑なAPIレスポンスの型定義と処理
3.  **ユーザビリティ**: 検索機能、ローディング状態、エラーハンドリング
4.  **メディア制御**: 音声プレビューの再生・停止機能
5.  **レスポンシブデザイン**: モバイルフレンドリーなUI設計

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
  // HTTPステータスコードが200番台以外の場合、エラーをスロー
  if (!response.ok) {
    throw new Error(`APIリクエストに失敗しました: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
```
**解説**:
`searchMusic`関数は、ユーザーが入力した検索条件（`params`）を受け取り、`URLSearchParams`を使ってAPIリクエストのクエリパラメータを動的に構築します。例えば、`params.term`が"Queen"、`params.media`が"music"の場合、`https://itunes.apple.com/search?term=Queen&media=music`のようなURLが生成されます。`fetch`関数でこのURLにリクエストを送信し、レスポンスをJSON形式で返します。`response.ok`でHTTPステータスコードをチェックし、エラーが発生した場合は適切なエラーメッセージをスローすることで、呼び出し元でのエラーハンドリングを可能にしています。

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

export interface iTunesSearchResponse {
  resultCount: number;
  results: iTunesItem[];
}

export interface SearchParams {
  term: string;
  media?: string;
  limit?: number;
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: iTunesItem[];
  totalResults: number;
  currentPage: number;
  searchTerm: string;
  hasSearched: boolean;
}
```
**解説**:
`types.ts`ファイルでは、APIから返されるデータの構造を正確に表現するために、`iTunesItem`（個々の検索結果アイテムの型）や`iTunesSearchResponse`（APIレスポンス全体の型）などのインターフェースを定義しています。これにより、コード内でAPIレスポンスのプロパティにアクセスする際に、TypeScriptの強力な型チェック機能が働き、存在しないプロパティへのアクセスや型の不一致によるバグを開発段階で発見できます。また、`SearchParams`や`SearchState`のように、アプリケーション内部で使用する状態や引数の型も定義することで、コード全体の可読性と保守性が向上します。

### 3. 状態管理

検索状態、ローディング状態、エラー状態を統合的に管理：

```typescript
// src/app/day16-music-search/page.tsx (抜粋)
const [searchState, setSearchState] = useState<SearchState>({
  isLoading: false,
  error: null,
  results: [],
  totalResults: 0,
  currentPage: 1,
  searchTerm: '',
  hasSearched: false
});

const handleSearch = useCallback(async (term: string) => {
  // 検索開始時にローディング状態をtrueにし、エラーをクリア
  setSearchState(prev => ({ ...prev, isLoading: true, error: null, hasSearched: true }));
  try {
    const data = await searchMusic({ term, media: 'music', limit: 25 });
    // 検索成功時に結果と関連情報を更新し、ローディング状態をfalseに
    setSearchState(prev => ({
      ...prev,
      results: data.results,
      totalResults: data.resultCount,
      searchTerm: term,
      isLoading: false,
    }));
  } catch (err) {
    // 検索失敗時にエラーメッセージを設定し、ローディング状態をfalseに
    setSearchState(prev => ({ ...prev, error: '検索中にエラーが発生しました。', isLoading: false }));
  }
}, []); // 依存配列が空なので、コンポーネントのマウント時に一度だけ作成される
```
**解説**:
`page.tsx`では、`useState`フックを使用して`searchState`という単一のオブジェクトで検索に関連する全ての状態（ローディング中か、エラーがあるか、検索結果、総件数など）を一元的に管理しています。これにより、状態が散らばることなく、管理が容易になります。
`handleSearch`関数は`useCallback`でメモ化されており、コンポーネントの再レンダリング時に不必要に再生成されるのを防ぎ、パフォーマンスを最適化しています。この関数内で`async/await`を使って非同期のAPI呼び出しを行い、APIリクエストの開始、成功、失敗に応じて`searchState`を適切に更新しています。これにより、ユーザーインターフェースは常に最新のアプリケーションの状態（データ取得中、エラー発生、結果表示など）を正確に反映します。

### 4. 音声プレビュー機能

HTML5のAudio APIを使用したプレビュー再生：

```typescript
// src/app/day16-music-search/components/MusicCard.tsx (抜粋)
const [isPlaying, setIsPlaying] = useState(false); // 再生状態を管理
const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Audioオブジェクトを保持

const togglePreview = () => {
  if (!item.previewUrl) return; // プレビューURLがない場合は何もしない

  if (isPlaying && audio) {
    audio.pause(); // 再生中なら停止
    setIsPlaying(false); // 状態を更新
  } else {
    const newAudio = new Audio(item.previewUrl); // 新しいAudioオブジェクトを作成
    newAudio.play(); // 再生開始
    setAudio(newAudio); // Audioオブジェクトを状態に保存
    setIsPlaying(true); // 状態を更新
    
    newAudio.onended = () => { // 再生終了時のイベントリスナー
      setIsPlaying(false); // 再生終了時に状態を更新
    };
  }
};
```
**解説**:
`MusicCard.tsx`では、`useState`フックを使って`isPlaying`（現在再生中か否か）と`audio`（`HTMLAudioElement`のインスタンス）の状態を管理しています。`togglePreview`関数は、ユーザーがプレビューボタンをクリックした際に呼び出されます。
この関数は、`new Audio(item.previewUrl)`を使って`HTMLAudioElement`のインスタンスを生成し、`play()`メソッドで音声の再生を開始します。既に再生中の場合は`pause()`で停止します。
`newAudio.onended`イベントリスナーを設定することで、音声の再生が終了した際に自動的に`isPlaying`状態を`false`に戻し、UI上の再生/停止ボタンの表示を適切に切り替えます。これにより、ユーザーは直感的にプレビューの再生と停止を制御でき、アプリケーションはメディアリソースを効率的に管理できます。

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

1.  **レスポンシブデザイン**: モバイルからデスクトップまで対応
2.  **直感的な操作**: 分かりやすいアイコンとボタン
3.  **視覚的フィードバック**: ローディング、ホバー効果
4.  **エラーハンドリング**: 親切なエラーメッセージと対処法
5.  **アクセシビリティ**: ラベル、alt属性、フォーカス管理

## 📖 学習のポイント

### 外部API連携の基本
1.  **URL構築**: `URLSearchParams`を使用した動的クエリ作成
    *   `URLSearchParams`を使うことで、クエリパラメータのエンコードや結合を自動で行ってくれるため、手動で文字列を結合するよりも安全で効率的です。これにより、特殊文字を含む検索語でも正しくAPIに渡すことができます。
2.  **エラーハンドリング**: ネットワークエラー、APIエラーの適切な処理
    *   `fetch` APIの`response.ok`プロパティを使ってHTTPステータスコードが成功（200番台）かどうかを判断し、それ以外の場合はエラーをスローすることで、ネットワークの問題やAPIからのエラーレスポンスを早期に検知し、ユーザーに適切なフィードバックを提供できます。`try-catch`ブロックと組み合わせることで、堅牢な非同期処理を実現します。
3.  **型安全性**: TypeScriptによるAPIレスポンスの型定義
    *   APIから返されるJSONデータの構造を`interface`として事前に定義することで、開発中にデータの型が保証され、存在しないプロパティへのアクセスや誤った型の使用を防ぎます。これにより、実行時エラーを減らし、コードの予測可能性と保守性を高めます。エディタの自動補完機能も活用でき、開発効率が向上します。

### 状態管理の実践
1.  **複合状態**: 複数の状態を統合的に管理
    *   関連する複数の状態（例: `isLoading`, `error`, `results`）を一つのオブジェクトとして`useState`で管理することで、状態の更新が容易になり、コードの可読性が向上します。これにより、状態間の整合性を保ちやすくなります。
2.  **非同期処理**: `async/await`とエラーハンドリング
    *   `async/await`構文を使用することで、非同期処理（API呼び出しなど）を同期的なコードのように記述でき、可読性が大幅に向上します。`try-catch`と組み合わせることで、非同期処理中のエラーを効果的に捕捉し、アプリケーションの安定性を保ちます。
3.  **`useCallback`**: パフォーマンス最適化
    *   `useCallback`フックは、関数をメモ化（キャッシュ）し、依存配列が変更されない限り同じ関数インスタンスを返します。これにより、親コンポーネントが再レンダリングされても、子コンポーネントに渡される関数プロップが不必要に変わることがなく、子コンポーネントの不要な再レンダリングを防ぎ、アプリケーション全体のパフォーマンスを向上させます。

### メディア制御
1.  **Audio API**: `HTMLAudioElement`の基本的な制御
    *   ブラウザに組み込まれている`Audio`オブジェクト（`HTMLAudioElement`）を使用することで、JavaScriptから直接音声ファイルをロードし、再生、一時停止、音量調整などの基本的なメディア操作を行うことができます。これにより、カスタムのメディアプレイヤー機能を実装する基盤となります。
2.  **状態同期**: 音声再生状態とUIの同期
    *   `useState`フックで音声の再生状態（例: `isPlaying`）を管理し、この状態に基づいてUI（例: 再生/停止ボタンのアイコンやテキスト）を動的に変更することで、ユーザーは現在のメディアの状態を視覚的に把握できます。これにより、ユーザー体験が向上します。
3.  **リソース管理**: メモリリークを防ぐための適切なクリーンアップ
    *   `Audio`オブジェクトの`onended`イベントリスナーを活用し、音声の再生が終了した際に`isPlaying`状態をリセットするなど、不要になったリソースを適切にクリーンアップすることで、メモリリークを防ぎ、アプリケーションの安定性とパフォーマンスを維持します。

## 🚀 発展的な学習課題

1.  **ページネーション**: 大量の検索結果を分割表示
2.  **検索履歴**: `localStorage` を使用した検索履歴の保存
3.  **お気に入り機能**: 気に入った音楽をブックマーク
4.  **フィルタリング**: ジャンル、価格範囲での絞り込み
5.  **ソート機能**: 価格、リリース日、人気度でのソート

## 💡 実際の開発での応用

-   **音楽ストリーミングサービス**: Spotify、Apple Music風アプリ
-   **ECサイト**: 商品検索とフィルタリング機能
-   **メディアライブラリ**: 動画、音楽、電子書籍の統合検索
-   **レコメンドシステム**: 類似アーティストや楽曲の提案

## 📝 次のステップ

Day16では外部APIの基本的な利用方法を学びました。次回以降は以下のようなより高度な機能に挑戦できます：

-   **認証が必要なAPI**: OAuth、JWTトークンの処理
-   **リアルタイムデータ**: WebSocketを使用したライブ更新
-   **キャッシュ戦略**: APIレスポンスの効率的なキャッシュ
-   **無限スクロール**: IntersectionObserver APIの活用

外部APIと連携するWebアプリケーションの基礎がしっかりと身につきました！
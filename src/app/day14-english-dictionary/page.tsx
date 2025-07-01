'use client'

import { useDictionary } from './hooks/useDictionary';
import SearchBar from './components/SearchBar';
import WordCard from './components/WordCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

export default function Day14Page() {
  const {
    wordData,
    searchState,
    translationState,
    currentLanguage,
    searchDictionary,
    switchLanguage,
    clearSearch,
    retryTranslation,
    isLoading,
    isError,
    isSuccess,
    canTranslate,
  } = useDictionary();

  const handleRetry = () => {
    if (searchState.lastSearchedWord) {
      searchDictionary(searchState.lastSearchedWord);
    }
  };

  return (
    <div className="py-8 px-4"> {/* 縦方向パディング8, 横方向パディング4 */}
      <div className="max-w-6xl mx-auto"> {/* 最大横幅6xl, 中央寄せ */}
        
        {/* アプリの説明 */}
        <div className="text-center mb-12"> {/* 中央揃え, 下マージン12 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-3xl"> {/* 白背景, 角丸2xl, 影lg, 全方向パディング8, 中央寄せ, 最大横幅3xl */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4"> {/* 文字サイズ3xl, 太字, グレー800文字, 下マージン4 */}
              📚 英単語辞書アプリ
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed"> {/* 文字サイズlg, グレー600文字, 下マージン6, 行間ゆったり */}
              英単語を入力すると、Free Dictionary APIから詳細な意味、発音、例文、同義語・反義語を取得して表示します。
              <br />
              学習目標：外部API利用、非同期データ取得、複雑なJSONデータの表示、ローディング状態の管理
            </p>
            
            {/* 機能の説明 */}
            <div className="grid md:grid-cols-4 gap-4 text-sm"> {/* グリッドレイアウト, md以上で4列, ギャップ4, 文字サイズsm */}
              <div className="bg-blue-50 p-4 rounded-lg text-center"> {/* ブルー50背景, 全方向パディング4, 角丸lg, 中央揃え */}
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-semibold text-blue-800">単語検索</div> {/* 太字, ブルー800文字 */}
                <div className="text-blue-600">英単語を入力して検索</div> {/* ブルー600文字 */}
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center"> {/* グリーン50背景, 全方向パディング4, 角丸lg, 中央揃え */}
                <div className="text-2xl mb-2">📖</div>
                <div className="font-semibold text-green-800">詳細情報</div> {/* 太字, グリーン800文字 */}
                <div className="text-green-600">意味・例文・品詞</div> {/* グリーン600文字 */}
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center"> {/* パープル50背景, 全方向パディング4, 角丸lg, 中央揃え */}
                <div className="text-2xl mb-2">🔉</div>
                <div className="font-semibold text-purple-800">音声再生</div> {/* 太字, パープル800文字 */}
                <div className="text-purple-600">発音を音声で確認</div> {/* パープル600文字 */}
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center"> {/* オレンジ50背景, 全方向パディング4, 角丸lg, 中央揃え */}
                <div className="text-2xl mb-2">🇯🇵</div>
                <div className="font-semibold text-orange-800">日本語翻訳</div> {/* 太字, オレンジ800文字 */}
                <div className="text-orange-600">Gemini APIで翻訳</div> {/* オレンジ600文字 */}
              </div>
            </div>
          </div>
        </div>

        {/* 検索バー */}
        <SearchBar 
          onSearch={searchDictionary} 
          isLoading={isLoading}
        />

        {/* 結果表示エリア */}
        <div className="min-h-[400px]"> {/* 最小高さ400px */}
          {/* 初期状態 */}
          {searchState.status === 'idle' && (
            <div className="text-center py-16"> {/* 中央揃え, 縦方向パディング16 */}
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2"> {/* 文字サイズ2xl, 太字, グレー700文字, 下マージン2 */}
                単語を検索してみましょう
              </h2>
              <p className="text-gray-500"> {/* グレー500文字 */}
                上の検索バーに英単語を入力してください
              </p>
              
              {/* サンプル単語 */}
              <div className="mt-8"> {/* 上マージン8 */}
                <p className="text-sm text-gray-600 mb-3">試してみる単語の例：</p> {/* 文字サイズsm, グレー600文字, 下マージン3 */}
                <div className="flex flex-wrap justify-center gap-2"> {/* Flexコンテナ, 折り返しあり, 中央揃え, ギャップ2 */}
                  {['hello', 'computer', 'beautiful', 'challenge', 'success'].map((word) => (
                    <button
                      key={word}
                      onClick={() => searchDictionary(word)}
                      className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full text-sm transition-colors duration-200" // 横パディング3, 縦パディング1, インディゴ100背景, ホバー時インディゴ200背景, インディゴ700文字, 角丸円形, 文字サイズsm, 色にトランジション */}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ローディング状態 */}
          {isLoading && (
            <LoadingSpinner searchWord={searchState.lastSearchedWord} />
          )}

          {/* エラー状態 */}
          {isError && searchState.error && (
            <ErrorMessage 
              error={searchState.error}
              onRetry={handleRetry}
              lastSearchedWord={searchState.lastSearchedWord}
            />
          )}

          {/* 成功状態 */}
          {isSuccess && wordData && (
            <div className="space-y-6"> {/* 縦方向スペース6 */}
              <WordCard 
                wordData={wordData}
                currentLanguage={currentLanguage}
                translationState={translationState}
                onLanguageSwitch={switchLanguage}
                canTranslate={canTranslate}
                onRetryTranslation={retryTranslation}
              />
              
              {/* 新しい検索を促すボタン */}
              <div className="text-center"> {/* 中央揃え */}
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-medium" // 横パディング6, 縦パディング3, グレー100背景, ホバー時グレー200背景, グレー700文字, 角丸xl, 色にトランジション, 中太字 */}
                >
                  ⬅️ 新しい単語を検索する
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 学習ポイント */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8"> {/* 上マージン16, 白背景, 角丸2xl, 影lg, 全方向パディング8 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center"> {/* 文字サイズ2xl, 太字, グレー800文字, 下マージン6, 中央揃え */}
            🎯 今日学んだこと
          </h2>
          <div className="grid md:grid-cols-2 gap-6"> {/* グリッドレイアウト, md以上で2列, ギャップ6 */}
            <div className="space-y-4"> {/* 縦方向スペース4 */}
              <h3 className="text-lg font-semibold text-indigo-700">技術的な学習</h3> {/* 文字サイズlg, 太字, インディゴ700文字 */}
              <ul className="space-y-2 text-gray-600"> {/* 縦方向スペース2, グレー600文字 */}
                <li>• 外部辞書API（Free Dictionary API）の利用</li>
                <li>• Gemini APIによる翻訳機能の実装</li>
                <li>• 非同期データ取得とエラーハンドリング</li>
                <li>• 複雑なJSONレスポンスの型定義と変換</li>
                <li>• ローディング状態の管理とUX向上</li>
                <li>• Web Audio APIによる音声再生</li>
              </ul>
            </div>
            <div className="space-y-4"> {/* 縦方向スペース4 */}
              <h3 className="text-lg font-semibold text-green-700">React/TypeScriptの練習</h3> {/* 文字サイズlg, 太字, グリーン700文字 */}
              <ul className="space-y-2 text-gray-600"> {/* 縦方向スペース2, グレー600文字 */}
                <li>• カスタムフック（useDictionary）の作成</li>
                <li>• 複数状態管理（検索・翻訳・言語切り替え）</li>
                <li>• コンポーネント分割と関心事の分離</li>
                <li>• TypeScriptでのAPI型定義の実践</li>
                <li>• useCallback による最適化</li>
                <li>• 条件付きレンダリングによる多言語対応</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
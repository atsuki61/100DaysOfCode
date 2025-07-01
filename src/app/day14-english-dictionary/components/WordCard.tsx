'use client'

import { useState } from 'react';
import { WordData, Language, TranslationState } from '../types';
import { getAudioUrl } from '../utils/dictionaryApi';

interface WordCardProps {// 単語カードのprops
  wordData: WordData;
  currentLanguage: Language;
  translationState: TranslationState;
  onLanguageSwitch: (language: Language) => void;// 言語切り替えボタンのクリックイベント
  canTranslate: boolean;// 翻訳可能かどうか
  onRetryTranslation?: () => void;// 翻訳リトライボタンのクリックイベント
}

export default function WordCard({ // 単語カードのコンポーネント
  wordData, // 単語データ
  currentLanguage, // 現在の言語
  translationState, // 翻訳状態
  onLanguageSwitch, // 言語切り替えボタンのクリックイベント
  canTranslate, // 翻訳可能かどうか
  onRetryTranslation // 翻訳リトライボタンのクリックイベント
}: WordCardProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);// 音声再生中かどうか

  const handlePlayAudio = async () => {
    if (isPlayingAudio) return;// 音声再生中の場合は何もしない
    
    setIsPlayingAudio(true);// 音声再生中にする
    try {
      const audioUrl = await getAudioUrl(wordData.word);// 音声データのURLを取得
      if (audioUrl) {
        const audio = new Audio(audioUrl);// 音声データのURLをAudioオブジェクトにする
        audio.onended = () => setIsPlayingAudio(false);// 音声再生終了時に音声再生中を解除
        audio.onerror = () => setIsPlayingAudio(false);// 音声再生エラー時に音声再生中を解除
        await audio.play();// 音声再生
      } else {
        console.log('音声データが見つかりませんでした');
        setIsPlayingAudio(false);// 音声再生中を解除
      }
    } catch (error) {
      console.error('音声再生エラー:', error);
      setIsPlayingAudio(false);// 音声再生中を解除
    }
  };

  // レート制限解除までの残り時間を計算
  const getRemainingTime = () => {
    if (!translationState.rateLimitedUntil) return '';
    const now = new Date();
    const remaining = translationState.rateLimitedUntil.getTime() - now.getTime();
    if (remaining <= 0) return '';
    
    const minutes = Math.ceil(remaining / (1000 * 60));
    return `あと約${minutes}分`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"> {/* 白背景, 角丸2xl, 影xl, 全方向パディング8, 最大横幅4xl, 中央寄せ */}
      {/* 単語ヘッダー */}
      <div className="border-b border-gray-200 pb-6 mb-6"> {/* 下ボーダー, グレー200ボーダー, 下パディング6, 下マージン6 */}
        <div className="flex items-center justify-between flex-wrap gap-4"> {/* Flexコンテナ, アイテム中央寄せ, 両端揃え, 折り返しあり, ギャップ4 */}
          <div className="flex items-center gap-4"> {/* Flexコンテナ, アイテム中央寄せ, ギャップ4 */}
            <h1 className="text-4xl font-bold text-indigo-900 capitalize"> {/* 文字サイズ4xl, 太字, インディゴ900文字, 先頭大文字 */}
              {wordData.word}
            </h1>
            {wordData.phonetic && (
              <span className="text-xl text-gray-600 italic"> {/* 文字サイズxl, グレー600文字, イタリック */}
                {wordData.phonetic}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3"> {/* Flexコンテナ, アイテム中央寄せ, ギャップ3 */}
            {/* 言語切り替えボタン */}
            {(canTranslate || translationState.status === 'rate-limited') && (
              <div className="flex bg-gray-100 rounded-lg p-1"> {/* Flexコンテナ, グレー100背景, 角丸lg, パディング1 */}
                <button
                  onClick={() => onLanguageSwitch('en')}// 英語に切り替える
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentLanguage === 'en'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`} /* 横パディング3, 縦パディング2, 角丸md, 文字サイズsm, 中太字, 色にトランジション */
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => onLanguageSwitch('ja')}
                  disabled={translationState.status === 'translating' || translationState.status === 'rate-limited'}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 ${
                    currentLanguage === 'ja'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`} /* 横パディング3, 縦パディング2, 角丸md, 文字サイズsm, 中太字, 色にトランジション, 無効時不透明度50% */
                >
                  🇯🇵 {translationState.status === 'translating' ? '翻訳中...' : 
                        translationState.status === 'rate-limited' ? '利用制限中' : '日本語'}
                </button>
              </div>
            )}
            
            {/* 音声再生ボタン */}
            <button
              onClick={handlePlayAudio}
              disabled={isPlayingAudio}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors duration-200 disabled:opacity-50" // Flexコンテナ, アイテム中央寄せ, ギャップ2, 横パディング4, 縦パディング2, インディゴ100背景, ホバー時インディゴ200背景, インディゴ700文字, 角丸lg, 色にトランジション, 無効時不透明度50% */}
            >
              <span className="text-lg">{isPlayingAudio ? '🔊' : '🔉'}</span>
              {isPlayingAudio ? '再生中...' : '発音を聞く'}
            </button>
          </div>
        </div>
      </div>

      {/* レート制限エラー表示 */}
      {translationState.status === 'rate-limited' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6"> {/* オレンジ50背景, オレンジ200ボーダー, 角丸xl, 全方向パディング6, 下マージン6 */}
          <div className="flex items-start gap-4"> {/* Flexコンテナ, アイテム開始位置, ギャップ4 */}
            <div className="flex-shrink-0"> {/* 縮小しない */}
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center"> {/* 横幅10, 高さ10, オレンジ100背景, 角丸円形, Flexコンテナ, アイテム中央寄せ(垂直・水平) */}
                <span className="text-xl">⏱️</span>
              </div>
            </div>
            
            <div className="flex-1"> {/* Flex伸長1 */}
              <h3 className="text-lg font-semibold text-orange-800 mb-2"> {/* 文字サイズlg, 太字, オレンジ800文字, 下マージン2 */}
                翻訳機能が一時的に利用できません
              </h3>
              <div className="text-orange-700 mb-4"> {/* オレンジ700文字, 下マージン4 */}
                <p>Gemini APIの利用制限に達しました。{getRemainingTime()}で復旧予定です。</p>
                <p className="text-sm mt-1">現在は英語のみ表示されています。しばらく時間をおいてからお試しください。</p>
              </div>
              
              {onRetryTranslation && (
                <button
                  onClick={onRetryTranslation}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium" // 横パディング4, 縦パディング2, オレンジ600背景, 白文字, 角丸lg, ホバー時オレンジ700背景, フォーカス時アウトラインなし・リング4・オレンジ100リング, 全プロパティトランジション, 中太字 */}
                >
                  🔄 翻訳を再試行
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 品詞別意味・例文セクション */}
      <div className="space-y-8"> {/* 縦方向スペース8 */}
        {(currentLanguage === 'ja' && wordData.japaneseMeanings ? wordData.japaneseMeanings : wordData.meanings).map((meaning, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6"> {/* グレー50背景, 角丸xl, 全方向パディング6 */}
            {/* 品詞タイトル */}
            <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2"> {/* 文字サイズxl, 太字, インディゴ700文字, 下マージン4, 下ボーダー, インディゴ200ボーダー, 下パディング2 */}
              {index + 1}. {meaning.partOfSpeech}
            </h2>
            
            {/* 意味 */}
            <div className="mb-6"> {/* 下マージン6 */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">・意味</h3>
              <div className="ml-4 space-y-2"> {/* 左マージン4, 縦方向スペース2 */}
                {meaning.definitions.map((definition, defIndex) => (
                  <div key={defIndex} className="flex items-start gap-3"> {/* Flexコンテナ, アイテム開始位置, ギャップ3 */}
                    <span className="text-indigo-600 font-bold text-sm mt-1"> {/* インディゴ600文字, 太字, 文字サイズsm, 上マージン1 */}
                      {defIndex + 1}.
                    </span>
                    <span className="text-gray-700 leading-relaxed"> {/* グレー700文字, 行間ゆったり */}
                      {definition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* この品詞の例文 */}
            {wordData.examples.length > 0 && (
              <div className="mb-4"> {/* 下マージン4 */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">・例文</h3>
                <div className="ml-4 space-y-4"> {/* 左マージン4, 縦方向スペース4 */}
                  {wordData.examples.slice(index * 2, (index + 1) * 2).map((example, exampleIndex) => {
                    const japaneseExample = currentLanguage === 'ja' && wordData.japaneseExamples 
                      ? wordData.japaneseExamples[index * 2 + exampleIndex] 
                      : null;
                    
                    return (
                      <div key={exampleIndex} className="bg-white p-4 rounded-lg border border-gray-200"> {/* 白背景, 全方向パディング4, 角丸lg, グレー200ボーダー */}
                        <div className="text-gray-800 mb-2 font-medium"> {/* グレー800文字, 下マージン2, 中太字 */}
                          ・{example}
                        </div>
                        {japaneseExample && currentLanguage === 'ja' && (
                          <div className="text-indigo-700 text-sm"> {/* インディゴ700文字, 文字サイズsm */}
                            → {japaneseExample}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 
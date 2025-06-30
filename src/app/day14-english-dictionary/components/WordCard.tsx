'use client'

import { useState } from 'react';
import { WordData, Language, TranslationState } from '../types';
import { getAudioUrl } from '../utils/dictionaryApi';

interface WordCardProps {
  wordData: WordData;
  currentLanguage: Language;
  translationState: TranslationState;
  onLanguageSwitch: (language: Language) => void;
  canTranslate: boolean;
}

export default function WordCard({ 
  wordData, 
  currentLanguage, 
  translationState, 
  onLanguageSwitch, 
  canTranslate 
}: WordCardProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // デバッグ用ログ
  console.log('WordCard DEBUG:', {
    canTranslate,
    currentLanguage,
    translationState,
    hasWordData: !!wordData,
    wordDataKeys: wordData ? Object.keys(wordData) : []
  });

  const handlePlayAudio = async () => {
    if (isPlayingAudio) return;
    
    setIsPlayingAudio(true);
    try {
      const audioUrl = await getAudioUrl(wordData.word);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => setIsPlayingAudio(false);
        await audio.play();
      } else {
        console.log('音声データが見つかりませんでした');
        setIsPlayingAudio(false);
      }
    } catch (error) {
      console.error('音声再生エラー:', error);
      setIsPlayingAudio(false);
    }
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
            {true && (
              <div className="flex bg-gray-100 rounded-lg p-1"> {/* Flexコンテナ, グレー100背景, 角丸lg, パディング1 */}
                <button
                  onClick={() => onLanguageSwitch('en')}
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
                  disabled={translationState.status === 'translating'}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 ${
                    currentLanguage === 'ja'
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`} /* 横パディング3, 縦パディング2, 角丸md, 文字サイズsm, 中太字, 色にトランジション, 無効時不透明度50% */
                >
                  🇯🇵 {translationState.status === 'translating' ? '翻訳中...' : '日本語'}
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

      {/* 意味セクション */}
      <div className="mb-8"> {/* 下マージン8 */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2"> {/* 文字サイズ2xl, 太字, グレー800文字, 下マージン4, Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
          📖 意味
        </h2>
        <div className="space-y-6"> {/* 縦方向スペース6 */}
          {(currentLanguage === 'ja' && wordData.japaneseMeanings ? wordData.japaneseMeanings : wordData.meanings).map((meaning, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-5"> {/* グレー50背景, 角丸xl, 全方向パディング5 */}
              <h3 className="text-lg font-semibold text-indigo-700 mb-3 capitalize"> {/* 文字サイズlg, 太字, インディゴ700文字, 下マージン3, 先頭大文字 */}
                {meaning.partOfSpeech} ({meaning.definitions.length}個の定義)
              </h3>
              <ul className="space-y-2"> {/* 縦方向スペース2 */}
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex} className="flex items-start gap-3"> {/* Flexコンテナ, アイテム開始位置, ギャップ3 */}
                    <span className="text-indigo-500 font-bold mt-1 text-sm"> {/* インディゴ500文字, 太字, 上マージン1, 文字サイズsm */}
                      {defIndex + 1}.
                    </span>
                    <span className="text-gray-700 leading-relaxed"> {/* グレー700文字, 行間ゆったり */}
                      {definition}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 例文セクション */}
      {((currentLanguage === 'ja' && wordData.japaneseExamples) || wordData.examples).length > 0 && (
        <div className="mb-8"> {/* 下マージン8 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2"> {/* 文字サイズ2xl, 太字, グレー800文字, 下マージン4, Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
            💬 例文
          </h2>
          <div className="space-y-3"> {/* 縦方向スペース3 */}
            {(currentLanguage === 'ja' && wordData.japaneseExamples ? wordData.japaneseExamples : wordData.examples).map((example, index) => (
              <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg"> {/* ブルー50背景, 左ボーダー4, ブルー400ボーダー, 全方向パディング4, 右角丸lg */}
                                 <p className="text-gray-700 italic"> {/* グレー700文字, イタリック */}
                   &ldquo;{example}&rdquo;
                 </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 同義語・反義語セクション */}
      <div className="grid md:grid-cols-2 gap-6"> {/* グリッドレイアウト, md以上で2列, ギャップ6 */}
        {/* 同義語 */}
        {((currentLanguage === 'ja' && wordData.japaneseSynonyms) || wordData.synonyms).length > 0 && (
          <div className="bg-green-50 rounded-xl p-5"> {/* グリーン50背景, 角丸xl, 全方向パディング5 */}
            <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2"> {/* 文字サイズlg, 太字, グリーン700文字, 下マージン3, Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
              ✅ 同義語
            </h3>
            <div className="flex flex-wrap gap-2"> {/* Flexコンテナ, 折り返しあり, ギャップ2 */}
              {(currentLanguage === 'ja' && wordData.japaneseSynonyms ? wordData.japaneseSynonyms : wordData.synonyms).map((synonym, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium" // 横パディング3, 縦パディング1, グリーン200背景, グリーン800文字, 角丸円形, 文字サイズsm, 中太字 */}
                >
                  {synonym}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 反義語 */}
        {((currentLanguage === 'ja' && wordData.japaneseAntonyms) || wordData.antonyms).length > 0 && (
          <div className="bg-red-50 rounded-xl p-5"> {/* レッド50背景, 角丸xl, 全方向パディング5 */}
            <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2"> {/* 文字サイズlg, 太字, レッド700文字, 下マージン3, Flexコンテナ, アイテム中央寄せ, ギャップ2 */}
              ❌ 反義語
            </h3>
            <div className="flex flex-wrap gap-2"> {/* Flexコンテナ, 折り返しあり, ギャップ2 */}
              {(currentLanguage === 'ja' && wordData.japaneseAntonyms ? wordData.japaneseAntonyms : wordData.antonyms).map((antonym, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm font-medium" // 横パディング3, 縦パディング1, レッド200背景, レッド800文字, 角丸円形, 文字サイズsm, 中太字 */}
                >
                  {antonym}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
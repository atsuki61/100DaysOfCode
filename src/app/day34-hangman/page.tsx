'use client';

import { useMemo, useState } from 'react';

const WORDS = [
  'react',
  'nextjs',
  'typescript',
  'tailwind',
  'component',
  'function',
  'variable',
  'interface',
  'context',
  'state',
] as const;

type GameStatus = 'playing' | 'won' | 'lost';

function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function HangmanPage() {
  const [answer, setAnswer] = useState<string>(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const maxWrong = 6;

  const maskedWord = useMemo(() => {
    return answer
      .split('')
      .map((ch) => (guessedLetters.has(ch) ? ch : '_'))
      .join(' ');
  }, [answer, guessedLetters]);

  const status: GameStatus = useMemo(() => {
    const allRevealed = answer.split('').every((ch) => guessedLetters.has(ch));
    if (allRevealed) return 'won';
    if (wrongGuesses >= maxWrong) return 'lost';
    return 'playing';
  }, [answer, guessedLetters, wrongGuesses]);

  function onGuess(letter: string) {
    if (status !== 'playing' || guessedLetters.has(letter)) return;
    setGuessedLetters((prev) => new Set(prev).add(letter));
    if (!answer.includes(letter)) {
      setWrongGuesses((n) => n + 1);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const k = e.key.toLowerCase();
    if (/^[a-z]$/.test(k)) onGuess(k);
  }

  function resetGame() {
    setAnswer(getRandomWord());
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="max-w-3xl mx-auto px-4 pb-28" onKeyDown={onKeyDown} tabIndex={0}> {/* 最大幅3xl, 中央寄せ, 横余白, フッター分の下余白 */}
      <section className="bg-white rounded-xl shadow p-6 mt-6"> {/* 白背景, 角丸, 影, パディング, 上余白 */}
        <div className="flex flex-col md:flex-row gap-6 items-center"> {/* 縦→mdで横並び, 余白, 中央寄せ */}
          <HangmanDrawing wrongGuesses={wrongGuesses} />
          <div className="flex-1 w-full">
            <p className="text-sm text-gray-500 mb-2"> {/* 小さめ文字, 灰色, 下余白 */}
              残りミス: {Math.max(0, maxWrong - wrongGuesses)} / {maxWrong}
            </p>
            <p className="font-mono text-2xl sm:text-3xl tracking-widest text-gray-800 mb-4"> {/* 等幅, 文字サイズ可変, 文字間広め, 灰黒, 下余白 */}
              {maskedWord}
            </p>
            <Keyboard
              alphabet={alphabet}
              guessed={guessedLetters}
              disabled={status !== 'playing'}
              onGuess={onGuess}
            />
            {status !== 'playing' && (
              <div className="mt-6 flex flex-wrap items-center gap-3"> {/* 上余白, 折返し, 中央寄せ, ギャップ */}
                <span
                  className={
                    status === 'won'
                      ? 'text-green-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  }
                >
                  {status === 'won' ? 'クリア！🎉 単語を当てました。' : `失敗… 正解: ${answer}`}
                </span>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" // 横パディング, 縦パディング, 青背景, 白文字, 角丸, ホバー色
                >
                  もう一度遊ぶ
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function HangmanDrawing({ wrongGuesses }: { wrongGuesses: number }) {
  // 0..6の段階的な描画（シンプルなSVG）
  return (
    <svg viewBox="0 0 200 220" className="text-gray-700 w-40 h-44 md:w-52 md:h-56"> {/* ビューボックス指定, 幅/高さ可変, 灰色系 */}
      {/* 土台 */}
      <line x1="10" y1="210" x2="190" y2="210" stroke="currentColor" strokeWidth="6" />
      {/* 柱 */}
      <line x1="40" y1="210" x2="40" y2="20" stroke="currentColor" strokeWidth="6" />
      <line x1="37" y1="20" x2="140" y2="20" stroke="currentColor" strokeWidth="6" />
      <line x1="140" y1="20" x2="140" y2="40" stroke="currentColor" strokeWidth="6" />

      {/* 吊り下げパーツ（段階的） */}
      {wrongGuesses > 0 && (
        <circle cx="140" cy="60" r="18" stroke="currentColor" strokeWidth="4" fill="none" />
      )}
      {wrongGuesses > 1 && (
        <line x1="140" y1="78" x2="140" y2="130" stroke="currentColor" strokeWidth="4" />
      )}
      {wrongGuesses > 2 && (
        <line x1="140" y1="95" x2="120" y2="115" stroke="currentColor" strokeWidth="4" />
      )}
      {wrongGuesses > 3 && (
        <line x1="140" y1="95" x2="160" y2="115" stroke="currentColor" strokeWidth="4" />
      )}
      {wrongGuesses > 4 && (
        <line x1="140" y1="130" x2="120" y2="160" stroke="currentColor" strokeWidth="4" />
      )}
      {wrongGuesses > 5 && (
        <line x1="140" y1="130" x2="160" y2="160" stroke="currentColor" strokeWidth="4" />
      )}
    </svg>
  );
}

function Keyboard({
  alphabet,
  guessed,
  disabled,
  onGuess,
}: {
  alphabet: string[];
  guessed: Set<string>;
  disabled: boolean;
  onGuess: (letter: string) => void;
}) {
  return (
    <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2"> {/* 小画面8列, smで10列, mdで12列, 隙間 */}
      {alphabet.map((ch) => {
        const isUsed = guessed.has(ch);
        return (
          <button
            key={ch}
            onClick={() => onGuess(ch)}
            disabled={disabled || isUsed}
            className={`py-2 text-base md:text-sm rounded-md border transition-colors ${
              isUsed
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white hover:bg-blue-50'
            }`}
          > {/* 縦パディング, 小文字サイズ, 角丸, 枠線, 色トランジション */}
            {ch.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}



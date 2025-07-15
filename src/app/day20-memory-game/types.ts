// カードの状態を表す型定義
export interface Card {
  id: number;       // 各カードに固有のID
  pairId: number;   // ペアを判定するためのID
  content: string;  // カードの絵柄や記号
  isFlipped: boolean; // カードが表向きかどうかの状態
  isMatched: boolean; // ペアが揃ったかどうかの状態
}
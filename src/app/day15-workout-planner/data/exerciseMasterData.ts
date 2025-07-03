import { ExerciseMaster } from '../types';

export const exerciseMasterData: ExerciseMaster[] = [
  // 胸 (Chest)
  {
    id: 'chest-1',
    name: 'ベンチプレス',
    category: 'strength',
    bodyPart: 'chest',
    description: '胸筋全体を鍛える基本種目',
    defaultSets: 3,
    defaultReps: 10,
  },
  {
    id: 'chest-2',
    name: 'ダンベルプレス',
    category: 'strength',
    bodyPart: 'chest',
    description: '胸筋の可動域を広げて鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'chest-3',
    name: 'プッシュアップ',
    category: 'strength',
    bodyPart: 'chest',
    description: '自重で行う胸筋トレーニング',
    defaultSets: 3,
    defaultReps: 15,
  },
  {
    id: 'chest-4',
    name: 'インクラインベンチプレス',
    category: 'strength',
    bodyPart: 'chest',
    description: '胸筋上部を重点的に鍛える',
    defaultSets: 3,
    defaultReps: 10,
  },
  {
    id: 'chest-5',
    name: 'ディップス',
    category: 'strength',
    bodyPart: 'chest',
    description: '胸筋下部と三頭筋を鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },

  // 背中 (Back)
  {
    id: 'back-1',
    name: 'デッドリフト',
    category: 'strength',
    bodyPart: 'back',
    description: '背筋全体と下半身を鍛える基本種目',
    defaultSets: 3,
    defaultReps: 8,
  },
  {
    id: 'back-2',
    name: 'ラットプルダウン',
    category: 'strength',
    bodyPart: 'back',
    description: '広背筋を重点的に鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'back-3',
    name: 'チンニング（懸垂）',
    category: 'strength',
    bodyPart: 'back',
    description: '自重で行う背筋トレーニング',
    defaultSets: 3,
    defaultReps: 10,
  },
  {
    id: 'back-4',
    name: 'ベントオーバーロウ',
    category: 'strength',
    bodyPart: 'back',
    description: '背筋中部を鍛える',
    defaultSets: 3,
    defaultReps: 10,
  },
  {
    id: 'back-5',
    name: 'ワンハンドロウ',
    category: 'strength',
    bodyPart: 'back',
    description: '片手で行う背筋トレーニング',
    defaultSets: 3,
    defaultReps: 12,
  },

  // 肩 (Shoulders)
  {
    id: 'shoulders-1',
    name: 'ショルダープレス',
    category: 'strength',
    bodyPart: 'shoulders',
    description: '肩全体を鍛える基本種目',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'shoulders-2',
    name: 'サイドレイズ',
    category: 'strength',
    bodyPart: 'shoulders',
    description: '三角筋中部を鍛える',
    defaultSets: 3,
    defaultReps: 15,
  },
  {
    id: 'shoulders-3',
    name: 'フロントレイズ',
    category: 'strength',
    bodyPart: 'shoulders',
    description: '三角筋前部を鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'shoulders-4',
    name: 'リアレイズ',
    category: 'strength',
    bodyPart: 'shoulders',
    description: '三角筋後部を鍛える',
    defaultSets: 3,
    defaultReps: 15,
  },
  {
    id: 'shoulders-5',
    name: 'アップライトロウ',
    category: 'strength',
    bodyPart: 'shoulders',
    description: '肩と僧帽筋を鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },

  // 腕 (Arms)
  {
    id: 'arms-1',
    name: 'バーベルカール',
    category: 'strength',
    bodyPart: 'arms',
    description: '上腕二頭筋を鍛える基本種目',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'arms-2',
    name: 'ダンベルカール',
    category: 'strength',
    bodyPart: 'arms',
    description: '上腕二頭筋を片手ずつ鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'arms-3',
    name: 'トライセプスエクステンション',
    category: 'strength',
    bodyPart: 'arms',
    description: '上腕三頭筋を鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'arms-4',
    name: 'クローズグリップベンチプレス',
    category: 'strength',
    bodyPart: 'arms',
    description: '上腕三頭筋を重点的に鍛える',
    defaultSets: 3,
    defaultReps: 10,
  },
  {
    id: 'arms-5',
    name: 'ハンマーカール',
    category: 'strength',
    bodyPart: 'arms',
    description: '上腕二頭筋と前腕を鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },

  // 脚 (Legs)
  {
    id: 'legs-1',
    name: 'スクワット',
    category: 'strength',
    bodyPart: 'legs',
    description: '下半身全体を鍛える基本種目',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'legs-2',
    name: 'レッグプレス',
    category: 'strength',
    bodyPart: 'legs',
    description: '太もも全体を鍛える',
    defaultSets: 3,
    defaultReps: 15,
  },
  {
    id: 'legs-3',
    name: 'ランジ',
    category: 'strength',
    bodyPart: 'legs',
    description: '片足ずつ下半身を鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'legs-4',
    name: 'レッグカール',
    category: 'strength',
    bodyPart: 'legs',
    description: 'ハムストリングスを鍛える',
    defaultSets: 3,
    defaultReps: 12,
  },
  {
    id: 'legs-5',
    name: 'カーフレイズ',
    category: 'strength',
    bodyPart: 'legs',
    description: 'ふくらはぎを鍛える',
    defaultSets: 3,
    defaultReps: 20,
  },

  // 腹筋 (Abs)
  {
    id: 'abs-1',
    name: 'クランチ',
    category: 'strength',
    bodyPart: 'abs',
    description: '腹直筋上部を鍛える基本種目',
    defaultSets: 3,
    defaultReps: 20,
  },
  {
    id: 'abs-2',
    name: 'プランク',
    category: 'strength',
    bodyPart: 'abs',
    description: '体幹全体を鍛える',
    defaultSets: 3,
    defaultReps: 1, // 時間での実施
  },
  {
    id: 'abs-3',
    name: 'レッグレイズ',
    category: 'strength',
    bodyPart: 'abs',
    description: '腹直筋下部を鍛える',
    defaultSets: 3,
    defaultReps: 15,
  },
  {
    id: 'abs-4',
    name: 'ロシアンツイスト',
    category: 'strength',
    bodyPart: 'abs',
    description: '腹斜筋を鍛える',
    defaultSets: 3,
    defaultReps: 20,
  },
  {
    id: 'abs-5',
    name: 'マウンテンクライマー',
    category: 'strength',
    bodyPart: 'abs',
    description: '腹筋と有酸素運動を組み合わせ',
    defaultSets: 3,
    defaultReps: 30,
  },

  // 有酸素運動 (Cardio)
  {
    id: 'cardio-1',
    name: 'ランニング',
    category: 'cardio',
    bodyPart: 'cardio',
    description: '基本的な有酸素運動',
  },
  {
    id: 'cardio-2',
    name: 'ウォーキング',
    category: 'cardio',
    bodyPart: 'cardio',
    description: '軽い有酸素運動',
  },
  {
    id: 'cardio-3',
    name: 'サイクリング',
    category: 'cardio',
    bodyPart: 'cardio',
    description: '自転車での有酸素運動',
  },
  {
    id: 'cardio-4',
    name: 'エリプティカル',
    category: 'cardio',
    bodyPart: 'cardio',
    description: '全身を使った有酸素運動',
  },
  {
    id: 'cardio-5',
    name: 'ローイングマシン',
    category: 'cardio',
    bodyPart: 'cardio',
    description: '背筋も鍛えられる有酸素運動',
  },

  // ストレッチ・柔軟性 (Flexibility)
  {
    id: 'flexibility-1',
    name: 'ヨガ',
    category: 'flexibility',
    bodyPart: 'flexibility',
    description: '全身の柔軟性を向上',
  },
  {
    id: 'flexibility-2',
    name: 'ストレッチング',
    category: 'flexibility',
    bodyPart: 'flexibility',
    description: '筋肉の柔軟性を向上',
  },
  {
    id: 'flexibility-3',
    name: 'ピラティス',
    category: 'flexibility',
    bodyPart: 'flexibility',
    description: '体幹と柔軟性を鍛える',
  },

  // スポーツ (Sports)
  {
    id: 'sports-1',
    name: 'バスケットボール',
    category: 'sports',
    bodyPart: 'sports',
    description: '全身を使うスポーツ',
  },
  {
    id: 'sports-2',
    name: 'テニス',
    category: 'sports',
    bodyPart: 'sports',
    description: '瞬発力と持久力を鍛える',
  },
  {
    id: 'sports-3',
    name: 'サッカー',
    category: 'sports',
    bodyPart: 'sports',
    description: '下半身と持久力を鍛える',
  },
];

// 部位別ラベル
export const bodyPartLabels = {
  chest: '胸',
  back: '背中',
  shoulders: '肩',
  arms: '腕',
  legs: '脚',
  abs: '腹筋',
  cardio: '有酸素運動',
  flexibility: 'ストレッチ・柔軟性',
  sports: 'スポーツ',
};

// カテゴリー別の部位を取得
export const getBodyPartsByCategory = (category: string) => {
  switch (category) {
    case 'strength':
      return ['chest', 'back', 'shoulders', 'arms', 'legs', 'abs'];
    case 'cardio':
      return ['cardio'];
    case 'flexibility':
      return ['flexibility'];
    case 'sports':
      return ['sports'];
    default:
      return Object.keys(bodyPartLabels);
  }
}; 
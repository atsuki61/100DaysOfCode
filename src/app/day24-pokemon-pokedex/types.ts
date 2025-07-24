// ポケモンAPI関連の型定義

// ポケモンの基本情報
export interface Pokemon {
  id: number;
  name: string;
  height: number; // デシメートル (1デシメートル = 10cm)
  weight: number; // ヘクトグラム (1ヘクトグラム = 100g)
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

// ポケモンのタイプ情報
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// ポケモンのステータス情報
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// ポケモンの特性情報
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

// ポケモン一覧API用の軽量な型
export interface PokemonListItem {
  name: string;
  url: string;
}

// API一覧レスポンス
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// 表示用に整形されたポケモン情報
export interface FormattedPokemon {
  id: number;
  name: string;
  displayName: string; // 日本語名などの表示用名前
  image: string;
  types: string[];
  height: string; // "1.7m" のような表示用
  weight: string; // "69.0kg" のような表示用
  baseExperience: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  abilities: string[];
}

// タイプ別の色分け用
export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

// タイプの日本語名マッピング
export const TYPE_NAMES_JA: Record<string, string> = {
  normal: 'ノーマル',
  fire: 'ほのお',
  water: 'みず',
  electric: 'でんき',
  grass: 'くさ',
  ice: 'こおり',
  fighting: 'かくとう',
  poison: 'どく',
  ground: 'じめん',
  flying: 'ひこう',
  psychic: 'エスパー',
  bug: 'むし',
  rock: 'いわ',
  ghost: 'ゴースト',
  dragon: 'ドラゴン',
  dark: 'あく',
  steel: 'はがね',
  fairy: 'フェアリー',
};

// 世代別ポケモン範囲データ
export interface GenerationData {
  id: string;
  name: string;
  region: string;
  startId: number;
  endId: number;
  count: number;
}

export const GENERATION_DATA: GenerationData[] = [
  {
    id: 'all',
    name: '全世代',
    region: '全地方',
    startId: 1,
    endId: 1025,
    count: 1025,
  },
  {
    id: 'gen1',
    name: '第一世代',
    region: 'カントー地方',
    startId: 1,
    endId: 151,
    count: 151,
  },
  {
    id: 'gen2',
    name: '第二世代',
    region: 'ジョウト地方',
    startId: 152,
    endId: 251,
    count: 100,
  },
  {
    id: 'gen3',
    name: '第三世代',
    region: 'ホウエン地方',
    startId: 252,
    endId: 386,
    count: 135,
  },
  {
    id: 'gen4',
    name: '第四世代',
    region: 'シンオウ地方',
    startId: 387,
    endId: 493,
    count: 107,
  },
  {
    id: 'gen5',
    name: '第五世代',
    region: 'イッシュ地方',
    startId: 494,
    endId: 649,
    count: 156,
  },
  {
    id: 'gen6',
    name: '第六世代',
    region: 'カロス地方',
    startId: 650,
    endId: 721,
    count: 72,
  },
  {
    id: 'gen7',
    name: '第七世代',
    region: 'アローラ地方',
    startId: 722,
    endId: 809,
    count: 88,
  },
  {
    id: 'gen8',
    name: '第八世代',
    region: 'ガラル地方',
    startId: 810,
    endId: 905,
    count: 96,
  },
  {
    id: 'gen9',
    name: '第九世代',
    region: 'パルデア地方',
    startId: 906,
    endId: 1025,
    count: 120,
  },
]; 
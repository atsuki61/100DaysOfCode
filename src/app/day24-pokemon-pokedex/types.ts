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
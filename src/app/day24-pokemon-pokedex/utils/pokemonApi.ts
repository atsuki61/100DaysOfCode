import { 
  Pokemon, 
  PokemonListResponse, 
  FormattedPokemon,
  PokemonListItem,
  PokemonSpecies
} from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

// ポケモン一覧を取得（最初の150匹）
export async function getPokemonList(limit: number = 150): Promise<PokemonListItem[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PokemonListResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw new Error('Failed to fetch Pokemon list');
  }
}

// 世代別ポケモン一覧を取得
export async function getPokemonListByGeneration(startId: number, endId: number): Promise<PokemonListItem[]> {
  try {
    // 指定された範囲のポケモンIDからURLを生成
    const pokemonList: PokemonListItem[] = [];
    
    for (let id = startId; id <= endId; id++) {
      pokemonList.push({
        name: `pokemon-${id}`, // 仮の名前（後で詳細取得時に正しい名前に置き換わる）
        url: `${BASE_URL}/pokemon/${id}/`
      });
    }
    
    return pokemonList;
  } catch (error) {
    console.error('Error generating Pokemon list by generation:', error);
    throw new Error('Failed to generate Pokemon list by generation');
  }
}

// 複数のポケモンの詳細データを並行取得
export async function getPokemonDetailsBatch(pokemonList: PokemonListItem[]): Promise<FormattedPokemon[]> {
  try {
    const pokemonDetailsPromises = pokemonList.map(async (pokemon) => {
      const id = extractPokemonIdFromUrl(pokemon.url);
      
      // ポケモンの基本データとspeciesデータを並行取得
      const [details, species] = await Promise.all([
        getPokemonDetails(id),
        getPokemonSpecies(id)
      ]);
      
      return formatPokemonData(details, species);
    });

    const formattedPokemon = await Promise.all(pokemonDetailsPromises);
    
    // IDでソート
    formattedPokemon.sort((a, b) => a.id - b.id);
    
    return formattedPokemon;
  } catch (error) {
    console.error('Error fetching Pokemon details batch:', error);
    throw new Error('Failed to fetch Pokemon details batch');
  }
}

// 個別のポケモン詳細データを取得
export async function getPokemonDetails(identifier: string | number): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: Pokemon = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon details for ${identifier}:`, error);
    throw new Error(`Failed to fetch Pokemon details for ${identifier}`);
  }
}

// ポケモンspecies（種族）データを取得
export async function getPokemonSpecies(id: number): Promise<PokemonSpecies> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PokemonSpecies = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon species ${id}:`, error);
    throw new Error(`Failed to fetch Pokemon species ${id}`);
  }
}

// 日本語名を取得（species APIから）
export function extractJapaneseName(species: PokemonSpecies): string {
  // 日本語名を探す（優先順位: ja-Hrkt > ja > 英語名）
  const jaHrktName = species.names.find(nameObj => nameObj.language.name === 'ja-Hrkt');
  if (jaHrktName) return jaHrktName.name;
  
  const jaName = species.names.find(nameObj => nameObj.language.name === 'ja');
  if (jaName) return jaName.name;
  
  // 日本語名が見つからない場合は英語名を返す
  return species.name;
}

// ポケモンの英語名から日本語名を取得する簡易変換
// 実際のアプリでは、ポケモン種族APIから取得するのが理想的ですが、今回は簡易版
export function formatPokemonName(name: string): string {
  const nameMap: Record<string, string> = {
    'bulbasaur': 'フシギダネ',
    'ivysaur': 'フシギソウ',
    'venusaur': 'フシギバナ',
    'charmander': 'ヒトカゲ',
    'charmeleon': 'リザード',
    'charizard': 'リザードン',
    'squirtle': 'ゼニガメ',
    'wartortle': 'カメール',
    'blastoise': 'カメックス',
    'caterpie': 'キャタピー',
    'metapod': 'トランセル',
    'butterfree': 'バタフリー',
    'weedle': 'ビードル',
    'kakuna': 'コクーン',
    'beedrill': 'スピアー',
    'pidgey': 'ポッポ',
    'pidgeotto': 'ピジョン',
    'pidgeot': 'ピジョット',
    'rattata': 'コラッタ',
    'raticate': 'ラッタ',
    'spearow': 'オニスズメ',
    'fearow': 'オニドリル',
    'ekans': 'アーボ',
    'arbok': 'アーボック',
    'pikachu': 'ピカチュウ',
    'raichu': 'ライチュウ',
    'sandshrew': 'サンド',
    'sandslash': 'サンドパン',
    'nidoran-f': 'ニドラン♀',
    'nidorina': 'ニドリーナ',
    'nidoqueen': 'ニドクイン',
    'nidoran-m': 'ニドラン♂',
    'nidorino': 'ニドリーノ',
    'nidoking': 'ニドキング',
    'clefairy': 'ピッピ',
    'clefable': 'ピクシー',
    'vulpix': 'ロコン',
    'ninetales': 'キュウコン',
    'jigglypuff': 'プリン',
    'wigglytuff': 'プクリン',
    'zubat': 'ズバット',
    'golbat': 'ゴルバット',
    'oddish': 'ナゾノクサ',
    'gloom': 'クサイハナ',
    'vileplume': 'ラフレシア',
    'paras': 'パラス',
    'parasect': 'パラセクト',
    'venonat': 'コンパン',
    'venomoth': 'モルフォン',
    'diglett': 'ディグダ',
    'dugtrio': 'ダグトリオ',
    'meowth': 'ニャース',
    'persian': 'ペルシアン',
    'psyduck': 'コダック',
    'golduck': 'ゴルダック',
    'mankey': 'マンキー',
    'primeape': 'オコリザル',
    'growlithe': 'ガーディ',
    'arcanine': 'ウインディ',
    'poliwag': 'ニョロモ',
    'poliwhirl': 'ニョロゾ',
    'poliwrath': 'ニョロボン',
    'abra': 'ケーシィ',
    'kadabra': 'ユンゲラー',
    'alakazam': 'フーディン',
    'machop': 'ワンリキー',
    'machoke': 'ゴーリキー',
    'machamp': 'カイリキー',
    'bellsprout': 'マダツボミ',
    'weepinbell': 'ウツドン',
    'victreebel': 'ウツボット',
    'tentacool': 'メノクラゲ',
    'tentacruel': 'ドククラゲ',
    'geodude': 'イシツブテ',
    'graveler': 'ゴローン',
    'golem': 'ゴローニャ',
    'ponyta': 'ポニータ',
    'rapidash': 'ギャロップ',
    'slowpoke': 'ヤドン',
    'slowbro': 'ヤドラン',
    'magnemite': 'コイル',
    'magneton': 'レアコイル',
    'farfetchd': 'カモネギ',
    'doduo': 'ドードー',
    'dodrio': 'ドードリオ',
    'seel': 'パウワウ',
    'dewgong': 'ジュゴン',
    'grimer': 'ベトベター',
    'muk': 'ベトベトン',
    'shellder': 'シェルダー',
    'cloyster': 'パルシェン',
    'gastly': 'ゴース',
    'haunter': 'ゴースト',
    'gengar': 'ゲンガー',
    'onix': 'イワーク',
    'drowzee': 'スリープ',
    'hypno': 'スリーパー',
    'krabby': 'クラブ',
    'kingler': 'キングラー',
    'voltorb': 'ビリリダマ',
    'electrode': 'マルマイン',
    'exeggcute': 'タマタマ',
    'exeggutor': 'ナッシー',
    'cubone': 'カラカラ',
    'marowak': 'ガラガラ',
    'hitmonlee': 'サワムラー',
    'hitmonchan': 'エビワラー',
    'lickitung': 'ベロリンガ',
    'koffing': 'ドガース',
    'weezing': 'マタドガス',
    'rhyhorn': 'サイホーン',
    'rhydon': 'サイドン',
    'chansey': 'ラッキー',
    'tangela': 'モンジャラ',
    'kangaskhan': 'ガルーラ',
    'horsea': 'タッツー',
    'seadra': 'シードラ',
    'goldeen': 'トサキント',
    'seaking': 'アズマオウ',
    'staryu': 'ヒトデマン',
    'starmie': 'スターミー',
    'mr-mime': 'バリヤード',
    'scyther': 'ストライク',
    'jynx': 'ルージュラ',
    'electabuzz': 'エレブー',
    'magmar': 'ブーバー',
    'pinsir': 'カイロス',
    'tauros': 'ケンタロス',
    'magikarp': 'コイキング',
    'gyarados': 'ギャラドス',
    'lapras': 'ラプラス',
    'ditto': 'メタモン',
    'eevee': 'イーブイ',
    'vaporeon': 'シャワーズ',
    'jolteon': 'サンダース',
    'flareon': 'ブースター',
    'porygon': 'ポリゴン',
    'omanyte': 'オムナイト',
    'omastar': 'オムスター',
    'kabuto': 'カブト',
    'kabutops': 'カブトプス',
    'aerodactyl': 'プテラ',
    'snorlax': 'カビゴン',
    'articuno': 'フリーザー',
    'zapdos': 'サンダー',
    'moltres': 'ファイヤー',
    'dratini': 'ミニリュウ',
    'dragonair': 'ハクリュー',
    'dragonite': 'カイリュー',
    'mewtwo': 'ミュウツー',
    'mew': 'ミュウ',
  };
  
  return nameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);
}

// APIレスポンスを表示用データに変換
export function formatPokemonData(pokemon: Pokemon, species?: PokemonSpecies): FormattedPokemon {
  const heightInMeters = (pokemon.height / 10).toFixed(1); // デシメートルをメートルに変換
  const weightInKg = (pokemon.weight / 10).toFixed(1); // ヘクトグラムをキログラムに変換
  
  // 日本語名を取得
  const japaneseName = species ? extractJapaneseName(species) : formatPokemonName(pokemon.name);
  
  // ステータスを整形
  const stats = {
    hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
    attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
    defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
    specialAttack: pokemon.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
    specialDefense: pokemon.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
    speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
  };
  
  return {
    id: pokemon.id,
    name: pokemon.name, // 英語名
    displayName: japaneseName, // 日本語名
    image: pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || '',
    types: pokemon.types.map(typeObj => typeObj.type.name),
    height: `${heightInMeters}m`,
    weight: `${weightInKg}kg`,
    baseExperience: pokemon.base_experience,
    stats,
    abilities: pokemon.abilities.map(ability => ability.ability.name)
  };
}

// URLからポケモンIDを抽出
export function extractPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
} 
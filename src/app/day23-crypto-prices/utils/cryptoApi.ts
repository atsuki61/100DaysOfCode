// CoinGecko API設定
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'

// 暗号通貨データの型定義
export interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null
  last_updated: string
}



/**
 * 暗号通貨の市場データを取得する関数
 * @param currency 基準通貨 (デフォルト: usd)
 * @param perPage 取得件数 (デフォルト: 10)
 * @param page ページ番号 (デフォルト: 1)
 * @returns Promise<CryptoData[]> 暗号通貨データの配列
 */
export async function fetchCryptoMarketData(
  currency: string = 'usd',
  perPage: number = 10,
  page: number = 1
): Promise<CryptoData[]> {
  const url = new URL(`${COINGECKO_BASE_URL}/coins/markets`)
  
  // クエリパラメータを設定
  url.searchParams.append('vs_currency', currency)
  url.searchParams.append('order', 'market_cap_desc') // 時価総額順にソート
  url.searchParams.append('per_page', perPage.toString())
  url.searchParams.append('page', page.toString())
  url.searchParams.append('sparkline', 'false') // チャートデータは不要
  url.searchParams.append('price_change_percentage', '24h') // 24時間の変動率を含める

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Next.jsのSSRでキャッシュ制御
      next: { 
        revalidate: 60 // 60秒間キャッシュ
      }
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API Error: ${response.status} ${response.statusText}`)
    }

    const data: CryptoData[] = await response.json()
    return data

  } catch (error) {
    console.error('暗号通貨データの取得に失敗しました:', error)
    
    if (error instanceof Error) {
      throw new Error(`API取得エラー: ${error.message}`)
    }
    
    throw new Error('不明なエラーが発生しました')
  }
}

/**
 * 特定の暗号通貨の詳細データを取得する関数
 * @param coinId 暗号通貨のID (例: 'bitcoin', 'ethereum')
 * @returns Promise<CryptoData> 暗号通貨の詳細データ
 */
export async function fetchCoinDetails(coinId: string): Promise<CryptoData> {
  const url = `${COINGECKO_BASE_URL}/coins/${coinId}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { 
        revalidate: 30 // 30秒間キャッシュ
      }
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // 詳細データから必要な情報のみを抽出してCryptoData形式に変換
    const cryptoData: CryptoData = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image.large,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      fully_diluted_valuation: data.market_data.fully_diluted_valuation?.usd || null,
      total_volume: data.market_data.total_volume.usd,
      high_24h: data.market_data.high_24h.usd,
      low_24h: data.market_data.low_24h.usd,
      price_change_24h: data.market_data.price_change_24h,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap_change_24h: data.market_data.market_cap_change_24h,
      market_cap_change_percentage_24h: data.market_data.market_cap_change_percentage_24h,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      ath: data.market_data.ath.usd,
      ath_change_percentage: data.market_data.ath_change_percentage.usd,
      ath_date: data.market_data.ath_date.usd,
      atl: data.market_data.atl.usd,
      atl_change_percentage: data.market_data.atl_change_percentage.usd,
      atl_date: data.market_data.atl_date.usd,
      roi: null,
      last_updated: data.last_updated,
    }

    return cryptoData

  } catch (error) {
    console.error(`暗号通貨 ${coinId} の詳細データ取得に失敗しました:`, error)
    
    if (error instanceof Error) {
      throw new Error(`詳細データ取得エラー: ${error.message}`)
    }
    
    throw new Error('詳細データの取得で不明なエラーが発生しました')
  }
}

/**
 * 人気暗号通貨のプリセットデータを取得する関数
 * ビットコイン、イーサリアム、その他主要通貨のデータを取得
 */
export async function fetchPopularCryptos(): Promise<CryptoData[]> {
  const popularCoinIds = [
    'bitcoin',
    'ethereum', 
    'binancecoin',
    'cardano',
    'solana',
    'xrp',
    'dogecoin',
    'polygon',
    'litecoin',
    'chainlink'
  ]

  const url = new URL(`${COINGECKO_BASE_URL}/coins/markets`)
  url.searchParams.append('vs_currency', 'usd')
  url.searchParams.append('ids', popularCoinIds.join(','))
  url.searchParams.append('order', 'market_cap_desc')
  url.searchParams.append('sparkline', 'false')
  url.searchParams.append('price_change_percentage', '24h')

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { 
        revalidate: 60 // 60秒間キャッシュ
      }
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API Error: ${response.status} ${response.statusText}`)
    }

    const data: CryptoData[] = await response.json()
    return data

  } catch (error) {
    console.error('人気暗号通貨データの取得に失敗しました:', error)
    throw error
  }
} 
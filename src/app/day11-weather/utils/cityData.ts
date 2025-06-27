// 都市データの型定義
export interface CityData {
  id: string;
  hiragana: string;     // ひらがな読み
  kanji: string;        // 漢字表記
  english: string;      // 英語表記
  prefecture: string;   // 都道府県
  suffix?: string;      // 市・町・村
}

// 都市データベース
export const cityDatabase: CityData[] = [
  // 滋賀県
  { id: 'shiga-otsu', hiragana: 'おおつ', kanji: '大津', english: 'Otsu', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-hikone', hiragana: 'ひこね', kanji: '彦根', english: 'Hikone', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-nagahama', hiragana: 'ながはま', kanji: '長浜', english: 'Nagahama', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-omihachiman', hiragana: 'おうみはちまん', kanji: '近江八幡', english: 'Omihachiman', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-kusatsu', hiragana: 'くさつ', kanji: '草津', english: 'Kusatsu', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-moriyama', hiragana: 'もりやま', kanji: '守山', english: 'Moriyama', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-ritto', hiragana: 'りっとう', kanji: '栗東', english: 'Ritto', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-koka', hiragana: 'こうか', kanji: '甲賀', english: 'Koka', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-yasu', hiragana: 'やす', kanji: '野洲', english: 'Yasu', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-konan', hiragana: 'こなん', kanji: '湖南', english: 'Konan', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-takashima', hiragana: 'たかしま', kanji: '高島', english: 'Takashima', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-higashiomi', hiragana: 'ひがしおうみ', kanji: '東近江', english: 'Higashiomi', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-maibara', hiragana: 'まいばら', kanji: '米原', english: 'Maibara', prefecture: '滋賀', suffix: '市' },
  { id: 'shiga-hino', hiragana: 'ひの', kanji: '日野', english: 'Hino Shiga', prefecture: '滋賀', suffix: '町' },
  { id: 'shiga-ryuo', hiragana: 'りゅうおう', kanji: '竜王', english: 'Ryuo', prefecture: '滋賀', suffix: '町' },

  // 愛知県
  { id: 'aichi-nagoya', hiragana: 'なごや', kanji: '名古屋', english: 'Nagoya', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-toyota', hiragana: 'とよた', kanji: '豊田', english: 'Toyota', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-okazaki', hiragana: 'おかざき', kanji: '岡崎', english: 'Okazaki', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-ichinomiya', hiragana: 'いちのみや', kanji: '一宮', english: 'Ichinomiya', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-toyohashi', hiragana: 'とよはし', kanji: '豊橋', english: 'Toyohashi', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-kasugai', hiragana: 'かすがい', kanji: '春日井', english: 'Kasugai', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-toyokawa', hiragana: 'とよかわ', kanji: '豊川', english: 'Toyokawa', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-anjo', hiragana: 'あんじょう', kanji: '安城', english: 'Anjo', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-nishio', hiragana: 'にしお', kanji: '西尾', english: 'Nishio', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-kariya', hiragana: 'かりや', kanji: '刈谷', english: 'Kariya', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-komaki', hiragana: 'こまき', kanji: '小牧', english: 'Komaki', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-tokai', hiragana: 'とうかい', kanji: '東海', english: 'Tokai', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-konan', hiragana: 'こうなん', kanji: '江南', english: 'Konan Aichi', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-inazawa', hiragana: 'いなざわ', kanji: '稲沢', english: 'Inazawa', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-chita', hiragana: 'ちた', kanji: '知多', english: 'Chita', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-seto', hiragana: 'せと', kanji: '瀬戸', english: 'Seto', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-handa', hiragana: 'はんだ', kanji: '半田', english: 'Handa', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-gamagori', hiragana: 'がまごおり', kanji: '蒲郡', english: 'Gamagori', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-inuyama', hiragana: 'いぬやま', kanji: '犬山', english: 'Inuyama', prefecture: '愛知', suffix: '市' },
  { id: 'aichi-tokoname', hiragana: 'とこなめ', kanji: '常滑', english: 'Tokoname', prefecture: '愛知', suffix: '市' },

  // 京都府
  { id: 'kyoto-kyoto', hiragana: 'きょうと', kanji: '京都', english: 'Kyoto', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-fukuchiyama', hiragana: 'ふくちやま', kanji: '福知山', english: 'Fukuchiyama', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-maizuru', hiragana: 'まいづる', kanji: '舞鶴', english: 'Maizuru', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-ayabe', hiragana: 'あやべ', kanji: '綾部', english: 'Ayabe', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-uji', hiragana: 'うじ', kanji: '宇治', english: 'Uji', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-miyazu', hiragana: 'みやづ', kanji: '宮津', english: 'Miyazu', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-kameoka', hiragana: 'かめおか', kanji: '亀岡', english: 'Kameoka', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-joyo', hiragana: 'じょうよう', kanji: '城陽', english: 'Joyo', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-muko', hiragana: 'むこう', kanji: '向日', english: 'Muko', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-nagaokakyo', hiragana: 'ながおかきょう', kanji: '長岡京', english: 'Nagaokakyo', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-yawata', hiragana: 'やわた', kanji: '八幡', english: 'Yawata', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-kyotanabe', hiragana: 'きょうたなべ', kanji: '京田辺', english: 'Kyotanabe', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-kyotango', hiragana: 'きょうたんご', kanji: '京丹後', english: 'Kyotango', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-nantan', hiragana: 'なんたん', kanji: '南丹', english: 'Nantan', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-kizugawa', hiragana: 'きづがわ', kanji: '木津川', english: 'Kizugawa', prefecture: '京都', suffix: '市' },
  { id: 'kyoto-oyamazaki', hiragana: 'おおやまざき', kanji: '大山崎', english: 'Oyamazaki', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-kumiyama', hiragana: 'くみやま', kanji: '久御山', english: 'Kumiyama', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-ide', hiragana: 'いで', kanji: '井手', english: 'Ide', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-ujitawara', hiragana: 'うじたわら', kanji: '宇治田原', english: 'Ujitawara', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-kasagi', hiragana: 'かさぎ', kanji: '笠置', english: 'Kasagi', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-wazuka', hiragana: 'わづか', kanji: '和束', english: 'Wazuka', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-seika', hiragana: 'せいか', kanji: '精華', english: 'Seika', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-minamiyamashiro', hiragana: 'みなみやましろ', kanji: '南山城', english: 'Minamiyamashiro', prefecture: '京都', suffix: '村' },
  { id: 'kyoto-kyotamba', hiragana: 'きょうたんば', kanji: '京丹波', english: 'Kyotamba', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-ine', hiragana: 'いね', kanji: '伊根', english: 'Ine', prefecture: '京都', suffix: '町' },
  { id: 'kyoto-yosano', hiragana: 'よさの', kanji: '与謝野', english: 'Yosano', prefecture: '京都', suffix: '町' },

  // 三重県
  { id: 'mie-tsu', hiragana: 'つ', kanji: '津', english: 'Tsu', prefecture: '三重', suffix: '市' },
  { id: 'mie-yokkaichi', hiragana: 'よっかいち', kanji: '四日市', english: 'Yokkaichi', prefecture: '三重', suffix: '市' },
  { id: 'mie-ise', hiragana: 'いせ', kanji: '伊勢', english: 'Ise', prefecture: '三重', suffix: '市' },
  { id: 'mie-matsusaka', hiragana: 'まつさか', kanji: '松阪', english: 'Matsusaka', prefecture: '三重', suffix: '市' },
  { id: 'mie-kuwana', hiragana: 'くわな', kanji: '桑名', english: 'Kuwana', prefecture: '三重', suffix: '市' },
  { id: 'mie-suzuka', hiragana: 'すずか', kanji: '鈴鹿', english: 'Suzuka', prefecture: '三重', suffix: '市' },
  { id: 'mie-nabari', hiragana: 'なばり', kanji: '名張', english: 'Nabari', prefecture: '三重', suffix: '市' },
  { id: 'mie-owase', hiragana: 'おわせ', kanji: '尾鷲', english: 'Owase', prefecture: '三重', suffix: '市' },
  { id: 'mie-kameyama', hiragana: 'かめやま', kanji: '亀山', english: 'Kameyama', prefecture: '三重', suffix: '市' },
  { id: 'mie-toba', hiragana: 'とば', kanji: '鳥羽', english: 'Toba', prefecture: '三重', suffix: '市' },
  { id: 'mie-kumano', hiragana: 'くまの', kanji: '熊野', english: 'Kumano', prefecture: '三重', suffix: '市' },
  { id: 'mie-inabe', hiragana: 'いなべ', kanji: 'いなべ', english: 'Inabe', prefecture: '三重', suffix: '市' },
  { id: 'mie-shima', hiragana: 'しま', kanji: '志摩', english: 'Shima', prefecture: '三重', suffix: '市' },
  { id: 'mie-iga', hiragana: 'いが', kanji: '伊賀', english: 'Iga', prefecture: '三重', suffix: '市' },
  { id: 'mie-kisosaki', hiragana: 'きそさき', kanji: '木曽岬', english: 'Kisosaki', prefecture: '三重', suffix: '町' },
  { id: 'mie-toin', hiragana: 'とういん', kanji: '東員', english: 'Toin', prefecture: '三重', suffix: '町' },
  { id: 'mie-komono', hiragana: 'こもの', kanji: '菰野', english: 'Komono', prefecture: '三重', suffix: '町' },
  { id: 'mie-asahi', hiragana: 'あさひ', kanji: '朝日', english: 'Asahi', prefecture: '三重', suffix: '町' },
  { id: 'mie-kawagoe', hiragana: 'かわごえ', kanji: '川越', english: 'Kawagoe', prefecture: '三重', suffix: '町' },
  { id: 'mie-taki', hiragana: 'たき', kanji: '多気', english: 'Taki', prefecture: '三重', suffix: '町' },
  { id: 'mie-meiwa', hiragana: 'めいわ', kanji: '明和', english: 'Meiwa', prefecture: '三重', suffix: '町' },
  { id: 'mie-odai', hiragana: 'おおだい', kanji: '大台', english: 'Odai', prefecture: '三重', suffix: '町' },
  { id: 'mie-tamaki', hiragana: 'たまき', kanji: '玉城', english: 'Tamaki', prefecture: '三重', suffix: '町' },
  { id: 'mie-watarai', hiragana: 'わたらい', kanji: '度会', english: 'Watarai', prefecture: '三重', suffix: '町' },
  { id: 'mie-taiki', hiragana: 'たいき', kanji: '大紀', english: 'Taiki', prefecture: '三重', suffix: '町' },
  { id: 'mie-minamiise', hiragana: 'みなみいせ', kanji: '南伊勢', english: 'Minamiise', prefecture: '三重', suffix: '町' },
  { id: 'mie-kihoku', hiragana: 'きほく', kanji: '紀北', english: 'Kihoku', prefecture: '三重', suffix: '町' },
  { id: 'mie-mihama', hiragana: 'みはま', kanji: '御浜', english: 'Mihama', prefecture: '三重', suffix: '町' },
  { id: 'mie-kiho', hiragana: 'きほう', kanji: '紀宝', english: 'Kiho', prefecture: '三重', suffix: '町' },

  // 日本の主要都市
  { id: 'tokyo', hiragana: 'とうきょう', kanji: '東京', english: 'Tokyo', prefecture: '東京', suffix: '都' },
  { id: 'osaka', hiragana: 'おおさか', kanji: '大阪', english: 'Osaka', prefecture: '大阪', suffix: '府' },
  { id: 'kobe', hiragana: 'こうべ', kanji: '神戸', english: 'Kobe', prefecture: '兵庫', suffix: '市' },
  { id: 'fukuoka', hiragana: 'ふくおか', kanji: '福岡', english: 'Fukuoka', prefecture: '福岡', suffix: '市' },
  { id: 'sapporo', hiragana: 'さっぽろ', kanji: '札幌', english: 'Sapporo', prefecture: '北海道', suffix: '市' },
  { id: 'hiroshima', hiragana: 'ひろしま', kanji: '広島', english: 'Hiroshima', prefecture: '広島', suffix: '市' },
  { id: 'sendai', hiragana: 'せんだい', kanji: '仙台', english: 'Sendai', prefecture: '宮城', suffix: '市' },
];

// ひらがな入力で都市を検索する関数
export const searchCitiesByHiragana = (query: string): CityData[] => {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return cityDatabase.filter(city => 
    city.hiragana.includes(normalizedQuery) ||
    city.kanji.includes(query) ||
    city.english.toLowerCase().includes(normalizedQuery)
  ).slice(0, 10); // 最大10件まで表示
};

// 都市データから英語名を取得
export const getCityEnglishName = (query: string): string => {
  // まず完全一致を探す
  const exactMatch = cityDatabase.find(city => 
    city.kanji === query || 
    city.hiragana === query ||
    `${city.kanji}${city.suffix}` === query
  );
  
  if (exactMatch) {
    return exactMatch.english;
  }
  
  // 部分一致を探す
  const partialMatch = cityDatabase.find(city => 
    city.kanji.includes(query) || 
    city.hiragana.includes(query)
  );
  
  if (partialMatch) {
    return partialMatch.english;
  }
  
  // 見つからない場合は元のクエリを返す
  return query;
}; 
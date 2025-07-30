import { GalleryImage } from '../types'

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/anime-characters/goku.jpg',
    alt: '悟空',
    title: '孫悟空',
    description: 'ドラゴンボールの主人公。サイヤ人の戦士',
    category: 'ドラゴンボール',
    width: 800,
    height: 600
  },
  {
    id: '2', 
    src: '/images/anime-characters/frieza.jpg',
    alt: 'フリーザ',
    title: 'フリーザ',
    description: 'ドラゴンボールの強敵。宇宙の帝王',
    category: 'ドラゴンボール',
    width: 800,
    height: 600
  },
  {
    id: '3',
    src: '/images/anime-characters/naruto.jpg', 
    alt: 'ナルト',
    title: 'うずまきナルト',
    description: 'NARUTOの主人公。忍者の少年',
    category: 'NARUTO',
    width: 800,
    height: 600
  },
  {
    id: '4',
    src: '/images/anime-characters/sasuke.jpg',
    alt: 'サスケ',
    title: 'うちはサスケ',
    description: 'NARUTOの登場人物。ナルトのライバル',
    category: 'NARUTO',
    width: 800,
    height: 600
  },
  {
    id: '5',
    src: '/images/anime-characters/tanjiro.jpg',
    alt: '炭治郎',
    title: '竈門炭治郎',
    description: '鬼滅の刃の主人公。心優しい鬼殺隊士',
    category: '鬼滅の刃',
    width: 800,
    height: 600
  },
  {
    id: '6',
    src: '/images/anime-characters/nezuko.jpg',
    alt: '禰豆子',
    title: '竈門禰豆子', 
    description: '鬼滅の刃のヒロイン。炭治郎の妹',
    category: '鬼滅の刃',
    width: 800,
    height: 600
  },
  {
    id: '7',
    src: '/images/anime-characters/giyu.jpg',
    alt: '義勇',
    title: '冨岡義勇',
    description: '鬼滅の刃の水柱。無表情だが心優しい',
    category: '鬼滅の刃',
    width: 800,
    height: 600
  },
  {
    id: '8',
    src: '/images/anime-characters/zoro.jpg',
    alt: 'ゾロ',
    title: 'ロロノア・ゾロ',
    description: 'ワンピースの剣士。三刀流の使い手',
    category: 'ワンピース',
    width: 800,
    height: 600
  },
  {
    id: '9',
    src: '/images/anime-characters/edward.jpg',
    alt: 'エドワード',
    title: 'エドワード・エルリック',
    description: '鋼の錬金術師の主人公。天才錬金術師',
    category: '鋼の錬金術師',
    width: 800,
    height: 600
  },
  {
    id: '10',
    src: '/images/anime-characters/asuka.jpg',
    alt: 'アスカ',
    title: '惣流・アスカ・ラングレー',
    description: 'エヴァンゲリオンのパイロット。気が強い',
    category: 'エヴァンゲリオン',
    width: 800,
    height: 600
  },
  {
    id: '11',
    src: '/images/anime-characters/sailormoon.jpg',
    alt: 'セーラームーン',
    title: '月野うさぎ',
    description: 'セーラームーンの主人公。愛と正義の戦士',
    category: 'セーラームーン',
    width: 800,
    height: 600
  }
]

export const getImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === id)
}

export const getImagesByCategory = (category: string): GalleryImage[] => {
  return galleryImages.filter(image => image.category === category)
}

export const getAllCategories = (): string[] => {
  const categories = galleryImages.map(image => image.category).filter(Boolean) as string[]
  return [...new Set(categories)]
} 
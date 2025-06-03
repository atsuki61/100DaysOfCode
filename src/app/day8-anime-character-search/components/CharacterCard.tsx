'use client'

import { AnimeCharacter } from '../types'
import Image from 'next/image'

interface CharacterCardProps {
  character: AnimeCharacter
}

const categoryLabels = {
  protagonist: '主人公',
  antagonist: '敵役',
  supporting: 'サポート'
}

const categoryColors = {
  protagonist: 'bg-green-100 text-green-800',
  antagonist: 'bg-red-100 text-red-800',
  supporting: 'bg-blue-100 text-blue-800'
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
        {character.imageUrl ? (
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200">
            <span className="text-4xl font-bold text-gray-600">
              {character.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[character.category]}`}>
            {categoryLabels[character.category]}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
          {character.name}
        </h3>
        <p className="text-sm text-purple-600 font-medium mb-2">
          {character.animeName}
        </p>
        <p className="text-sm text-gray-600 mb-3 overflow-hidden" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const
        }}>
          {character.description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {character.series}
          </span>
        </div>
      </div>
    </div>
  )
} 
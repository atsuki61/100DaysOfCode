'use client'

import { useState, useMemo } from 'react'
import { GalleryImage, ModalState } from '../types'

interface UseGalleryProps {
  images: GalleryImage[]
}

export function useGallery({ images }: UseGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    currentImageIndex: 0
  })

  // フィルタリングされた画像
  const filteredImages = useMemo(() => {
    if (!selectedCategory) return images
    return images.filter(image => image.category === selectedCategory)
  }, [images, selectedCategory])

  // 利用可能なカテゴリ
  const categories = useMemo(() => {
    const cats = images.map(image => image.category).filter(Boolean) as string[]
    return [...new Set(cats)]
  }, [images])

  // 現在の画像
  const currentImage = useMemo(() => {
    return filteredImages[modalState.currentImageIndex] || null
  }, [filteredImages, modalState.currentImageIndex])

  // モーダルを開く
  const openModal = (index: number) => {
    setModalState({
      isOpen: true,
      currentImageIndex: index
    })
  }

  // モーダルを閉じる
  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }))
  }

  // 前の画像へ
  const goToPrevious = () => {
    setModalState(prev => ({
      ...prev,
      currentImageIndex: 
        prev.currentImageIndex > 0 
          ? prev.currentImageIndex - 1 
          : filteredImages.length - 1
    }))
  }

  // 次の画像へ
  const goToNext = () => {
    setModalState(prev => ({
      ...prev,
      currentImageIndex: 
        prev.currentImageIndex < filteredImages.length - 1 
          ? prev.currentImageIndex + 1 
          : 0
    }))
  }

  // カテゴリ変更
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    // モーダルが開いている場合は閉じる
    if (modalState.isOpen) {
      closeModal()
    }
  }

  return {
    // State
    selectedCategory,
    modalState,
    
    // Computed
    filteredImages,
    categories,
    currentImage,
    
    // Actions
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
    handleCategoryChange
  }
} 
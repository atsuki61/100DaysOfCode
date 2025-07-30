export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description?: string
  category?: string
  width?: number
  height?: number
}

export interface ModalState {
  isOpen: boolean
  currentImageIndex: number
} 
'use client'

import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: { src: string; alt: string }[]
  currentIndex: number
  onPrev?: () => void
  onNext?: () => void
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
}: LightboxProps) {
  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white"
        onClick={onClose}
        aria-label="Закрыть"
      >
        <X size={32} />
      </button>

      {onPrev && images.length > 1 && (
        <button
          className="absolute left-4 text-white/70 hover:text-white"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Предыдущее фото"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      <div
        className="relative w-[95vw] h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
        />
        <p className="absolute -bottom-10 left-0 right-0 text-center text-white/60 text-sm">
          {currentImage.alt}
        </p>
      </div>

      {onNext && images.length > 1 && (
        <button
          className="absolute right-4 text-white/70 hover:text-white"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Следующее фото"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // the minimum distance to be considered as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation()
    setTouchEnd(null) // otherwise the swipe is fired even with very small moves
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (touchStart === null || touchEnd === null) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onNext) {
      onNext()
    }
    if (isRightSwipe && onPrev) {
      onPrev()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center touch-none"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        className="absolute top-4 right-4 z-[110] text-white/70 hover:text-white p-2"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Закрыть"
      >
        <X size={32} />
      </button>

      {onPrev && images.length > 1 && (
        <button
          className="absolute left-4 z-[110] text-white/70 hover:text-white"
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
        className="relative w-[95vw] h-[85vh] z-[105]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain pointer-events-none"
        />
      </div>

      {onNext && images.length > 1 && (
        <button
          className="absolute right-4 z-[110] text-white/70 hover:text-white"
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

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

export default function About() {
  const [showLightbox, setShowLightbox] = useState(false)

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-6">
              О гостевом доме
            </p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] mb-8 text-balance">
              Место, где море <br />
              <span className="italic">встречает покой</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Гостевой дом Sunrise расположен на живописном мысе Пицунда — одном из самых
              чистых уголков черноморского побережья. Здесь, среди вековых реликтовых сосен
              и кристально чистой воды, мы создали пространство для истинного отдыха.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { num: '0,3 км', label: 'От центра города' },
                { num: '1,1 км', label: 'От Чёрного моря Абхазии' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-light text-primary">{stat.num}</p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 md:order-2">
            <button
              onClick={() => setShowLightbox(true)}
              className="w-full aspect-[4/5] relative overflow-hidden group shadow-2xl"
            >
              <Image
                src="/images/1B0A1205.jpg"
                alt="Интерьер и детали декора в гостевом доме Sunrise"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
            </button>
            {/* Decorative frame */}
            <div className="absolute -top-8 -right-8 w-1/2 h-1/2 border border-primary/40 -z-10" />
            <div className="absolute -bottom-8 -left-8 w-1/2 h-1/2 border border-primary/40 -z-10" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        images={[{ src: '/images/1B0A1205.jpg', alt: 'Интерьер гостевого дома' }]}
        currentIndex={0}
      />
    </section>
  )
}

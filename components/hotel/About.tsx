'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

export default function About() {
  const [showLightbox, setShowLightbox] = useState(false)

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-4">
              О нас
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-6 text-balance">
              Место, где море
              <br />
              <em>встречает покой</em>
            </h2>
            <div className="w-12 h-px bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-5">
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
          <div className="relative">
            <button
              onClick={() => setShowLightbox(true)}
              className="w-full aspect-[4/5] relative overflow-hidden group"
            >
              <Image
                src="/images/placeholder.svg"
                alt="Пляж Пицунды"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </button>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 border border-primary/30 -z-10" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        images={[{ src: '/images/placeholder.svg', alt: 'Пляж Пицунды' }]}
        currentIndex={0}
      />
    </section>
  )
}

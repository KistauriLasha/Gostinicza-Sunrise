'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShowerHead, Wifi, Wind, Coffee, Refrigerator, Sofa } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Room } from '@/lib/rooms-data'

const icons: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={14} aria-hidden="true" />,
  'Система кондиционирования': <Wind size={14} aria-hidden="true" />,
  'Душ': <ShowerHead size={14} aria-hidden="true" />,
  'Отдельная гостиная': <Sofa size={14} aria-hidden="true" />,
  'Чайник': <Coffee size={14} aria-hidden="true" />,
  'Холодильник': <Refrigerator size={14} aria-hidden="true" />,
}

interface RoomBookingCardProps {
  room: Room
}

export function RoomBookingCard({ room }: RoomBookingCardProps) {
  return (
    <>
      <article className="group bg-card overflow-hidden w-full">
        <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]">
          {/* Image Section */}
          <Link href={`/rooms/${room.id}`} className="block relative h-64 md:h-full min-h-[240px] overflow-hidden">
            <Image
              src={room.image}
              alt={room.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 380px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors" />
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                {room.size}
              </span>
            </div>
          </Link>

          {/* Content Section */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">
                {room.subtitle}
              </p>
              <Link href={`/rooms/${room.id}`}>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground hover:text-primary transition-colors">
                  {room.title}
                </h3>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {room.features.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-2 py-1"
                >
                  {icons[f]}
                  {f}
                </span>
              ))}
            </div>

            {/* Price & Date Picker Section */}
            <div className="mt-auto space-y-4">
              {/* Price Display */}
              <div className="flex items-baseline gap-2">
                <p className="text-xs text-muted-foreground">от</p>
                <p className="font-serif text-3xl text-primary font-light">
                  {room.price} ₽
                </p>
                <span className="text-sm text-muted-foreground">/ ночь</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 py-6 text-sm tracking-widest uppercase border-primary text-primary hover:bg-primary/5 transition-colors duration-300"
                >
                  <Link href={`/rooms/${room.id}`}>Подробнее</Link>
                </Button>
                <Button
                  asChild
                  className="flex-1 py-6 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300"
                >
                  <a href="https://azur.ru/picunda/o/25451" target="_blank" rel="noopener noreferrer">
                    Забронировать
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

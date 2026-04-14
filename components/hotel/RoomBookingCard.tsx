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
      <article className="group bg-card w-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1.2fr_0.8fr] gap-0">
          {/* Image Section */}
          <Link href={`/rooms/${room.id}`} className="block relative h-80 md:h-full min-h-[400px] overflow-hidden">
            <Image
              src={room.image}
              alt={room.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute top-8 left-8 bg-background px-4 py-2 shadow-sm">
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
                {room.size}
              </span>
            </div>
          </Link>

          {/* Content Section */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center border-y md:border-y-0 md:border-r border-border/50">
            {/* Header */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium mb-3">
                {room.subtitle}
              </p>
              <Link href={`/rooms/${room.id}`}>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground hover:text-primary transition-colors leading-tight">
                  {room.title}
                </h3>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-10">
              {room.features.slice(0, 4).map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider"
                >
                  <span className="text-primary/60">{icons[f]}</span>
                  {f}
                </span>
              ))}
            </div>

            {/* Price & Actions */}
            <div className="mt-8 pt-10 border-t border-border/60">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-baseline gap-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Цена от</p>
                  <p className="font-serif text-4xl text-primary font-light">
                    {room.price} ₽
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 h-14 text-[10px] tracking-[0.3em] uppercase border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500"
                >
                  <Link href={`/rooms/${room.id}`}>Подробнее</Link>
                </Button>
                <Button
                  asChild
                  className="flex-1 h-14 text-[10px] tracking-[0.3em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500"
                >
                  <a href={room.bookingUrl || "https://azur.ru/picunda/o/25451"} target="_blank" rel="noopener noreferrer">
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

'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import type { Room } from '@/lib/rooms-data'

interface RoomBookingSidebarProps {
  room: Room
}

export default function RoomBookingSidebar({ room }: RoomBookingSidebarProps) {
  return (
    <>
      <div className="sticky top-8 bg-card border border-border p-6 space-y-6">
        {/* Price */}
        <div>
          <p className="text-xs text-muted-foreground">от</p>
          <p className="font-serif text-3xl text-primary font-light">
            {room.price} ₽
            <span className="text-base text-muted-foreground font-sans"> / ночь</span>
          </p>
        </div>

        {/* Room Info */}
        <div className="space-y-4 pb-6 border-b border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Площадь</span>
            <span className="text-foreground">{room.size}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Вместимость</span>
            <span className="text-foreground">До {room.capacity} гостей</span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          asChild
          className="w-full py-6 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300"
        >
          <a href="https://azur.ru/picunda/o/25451" target="_blank" rel="noopener noreferrer">
            Забронировать
          </a>
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Бесплатная отмена за 24 часа до заезда
        </p>
      </div>

    </>
  )
}

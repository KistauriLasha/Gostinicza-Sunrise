'use client'

import { rooms } from '@/lib/rooms-data'
import { RoomBookingCard } from './RoomBookingCard'

export default function RoomsBooking() {
  return (
    <section id="rooms-booking" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground mb-3">
            Бронирование
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground text-balance">
            Выберите номер
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ознакомьтесь с нашими номерами и выберите наиболее подходящий для вашего отдыха.
            Для бронирования перейдите на страницу гостевого дома на Azur.ru.
          </p>
          <div className="w-12 h-px bg-primary mx-auto mt-6" />
        </div>

        <div className="space-y-8">
          {rooms.map((room) => (
            <RoomBookingCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}

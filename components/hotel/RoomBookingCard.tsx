'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { ShowerHead, Wifi, Wind, Coffee, Refrigerator, Sofa, CalendarX2, Moon, CreditCard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DateRangePicker } from './DateRangePicker'
import { BookingModal } from './BookingModal'
import {
  checkAvailability,
  calculateNights,
  calculateTotalPrice,
  formatPrice,
  parsePriceString,
} from '@/lib/bookings-store'
import type { Room } from '@/lib/rooms-data'
import { useBookedDates } from '@/hooks/use-booked-dates'

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
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { bookedDates } = useBookedDates(room.id)

  const pricePerNight = parsePriceString(room.price)
  const nights = dateRange?.from && dateRange?.to 
    ? calculateNights(dateRange.from, dateRange.to) 
    : 0
  const totalPrice = dateRange?.from && dateRange?.to 
    ? calculateTotalPrice(pricePerNight, dateRange.from, dateRange.to) 
    : 0

  // Check availability when dates change
  const isAvailable = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return true
    const { available } = checkAvailability(dateRange.from, dateRange.to, bookedDates)
    return available
  }, [dateRange, bookedDates])

  const handleBookNow = () => {
    setIsModalOpen(true)
  }

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

              {/* Date Range Picker */}
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                disabledDates={bookedDates}
                variant="dual"
              />

              {/* Price Calculation */}
              {dateRange?.from && dateRange?.to && (
                <div className="bg-secondary p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Moon className="h-4 w-4" aria-hidden="true" />
                      {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
                    </span>
                    <span className="text-muted-foreground">
                      {room.price} ₽ × {nights}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2">
                    <span className="flex items-center gap-2 font-medium">
                      <CreditCard className="h-4 w-4" aria-hidden="true" />
                      Итого
                    </span>
                    <span className="font-serif text-xl text-primary">
                      {formatPrice(totalPrice)} ₽
                    </span>
                  </div>
                </div>
              )}

              {/* Availability Status & Book Button */}
              {dateRange?.from && dateRange?.to && !isAvailable ? (
                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive">
                  <CalendarX2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Номер занят</p>
                    <p className="text-sm opacity-80">
                      Выбранные даты недоступны для бронирования
                    </p>
                  </div>
                </div>
              ) : !dateRange?.from || !dateRange?.to ? (
                <Button
                  asChild
                  className="w-full py-6 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300"
                >
                  <Link href={`/rooms/${room.id}`}>Подробнее</Link>
                </Button>
              ) : (
                <Button
                  onClick={handleBookNow}
                  className="w-full py-6 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300"
                >
                  Забронировать
                </Button>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Booking Modal */}
      <BookingModal
        room={room}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialDateRange={dateRange}
      />
    </>
  )
}

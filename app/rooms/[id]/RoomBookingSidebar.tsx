'use client'

import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { CalendarX2, Moon, CreditCard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/hotel/DateRangePicker'
import { BookingModal } from '@/components/hotel/BookingModal'
import {
  checkAvailability,
  calculateNights,
  calculateTotalPrice,
  formatPrice,
  parsePriceString,
} from '@/lib/bookings-store'
import type { Room } from '@/lib/rooms-data'
import { useBookedDates } from '@/hooks/use-booked-dates'

interface RoomBookingSidebarProps {
  room: Room
}

export default function RoomBookingSidebar({ room }: RoomBookingSidebarProps) {
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

        {/* Date Picker */}
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Выберите даты
          </p>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            disabledDates={bookedDates}
          />
        </div>

        {/* Price Calculation */}
        {dateRange?.from && dateRange?.to && (
          <div className="bg-secondary p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Moon className="h-4 w-4" />
                {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
              </span>
              <span className="text-muted-foreground">
                {room.price} ₽ × {nights}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="flex items-center gap-2 font-medium">
                <CreditCard className="h-4 w-4" />
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
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            <CalendarX2 className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Номер занят</p>
              <p className="text-xs opacity-80">
                Выберите другие даты
              </p>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={!dateRange?.from || !dateRange?.to}
            className="w-full py-6 text-sm tracking-widest uppercase bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300 disabled:opacity-50"
          >
            {!dateRange?.from || !dateRange?.to
              ? 'Выберите даты'
              : 'Забронировать'
            }
          </Button>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Бесплатная отмена за 24 часа до заезда
        </p>
      </div>

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

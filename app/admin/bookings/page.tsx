'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarCheck, User, Phone, Calendar, CreditCard, RefreshCw } from 'lucide-react'

import { getAllBookings, formatPrice, type Booking } from '@/lib/bookings-store'
import { getRoomById } from '@/lib/rooms-data'
import { Button } from '@/components/ui/button'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([])
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const refreshBookings = React.useCallback(() => {
    setIsRefreshing(true)
    // Simulate network delay
    setTimeout(() => {
      setBookings(getAllBookings())
      setIsRefreshing(false)
    }, 300)
  }, [])

  React.useEffect(() => {
    refreshBookings()
  }, [refreshBookings])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.35em] uppercase mb-2 text-primary-foreground/70">
            Панель управления
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light">
            Бронирования
          </h1>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-6">
            <div className="bg-card border border-border p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Всего бронирований</p>
              <p className="font-serif text-3xl text-primary">{bookings.length}</p>
            </div>
            <div className="bg-card border border-border p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Общий доход</p>
              <p className="font-serif text-3xl text-primary">
                {formatPrice(bookings.reduce((sum, b) => sum + b.totalPrice, 0))} ₽
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={refreshBookings}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border">
              <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Бронирования пока отсутствуют</p>
            </div>
          ) : (
            bookings.map((booking) => {
              const room = getRoomById(booking.roomId)
              return (
                <div
                  key={booking.id}
                  className="bg-card border border-border p-6 grid md:grid-cols-[1fr_auto] gap-6"
                >
                  <div className="space-y-4">
                    {/* Room & Guest Info */}
                    <div>
                      <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                        Номер
                      </p>
                      <p className="font-serif text-xl text-foreground">
                        {room?.title || booking.roomId}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.guestName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.guestPhone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(booking.checkIn), 'd MMMM yyyy', { locale: ru })} —{' '}
                        {format(new Date(booking.checkOut), 'd MMMM yyyy', { locale: ru })}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col justify-center items-end">
                    <p className="text-xs text-muted-foreground mb-1">К оплате</p>
                    <p className="font-serif text-2xl text-primary flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {formatPrice(booking.totalPrice)} ₽
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Создано: {format(new Date(booking.createdAt), 'd MMM yyyy, HH:mm', { locale: ru })}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </main>
  )
}

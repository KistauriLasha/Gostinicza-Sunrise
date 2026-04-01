'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarCheck, User, Phone, Calendar, CreditCard, RefreshCw, Trash2, Loader2 } from 'lucide-react'

import { formatPrice, calculateNights, calculateTotalPrice, parsePriceString } from '@/lib/bookings-store'
import { getRoomById } from '@/lib/rooms-data'
import { Button } from '@/components/ui/button'

interface DbBooking {
  id: number;
  room_id: string;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_phone: string;
  adults: number;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<DbBooking[]>([])
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<number | null>(null)

  const refreshBookings = React.useCallback(async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch('/book')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить это бронирование?')) return

    setDeletingId(id)
    try {
      const response = await fetch(`/book?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await refreshBookings()
      } else {
        alert('Ошибка при удалении бронирования')
      }
    } catch (error) {
      console.error('Failed to delete booking:', error)
      alert('Сетевая ошибка при удалении')
    } finally {
      setDeletingId(null)
    }
  }

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
                {formatPrice(bookings.reduce((sum, b) => {
                  const room = getRoomById(b.room_id)
                  if (!room) return sum
                  const price = calculateTotalPrice(
                    parsePriceString(room.price),
                    new Date(b.check_in),
                    new Date(b.check_out)
                  )
                  return sum + price
                }, 0))} ₽
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
              const room = getRoomById(booking.room_id)
              const price = room ? calculateTotalPrice(
                parsePriceString(room.price),
                new Date(booking.check_in),
                new Date(booking.check_out)
              ) : 0

              return (
                <div
                  key={booking.id}
                  className="bg-card border border-border p-6 grid md:grid-cols-[1fr_auto] gap-6 items-start"
                >
                  <div className="space-y-4">
                    {/* Room & Guest Info */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                          Номер
                        </p>
                        <p className="font-serif text-xl text-foreground">
                          {room?.title || booking.room_id}
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.guest_name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.guest_phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(booking.check_in), 'd MMMM yyyy', { locale: ru })} —{' '}
                        {format(new Date(booking.check_out), 'd MMMM yyyy', { locale: ru })}
                      </span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-col md:items-end gap-6">
                    <div className="flex flex-col md:items-end">
                      <p className="text-xs text-muted-foreground mb-1">К оплате</p>
                      <p className="font-serif text-2xl text-primary flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {formatPrice(price)} ₽
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Создано: {format(new Date(booking.created_at), 'd MMM yyyy, HH:mm', { locale: ru })}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(booking.id)}
                      disabled={deletingId === booking.id}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 self-start md:self-auto"
                    >
                      {deletingId === booking.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Удалить
                    </Button>
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

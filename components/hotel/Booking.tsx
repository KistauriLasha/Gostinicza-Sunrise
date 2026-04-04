'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { Calendar, User, CreditCard, Moon } from 'lucide-react'
import { DateRangePicker } from './DateRangePicker'
import { useBookedDates } from '@/hooks/use-booked-dates'
import {
  checkAvailability,
  calculateNights,
  calculateTotalPrice,
  formatPrice,
  parsePriceString
} from '@/lib/bookings-store'
import { getRoomById } from '@/lib/rooms-data'

export default function Booking() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [form, setForm] = useState({
    adults: '2',
    room: 'deluxe',
    name: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [isCancelled, setIsCancelled] = useState(false)

  const { bookedDates, refresh: refreshBookedDates } = useBookedDates(form.room)

  const selectedRoom = useMemo(() => getRoomById(form.room), [form.room])
  const nights = useMemo(() => (dateRange?.from && dateRange?.to ? calculateNights(dateRange.from, dateRange.to) : 0), [dateRange])
  const totalPrice = useMemo(() => {
    if (!selectedRoom || !dateRange?.from || !dateRange?.to) return 0
    return calculateTotalPrice(parsePriceString(selectedRoom.price), dateRange.from, dateRange.to)
  }, [selectedRoom, dateRange])

  const isAvailable = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return true
    const { available } = checkAvailability(dateRange.from, dateRange.to, bookedDates)
    return available
  }, [dateRange, bookedDates])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!dateRange?.from || !dateRange?.to) {
      setError('Пожалуйста, выберите даты заезда и выезда')
      setIsSubmitting(false)
      return
    }

    if (!isAvailable) {
      setError('Выбранные даты уже забронированы. Пожалуйста, выберите другие даты.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          checkIn: format(dateRange.from, 'yyyy-MM-dd'),
          checkOut: format(dateRange.to, 'yyyy-MM-dd'),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setBookingId(data.bookingId)
        refreshBookedDates()
        setSubmitted(true)
      } else {
        setError(data.error || 'Произошла ошибка при бронировании. Пожалуйста, попробуйте еще раз.')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('Произошла сетевая ошибка. Проверьте подключение и попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteBooking = async () => {
    if (!bookingId) return

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/book?id=${bookingId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setIsCancelled(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Произошла ошибка при удалении бронирования')
      }
    } catch (err) {
      console.error('Delete error:', err)
      setError('Произошла сетевая ошибка при удалении')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section id="booking" className="py-24 bg-primary">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-primary-foreground/70 mb-3">
            Бронирование
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-primary-foreground text-balance">
            Запланируйте отдых
          </h2>
          <div className="w-12 h-px bg-primary-foreground/40 mx-auto mt-6" />
        </div>

        {submitted ? (
          <div className="bg-background p-8 md:p-12">
            <div className="text-center mb-10">
              <p className="font-serif text-3xl text-primary font-light mb-4">
                {isCancelled ? 'Бронирование удалено' : 'Бронирование подтверждено!'}
              </p>
              <p className="text-muted-foreground">
                {isCancelled
                  ? 'Ваше бронирование было успешно удалено из системы.'
                  : 'Ваше бронирование успешно создано. Мы сохранили информацию и свяжемся с вами в ближайшее время.'
                }
              </p>
            </div>

            {!isCancelled && (
              <div className="max-w-md mx-auto mb-10 space-y-4">
                <div className="bg-secondary p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Гость:</span>
                    <span className="font-medium ml-auto">{form.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Даты:</span>
                    <span className="font-medium ml-auto">
                      {dateRange?.from && dateRange?.to && (
                        <>
                          {format(dateRange.from, 'd MMM', { locale: ru })} — {format(dateRange.to, 'd MMM yyyy', { locale: ru })}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Moon className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Ночей:</span>
                    <span className="font-medium ml-auto">{nights}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-4 w-4 flex items-center justify-center text-primary font-bold">№</div>
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Номер:</span>
                    <span className="font-medium ml-auto">{selectedRoom?.title}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Итого к оплате</span>
                    </div>
                    <span className="font-serif text-2xl text-primary">{formatPrice(totalPrice)} ₽</span>
                  </div>
                </div>
                {bookingId && (
                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.2em]">
                    ID бронирования: {bookingId}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false)
                  setBookingId(null)
                  setIsCancelled(false)
                  setDateRange(undefined)
                  setForm({
                    adults: '2',
                    room: 'deluxe',
                    name: '',
                    phone: '',
                  })
                }}
                className="px-8 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase hover:bg-accent transition-colors"
              >
                Забронировать еще раз
              </button>

              {!isCancelled && bookingId && (
                <button
                  onClick={handleDeleteBooking}
                  disabled={isDeleting}
                  className="px-8 py-3 border border-destructive text-destructive text-xs tracking-[0.25em] uppercase hover:bg-destructive hover:text-destructive-foreground transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Удаление...' : 'Удалить бронирование'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-background p-8 md:p-12">
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive text-sm">
                {error}
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Dates */}
              <div className="md:col-span-2">
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Выберите даты проживания
                </label>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  disabledDates={bookedDates}
                  variant="dual"
                />
                {!isAvailable && dateRange?.from && dateRange?.to && (
                  <p className="text-destructive text-xs mt-2 uppercase tracking-wider">
                    Этот номер уже забронирован на выбранные даты
                  </p>
                )}
              </div>
              {/* Guests + Room type */}
              <div>
                <label htmlFor="adults" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Взрослых
                </label>
                <select
                  id="adults"
                  value={form.adults}
                  onChange={(e) => setForm({ ...form, adults: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {['1', '2', '3', '4'].map((n) => (
                    <option key={n} value={n}>{n} {n === '1' ? 'взрослый' : 'взрослых'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="roomType" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Тип номера
                </label>
                <select
                  id="roomType"
                  value={form.room}
                  onChange={(e) => setForm({ ...form, room: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="deluxe">Делюкс</option>
                  <option value="deluxe-comfort">Делюкс комфорт</option>
                  <option value="deluxe-king">Делюкс king-size</option>
                  <option value="junior-suite">Полулюкс</option>
                  <option value="suite">Улучшенный люкс</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Ваше имя
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+7 (000) 000-00-00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !isAvailable || !dateRange?.from || !dateRange?.to}
                className="px-16 py-4 bg-primary text-primary-foreground text-sm tracking-[0.25em] uppercase hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
              <p className="text-xs text-muted-foreground mt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

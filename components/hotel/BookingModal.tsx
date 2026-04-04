'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'
import { Check, Calendar, Moon, CreditCard, User, Phone, Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DateRangePicker } from './DateRangePicker'
import {
  checkAvailability,
  calculateNights,
  calculateTotalPrice,
  formatPrice,
  parsePriceString,
} from '@/lib/bookings-store'
import type { Room } from '@/lib/rooms-data'
import { useBookedDates } from '@/hooks/use-booked-dates'

interface BookingModalProps {
  room: Room
  open: boolean
  onOpenChange: (open: boolean) => void
  initialDateRange?: DateRange
}

type BookingStep = 'dates' | 'details' | 'confirmation' | 'success'

export function BookingModal({
  room,
  open,
  onOpenChange,
  initialDateRange,
}: BookingModalProps) {
  const [step, setStep] = React.useState<BookingStep>('dates')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(initialDateRange)
  const [guestName, setGuestName] = React.useState('')
  const [guestPhone, setGuestPhone] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [bookingId, setBookingId] = React.useState<string | null>(null)
  const [isCancelled, setIsCancelled] = React.useState(false)
  const { bookedDates, refresh: refreshBookedDates } = useBookedDates(room.id)

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

  // Reset modal state when opened
  React.useEffect(() => {
    if (open) {
      refreshBookedDates()
      setStep('dates')
      setError(null)
      if (!initialDateRange) {
        setDateRange(undefined)
      }
    }
  }, [open, room.id, initialDateRange])

  // Update date range when initial value changes
  React.useEffect(() => {
    if (initialDateRange) {
      setDateRange(initialDateRange)
    }
  }, [initialDateRange])

  const handleContinueToDetails = () => {
    if (!dateRange?.from || !dateRange?.to) {
      setError('Пожалуйста, выберите даты заезда и выезда')
      return
    }
    if (!isAvailable) {
      setError('Номер занят на выбранные даты. Пожалуйста, выберите другие даты.')
      return
    }
    setError(null)
    setStep('details')
  }

  const handleContinueToConfirmation = () => {
    if (!guestName.trim()) {
      setError('Пожалуйста, введите ваше имя')
      return
    }
    if (!guestPhone.trim()) {
      setError('Пожалуйста, введите номер телефона')
      return
    }
    setError(null)
    setStep('confirmation')
  }

  const handleConfirmBooking = async () => {
    if (!dateRange?.from || !dateRange?.to) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room: room.id,
          checkIn: format(dateRange.from, 'yyyy-MM-dd'),
          checkOut: format(dateRange.to, 'yyyy-MM-dd'),
          name: guestName,
          phone: guestPhone,
          adults: room.capacity.toString(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setBookingId(data.bookingId)
        refreshBookedDates()
        setStep('success')
      } else {
        setError(data.error || 'Произошла ошибка при бронировании')
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

  const handleClose = () => {
    onOpenChange(false)
    // Reset form after animation
    setTimeout(() => {
      setStep('dates')
      setDateRange(initialDateRange)
      setGuestName('')
      setGuestPhone('')
      setBookingId(null)
      setIsCancelled(false)
      setError(null)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Header with room info */}
        <div className="bg-primary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-light">
              {step === 'success' ? 'Бронирование подтверждено!' : room.title}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70">
              {step === 'success' 
                ? 'Спасибо за ваше бронирование'
                : `${room.size} • До ${room.capacity} гостей`
              }
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          {/* Step: Select Dates */}
          {step === 'dates' && (
            <div className="space-y-6">
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                  Выберите даты проживания
                </Label>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  disabledDates={bookedDates}
                  variant="dual"
                />
              </div>

              {dateRange?.from && dateRange?.to && (
                <div className="bg-secondary p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                    <Moon className="h-4 w-4" aria-hidden="true" />
                      Количество ночей
                    </span>
                    <span className="font-medium">{nights}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
                      Цена за ночь
                    </span>
                    <span className="font-medium">{room.price} ₽</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="font-medium">Итого</span>
                    <span className="font-serif text-2xl text-primary">{formatPrice(totalPrice)} ₽</span>
                  </div>
                </div>
              )}

              {!isAvailable && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 text-sm">
                  Номер занят на выбранные даты. Пожалуйста, выберите другие даты.
                </div>
              )}

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 text-sm">
                  {error}
                </div>
              )}

              <DialogFooter>
                <Button
                  onClick={handleContinueToDetails}
                  disabled={!dateRange?.from || !dateRange?.to || !isAvailable}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent"
                >
                  Продолжить
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Step: Guest Details */}
          {step === 'details' && (
            <div className="space-y-6">
              <div className="bg-secondary p-4 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Даты проживания</p>
                  <p className="font-medium">
                    {dateRange?.from && dateRange?.to && (
                      <>
                        {format(dateRange.from, 'd MMM', { locale: ru })} — {format(dateRange.to, 'd MMM yyyy', { locale: ru })}
                        <span className="text-muted-foreground ml-2">({nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'})</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="guestName" className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Ваше имя
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="guestName"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Иван Иванов"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="guestPhone" className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Телефон
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="guestPhone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 text-sm">
                  {error}
                </div>
              )}

              <DialogFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  onClick={handleContinueToConfirmation}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent"
                >
                  Продолжить
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setStep('dates')}
                  className="w-full"
                >
                  Назад
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Step: Confirmation */}
          {step === 'confirmation' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl">Подтвердите бронирование</h3>
                
                <div className="bg-secondary p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Номер</span>
                    <span className="font-medium">{room.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Даты</span>
                    <span className="font-medium">
                      {dateRange?.from && dateRange?.to && (
                        <>
                          {format(dateRange.from, 'd MMM', { locale: ru })} — {format(dateRange.to, 'd MMM', { locale: ru })}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Количество ночей</span>
                    <span className="font-medium">{nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Гость</span>
                    <span className="font-medium">{guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Телефон</span>
                    <span className="font-medium">{guestPhone}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-medium">Итого к оплате</span>
                    <span className="font-serif text-xl text-primary">{formatPrice(totalPrice)} ₽</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 text-sm">
                  {error}
                </div>
              )}

              <DialogFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Оформление...
                    </>
                  ) : (
                    'Подтвердить бронирование'
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setStep('details')}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Назад
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  {isCancelled
                    ? 'Ваше бронирование было успешно удалено.'
                    : <>Ваше бронирование на номер <strong>{room.title}</strong> успешно оформлено.</>
                  }
                </p>
                {!isCancelled && (
                  <p className="text-muted-foreground">
                    Мы сохранили информацию и свяжемся с вами в ближайшее время.
                  </p>
                )}
              </div>

              {!isCancelled && (
                <div className="bg-secondary p-6 space-y-4 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Гость:</span>
                    <span className="font-medium ml-auto">{guestName}</span>
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
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Итого</span>
                    </div>
                    <span className="font-serif text-xl text-primary">{formatPrice(totalPrice)} ₽</span>
                  </div>
                  {bookingId && (
                    <div className="pt-2 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                        ID бронирования: {bookingId}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 text-sm">
                  {error}
                </div>
              )}

              <DialogFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  onClick={handleClose}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent"
                >
                  Закрыть
                </Button>
                {!isCancelled && bookingId && (
                  <Button
                    variant="ghost"
                    onClick={handleDeleteBooking}
                    disabled={isDeleting}
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Удаление...
                      </>
                    ) : (
                      'Удалить бронирование'
                    )}
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

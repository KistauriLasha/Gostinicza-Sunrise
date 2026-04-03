'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  disabledDates?: { from: Date; to: Date }[]
  className?: string
  variant?: 'single' | 'dual'
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabledDates = [],
  className,
  variant = 'single',
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Create a function to check if a date should be disabled
  const isDateDisabled = (date: Date): boolean => {
    // Disable past dates
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return true

    // Disable dates that fall within booked ranges
    for (const range of disabledDates) {
      const from = new Date(range.from)
      const to = new Date(range.to)
      from.setHours(0, 0, 0, 0)
      to.setHours(0, 0, 0, 0)
      
      if (date >= from && date < to) {
        return true
      }
    }
    return false
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {variant === 'dual' ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                className={cn(
                  'w-full justify-start text-left font-normal h-auto py-3 px-4 border-border bg-background hover:bg-secondary',
                  !dateRange?.from && 'text-muted-foreground'
                )}
              >
                <CalendarIcon aria-hidden="true" className="mr-3 h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">Дата заезда</span>
                  <span className="text-sm text-foreground truncate">
                    {dateRange?.from ? format(dateRange.from, 'd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                  </span>
                </div>
              </Button>
              <Button
                variant="outline"
                type="button"
                className={cn(
                  'w-full justify-start text-left font-normal h-auto py-3 px-4 border-border bg-background hover:bg-secondary',
                  !dateRange?.to && 'text-muted-foreground'
                )}
              >
                <CalendarIcon aria-hidden="true" className="mr-3 h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">Дата выезда</span>
                  <span className="text-sm text-foreground truncate">
                    {dateRange?.to ? format(dateRange.to, 'd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                  </span>
                </div>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              type="button"
              className={cn(
                'w-full justify-start text-left font-normal h-auto py-3 px-4 border-border bg-background hover:bg-secondary',
                !dateRange && 'text-muted-foreground'
              )}
            >
              <CalendarIcon aria-hidden="true" className="mr-3 h-4 w-4 text-muted-foreground" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Даты проживания</span>
                    <span className="text-foreground">
                      {format(dateRange.from, 'd MMM', { locale: ru })} — {format(dateRange.to, 'd MMM yyyy', { locale: ru })}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Дата заезда</span>
                    <span className="text-foreground">{format(dateRange.from, 'd MMMM yyyy', { locale: ru })}</span>
                  </div>
                )
              ) : (
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Выберите даты</span>
                  <span>Заезд — Выезд</span>
                </div>
              )}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(range) => {
              onDateRangeChange(range)
              if (range?.from && range?.to) {
                setOpen(false)
              }
            }}
            numberOfMonths={2}
            disabled={isDateDisabled}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

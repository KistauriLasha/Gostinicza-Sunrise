'use client'

import * as React from 'react'

interface DbBooking {
  id: number;
  room_id: string;
  check_in: string;
  check_out: string;
}

export function useBookedDates(roomId: string) {
  const [bookedDates, setBookedDates] = React.useState<{ from: Date; to: Date }[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const fetchBookedDates = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/book?room=${roomId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch booked dates')
      }
      const data: DbBooking[] = await response.json()

      const formattedDates = data.map(booking => {
        // Handle ISO date strings (e.g. "2025-05-10T00:00:00.000Z") correctly
        // We only care about the date part (YYYY-MM-DD)
        const checkIn = booking.check_in.split('T')[0];
        const checkOut = booking.check_out.split('T')[0];

        const [inYear, inMonth, inDay] = checkIn.split('-').map(Number);
        const [outYear, outMonth, outDay] = checkOut.split('-').map(Number);

        return {
          from: new Date(inYear, inMonth - 1, inDay),
          to: new Date(outYear, outMonth - 1, outDay)
        };
      })

      setBookedDates(formattedDates)
      setError(null)
    } catch (err) {
      console.error('Error fetching booked dates:', err)
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [roomId])

  React.useEffect(() => {
    fetchBookedDates()

    // Refresh periodically
    const interval = setInterval(fetchBookedDates, 5000)
    return () => clearInterval(interval)
  }, [fetchBookedDates])

  return { bookedDates, isLoading, error, refresh: fetchBookedDates }
}

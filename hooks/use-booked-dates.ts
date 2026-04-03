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

      const formattedDates = data.map(booking => ({
        from: new Date(booking.check_in),
        to: new Date(booking.check_out)
      }))

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

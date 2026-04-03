// Bookings Store - Utility functions for hotel bookings

// Calculate number of nights between two dates
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Calculate total price
export function calculateTotalPrice(
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date
): number {
  const nights = calculateNights(checkIn, checkOut)
  return nights * pricePerNight
}

// Parse price string to number (e.g., "1 500" -> 1500)
export function parsePriceString(priceString: string): number {
  return parseInt(priceString.replace(/\s/g, ''), 10)
}

// Format price number to string (e.g., 1500 -> "1 500")
export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Check if dates overlap with existing bookings (Pure function)
export function checkAvailability(
  checkIn: Date,
  checkOut: Date,
  bookedDates: { from: Date; to: Date }[]
): { available: boolean } {
  const newCheckIn = new Date(checkIn)
  const newCheckOut = new Date(checkOut)

  const isOverlapping = bookedDates.some((booking) => {
    const existingCheckIn = new Date(booking.from)
    const existingCheckOut = new Date(booking.to)

    // Overlap check: (New_CheckIn < Existing_CheckOut) AND (New_CheckOut > Existing_CheckIn)
    return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn
  })

  return {
    available: !isOverlapping,
  }
}

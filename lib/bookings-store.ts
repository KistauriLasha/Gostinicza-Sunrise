// Bookings Store - Mock database for hotel bookings

export interface Booking {
  id: string
  roomId: string
  guestName: string
  guestPhone: string
  checkIn: Date
  checkOut: Date
  totalPrice: number
  createdAt: Date
}

// In-memory storage for bookings (simulating a database)
let bookings: Booking[] = [
  // Some mock existing bookings for testing
  {
    id: '1',
    roomId: 'deluxe',
    guestName: 'Иван Петров',
    guestPhone: '+7 (999) 123-45-67',
    checkIn: new Date('2026-03-22'),
    checkOut: new Date('2026-03-25'),
    totalPrice: 4500,
    createdAt: new Date('2026-03-01'),
  },
  {
    id: '2',
    roomId: 'suite',
    guestName: 'Мария Иванова',
    guestPhone: '+7 (999) 987-65-43',
    checkIn: new Date('2026-03-20'),
    checkOut: new Date('2026-03-28'),
    totalPrice: 24000,
    createdAt: new Date('2026-03-05'),
  },
  {
    id: '3',
    roomId: 'deluxe-king',
    guestName: 'Сергей Сидоров',
    guestPhone: '+7 (999) 111-22-33',
    checkIn: new Date('2026-04-01'),
    checkOut: new Date('2026-04-05'),
    totalPrice: 6000,
    createdAt: new Date('2026-03-10'),
  },
]

// Get all bookings
export function getAllBookings(): Booking[] {
  return [...bookings]
}

// Get bookings for a specific room
export function getBookingsByRoom(roomId: string): Booking[] {
  return bookings.filter((booking) => booking.roomId === roomId)
}

// Check if dates overlap with existing bookings
// Formula: (New_CheckIn < Existing_CheckOut) AND (New_CheckOut > Existing_CheckIn)
export function checkAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): { available: boolean; conflictingBookings: Booking[] } {
  const roomBookings = getBookingsByRoom(roomId)
  
  const conflictingBookings = roomBookings.filter((booking) => {
    const existingCheckIn = new Date(booking.checkIn)
    const existingCheckOut = new Date(booking.checkOut)
    const newCheckIn = new Date(checkIn)
    const newCheckOut = new Date(checkOut)
    
    // Overlap check: (New_CheckIn < Existing_CheckOut) AND (New_CheckOut > Existing_CheckIn)
    return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn
  })
  
  return {
    available: conflictingBookings.length === 0,
    conflictingBookings,
  }
}

// Get booked date ranges for a room (for calendar display)
export function getBookedDates(roomId: string): { from: Date; to: Date }[] {
  const roomBookings = getBookingsByRoom(roomId)
  return roomBookings.map((booking) => ({
    from: new Date(booking.checkIn),
    to: new Date(booking.checkOut),
  }))
}

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

// Create a new booking
export function createBooking(
  roomId: string,
  guestName: string,
  guestPhone: string,
  checkIn: Date,
  checkOut: Date,
  totalPrice: number
): Booking | { error: string } {
  // First check availability
  const { available } = checkAvailability(roomId, checkIn, checkOut)
  
  if (!available) {
    return { error: 'Номер занят на выбранные даты' }
  }
  
  const newBooking: Booking = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    roomId,
    guestName,
    guestPhone,
    checkIn,
    checkOut,
    totalPrice,
    createdAt: new Date(),
  }
  
  bookings.push(newBooking)
  return newBooking
}

// Parse price string to number (e.g., "1 500" -> 1500)
export function parsePriceString(priceString: string): number {
  return parseInt(priceString.replace(/\s/g, ''), 10)
}

// Format price number to string (e.g., 1500 -> "1 500")
export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

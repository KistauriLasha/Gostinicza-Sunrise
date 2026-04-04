import { DbBooking } from './bookings-store';

// Bookings Store - Server-side only persistent storage

import fs from 'fs'
import path from 'path'

const BOOKINGS_FILE = path.join(process.cwd(), 'bookings.json')

// Get all bookings from the JSON file
export async function getBookingsFromFile(): Promise<DbBooking[]> {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      return []
    }
    const data = await fs.promises.readFile(BOOKINGS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading bookings file:', error)
    return []
  }
}

// Save all bookings to the JSON file
export async function saveBookingsToFile(bookings: DbBooking[]): Promise<void> {
  try {
    await fs.promises.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf8')
  } catch (error) {
    console.error('Error writing to bookings file:', error)
  }
}

// Add a new booking to the JSON file
export async function addBookingToFile(booking: Omit<DbBooking, 'id' | 'created_at'>): Promise<number> {
  const bookings = await getBookingsFromFile()
  const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1
  const newBooking: DbBooking = {
    ...booking,
    id: newId,
    created_at: new Date().toISOString()
  }
  bookings.push(newBooking)
  await saveBookingsToFile(bookings)
  return newId
}

// Delete a booking from the JSON file by ID
export async function deleteBookingFromFile(id: number): Promise<boolean> {
  const bookings = await getBookingsFromFile()
  const initialLength = bookings.length
  const updatedBookings = bookings.filter(b => b.id !== id)

  if (updatedBookings.length < initialLength) {
    await saveBookingsToFile(updatedBookings)
    return true
  }
  return false
}

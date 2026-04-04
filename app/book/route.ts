import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import {
  getBookingsFromFile,
  addBookingToFile,
  deleteBookingFromFile,
} from '@/lib/bookings-storage-server';
import { DbBooking } from '@/lib/bookings-store';

/**
 * Formats a Date object to YYYY-MM-DD in local time
 */
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Helper to check if an error is a database connection error
 */
function isDbError(error: any): boolean {
  return (
    error.code === 'ECONNREFUSED' ||
    error.message?.includes('connect ECONNREFUSED') ||
    error.message?.includes('AggregateError')
  );
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room');

    try {
      let query = 'SELECT * FROM bookings';
      const params = [];

      if (room) {
        query += ' WHERE room_id = $1';
        params.push(room);
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, params);

      // Format DATE types to YYYY-MM-DD strings for consistent parsing on frontend
      const rows = result.rows.map(row => {
        const dIn = new Date(row.check_in);
        const dOut = new Date(row.check_out);

        return {
          ...row,
          check_in: formatLocalDate(dIn),
          check_out: formatLocalDate(dOut),
        };
      });

      return NextResponse.json(rows);
    } catch (dbError) {
      if (isDbError(dbError)) {
        console.warn('Database connection failed, falling back to JSON storage for GET.');
        let bookings = await getBookingsFromFile();
        if (room) {
          bookings = bookings.filter(b => b.room_id === room);
        }
        // Bookings in file are already in proper format and sorted
        return NextResponse.json(bookings.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ));
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { room, checkIn, checkOut, name, phone, adults } = body;

    // Validate request body
    if (!room || !checkIn || !checkOut || !name || !phone || !adults) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use local date parsing to avoid timezone issues with date strings
    const [inYear, inMonth, inDay] = checkIn.split('-').map(Number);
    const [outYear, outMonth, outDay] = checkOut.split('-').map(Number);

    const checkInDate = new Date(inYear, inMonth - 1, inDay);
    const checkOutDate = new Date(outYear, outMonth - 1, outDay);

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    try {
      // Check for overlapping bookings in DB
      const overlapQuery = `
        SELECT id FROM bookings
        WHERE room_id = $1
        AND check_in < $3
        AND check_out > $2
      `;
      const overlapResult = await pool.query(overlapQuery, [room, checkIn, checkOut]);

      if (overlapResult.rows.length > 0) {
        return NextResponse.json(
          { error: 'Номер занят на выбранные даты' },
          { status: 400 }
        );
      }

      // Insert new booking in DB
      const insertQuery = `
        INSERT INTO bookings (room_id, check_in, check_out, guest_name, guest_phone, adults)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const insertResult = await pool.query(insertQuery, [
        room,
        checkIn,
        checkOut,
        name,
        phone,
        parseInt(adults, 10),
      ]);

      return NextResponse.json(
        { message: 'Booking successful', bookingId: insertResult.rows[0].id },
        { status: 201 }
      );
    } catch (dbError) {
      if (isDbError(dbError)) {
        console.warn('Database connection failed, falling back to JSON storage for POST.');

        const bookings = await getBookingsFromFile();
        const overlaps = bookings.filter(b =>
          b.room_id === room &&
          b.check_in < checkOut &&
          b.check_out > checkIn
        );

        if (overlaps.length > 0) {
          return NextResponse.json(
            { error: 'Номер занят на выбранные даты' },
            { status: 400 }
          );
        }

        const bookingId = await addBookingToFile({
          room_id: room,
          check_in: checkIn,
          check_out: checkOut,
          guest_name: name,
          guest_phone: phone,
          adults: parseInt(adults, 10),
        });

        return NextResponse.json(
          { message: 'Booking successful (persistent storage)', bookingId: bookingId },
          { status: 201 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing booking ID' },
        { status: 400 }
      );
    }

    try {
      await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
      return NextResponse.json({ message: 'Booking deleted successfully' });
    } catch (dbError) {
      if (isDbError(dbError)) {
        console.warn('Database connection failed, falling back to JSON storage for DELETE.');
        const success = await deleteBookingFromFile(parseInt(id, 10));
        if (success) {
          return NextResponse.json({ message: 'Booking deleted successfully (persistent storage)' });
        } else {
          // It might be okay if it wasn't found in fallback if it was supposed to be in DB
          return NextResponse.json({ message: 'Booking not found in persistent storage' }, { status: 404 });
        }
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

/**
 * Formats a Date object to YYYY-MM-DD in local time
 */
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const room = searchParams.get('room');

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
      // PostgreSQL DATE type comes as a Date object in pg node driver,
      // but it's already in the correct local date.
      const dIn = new Date(row.check_in);
      const dOut = new Date(row.check_out);

      return {
        ...row,
        check_in: formatLocalDate(dIn),
        check_out: formatLocalDate(dOut),
      };
    });

    return NextResponse.json(rows);
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

    // Check for overlapping bookings
    // A booking overlaps if:
    // (existing.check_in < new.check_out) AND (existing.check_out > new.check_in)
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

    // Insert new booking
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

    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

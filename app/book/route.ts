import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

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

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

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

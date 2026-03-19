import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { rooms } from '@/lib/rooms-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { room, checkIn, checkOut, name, phone, adults } = body;

    // Validate required fields
    if (!room || !checkIn || !checkOut || !name || !phone || !adults) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Дата выезда должна быть позже даты заезда' },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    // A booking overlaps if: (existing.check_in < new.check_out) AND (existing.check_out > new.check_in)
    const overlapResult = await sql`
      SELECT id FROM bookings
      WHERE room_id = ${room}
      AND check_in < ${checkOut}
      AND check_out > ${checkIn}
    `;

    if (overlapResult.length > 0) {
      return NextResponse.json(
        { error: 'Номер занят на выбранные даты. Пожалуйста, выберите другие даты или номер.' },
        { status: 400 }
      );
    }

    // Insert new booking
    const insertResult = await sql`
      INSERT INTO bookings (room_id, check_in, check_out, guest_name, guest_phone, adults)
      VALUES (${room}, ${checkIn}, ${checkOut}, ${name}, ${phone}, ${parseInt(adults, 10)})
      RETURNING id, created_at
    `;

    const bookingId = insertResult[0].id;
    const createdAt = insertResult[0].created_at;

    // Get room details for notification
    const roomDetails = rooms.find(r => r.id === room);
    const roomName = roomDetails?.name || room;

    // Send notification to owner via email (using Resend or similar)
    // For now, we'll just log the booking details
    const bookingDetails = {
      bookingId,
      roomName,
      roomId: room,
      guestName: name,
      guestPhone: phone,
      checkIn,
      checkOut,
      adults,
      createdAt
    };
    
    console.log('New booking received:', bookingDetails);

    // TODO: Send email notification to owner
    // You can integrate with Resend, SendGrid, or another email service
    // Example: await sendEmail({ to: OWNER_EMAIL, subject: 'New Booking', body: bookingDetails })

    return NextResponse.json(
      { 
        message: 'Бронирование успешно создано!', 
        bookingId,
        details: {
          room: roomName,
          checkIn,
          checkOut,
          guests: adults
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при обработке бронирования. Попробуйте позже.' },
      { status: 500 }
    );
  }
}

// GET endpoint to check room availability
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('room');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Укажите номер и даты для проверки доступности' },
        { status: 400 }
      );
    }

    const overlapResult = await sql`
      SELECT id, check_in, check_out FROM bookings
      WHERE room_id = ${roomId}
      AND check_in < ${checkOut}
      AND check_out > ${checkIn}
    `;

    return NextResponse.json({
      available: overlapResult.length === 0,
      conflictingBookings: overlapResult.length
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Ошибка при проверке доступности' },
      { status: 500 }
    );
  }
}

const { Pool } = require('pg');

async function testBookingLogic() {
  console.log('Testing booking logic...');

  // Mock database results
  const mockOverlapResult = { rows: [] };
  const mockInsertResult = { rows: [{ id: 123 }] };

  // This script simulates the logic in app/book/route.ts
  const testCase = async (body, existingBookings) => {
    const { room, checkIn, checkOut, name, phone, adults } = body;

    if (!room || !checkIn || !checkOut || !name || !phone || !adults) {
      return { status: 400, error: 'Missing required fields' };
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return { status: 400, error: 'Check-out date must be after check-in date' };
    }

    // Overlap logic: (existing.check_in < new.check_out) AND (existing.check_out > new.check_in)
    const hasOverlap = existingBookings.some(b =>
      b.room_id === room &&
      new Date(b.check_in) < checkOutDate &&
      new Date(b.check_out) > checkInDate
    );

    if (hasOverlap) {
      return { status: 400, error: 'Номер занят на выбранные даты' };
    }

    return { status: 201, message: 'Booking successful', bookingId: 123 };
  };

  const existingBookings = [
    { room_id: 'deluxe', check_in: '2025-10-01', check_out: '2025-10-05' }
  ];

  // Test Case 1: Success
  const res1 = await testCase({
    room: 'deluxe',
    checkIn: '2025-10-06',
    checkOut: '2025-10-10',
    name: 'Test User',
    phone: '123',
    adults: 2
  }, existingBookings);
  console.log('Test Case 1 (Success):', res1.status === 201 ? 'PASSED' : 'FAILED', res1);

  // Test Case 2: Overlap
  const res2 = await testCase({
    room: 'deluxe',
    checkIn: '2025-10-02',
    checkOut: '2025-10-04',
    name: 'Overlap User',
    phone: '456',
    adults: 1
  }, existingBookings);
  console.log('Test Case 2 (Overlap):', res2.status === 400 ? 'PASSED' : 'FAILED', res2);

  // Test Case 3: Partial Overlap (Starts before, ends during)
  const res3 = await testCase({
    room: 'deluxe',
    checkIn: '2025-09-30',
    checkOut: '2025-10-02',
    name: 'Overlap User',
    phone: '456',
    adults: 1
  }, existingBookings);
  console.log('Test Case 3 (Partial Overlap):', res3.status === 400 ? 'PASSED' : 'FAILED', res3);
}

testBookingLogic();

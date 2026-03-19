const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgresql://sunrise_user:sunrise_password@localhost:5432/sunrise_db',
});

async function initDb() {
  const client = await pool.connect();
  try {
    console.log('Initializing database...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        room_id VARCHAR(50) NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        guest_name VARCHAR(255) NOT NULL,
        guest_phone VARCHAR(50) NOT NULL,
        adults INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "bookings" created or already exists.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

initDb();

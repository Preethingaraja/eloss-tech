import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'srv1128.hstgr.io',
  port: 3306,
  user: 'u416856653_Eloss',
  password: 'Elosstech@12',
  database: 'u416856653_Eloss',
  waitForConnections: true,
  connectionLimit: 10,
});

async function run() {
  try {
    // Delete the duplicate user (keep the first one) to avoid UNIQUE constraint violation error
    await pool.query(`
      DELETE FROM users 
      WHERE id NOT IN (
        SELECT * FROM (
          SELECT MIN(id) FROM users GROUP BY phone HAVING phone IS NOT NULL
        ) AS t
      ) AND phone IS NOT NULL;
    `);
    
    // Add unique constraint to phone
    await pool.query('ALTER TABLE users ADD CONSTRAINT unique_phone UNIQUE (phone)');
    console.log("Successfully added UNIQUE constraint to phone column.");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    pool.end();
  }
}

run();

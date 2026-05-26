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
    await pool.query('SET FOREIGN_KEY_CHECKS = 0;');
    await pool.query('DROP TABLE IF EXISTS enrollments;');
    await pool.query('DROP TABLE IF EXISTS courses;');
    await pool.query('DROP TABLE IF EXISTS page_visits;');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log("Successfully dropped courses, enrollments, and page_visits tables.");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    pool.end();
  }
}

run();

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'srv1128.hstgr.io', port: 3306,
  user: 'u416856653_Eloss', password: 'Elosstech@12',
  database: 'u416856653_Eloss',
});

try {
  await pool.query("ALTER TABLE users ADD COLUMN status ENUM('active','blocked') DEFAULT 'active'");
  console.log('✅ status column added to users table');
} catch (e) {
  if (e.code === 'ER_DUP_FIELDNAME') console.log('✅ status column already exists');
  else console.error('❌ Error:', e.message);
}

process.exit(0);

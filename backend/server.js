import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }
});

app.use(cors());
app.use(express.json());

// ─── DB Pool ────────────────────────────────────────────
const pool = mysql.createPool({
  host: 'srv1128.hstgr.io',
  port: 3306,
  user: 'u416856653_Eloss',
  password: 'Elosstech@12',
  database: 'u416856653_Eloss',
  waitForConnections: true,
  connectionLimit: 10,
});

// ─── Init: Ensure Admin Credentials ─────────────────────
async function initAdmin() {
  try {
    const hashed = await bcrypt.hash('admin@12', 10);
    await pool.query(
      `INSERT INTO admins (username, password) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE password = ?`,
      ['eloss', hashed, hashed]
    );
    console.log('✅ Admin system initialized.');
  } catch (err) {
    console.error('❌ Admin init failed:', err.message);
  }
}
initAdmin();

// ═══════════════════════════════════════════════════════
//  AUTH ROUTES
// ═══════════════════════════════════════════════════════

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Required fields missing' });
  
  try {
    const hashed = await bcrypt.hash(password, 10);
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone, ip_address) VALUES (?,?,?,?,?)',
      [name, email, hashed, phone || null, ip]
    );
    res.json({ success: true, user: { id: result.insertId, name, email } });
  } catch (e) {
    console.error("Signup Error:", e);
    if (e.code === 'ER_DUP_ENTRY') {
      if (e.message.includes('phone')) {
        return res.status(409).json({ error: 'Phone number already in use' });
      }
      return res.status(409).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Database error: ' + e.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Account not found' });

    // ── Check if admin has blocked this account ──
    if (rows[0].status === 'blocked') {
      return res.status(403).json({ error: 'BLOCKED', message: 'This account has been blocked by the administrator. Please contact support.' });
    }
    
    const ok = await bcrypt.compare(password, rows[0].password);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });
    
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [rows[0].id]);
    res.json({ success: true, user: { id: rows[0].id, name: rows[0].name, email: rows[0].email } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'Admin not found' });
    
    const ok = await bcrypt.compare(password, rows[0].password);
    if (!ok) return res.status(401).json({ error: 'Invalid admin credentials' });
    
    res.json({ success: true, admin: { id: rows[0].id, username: rows[0].username } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});



// ═══════════════════════════════════════════════════════
//  ANALYTICS & CUSTOMERS
// ═══════════════════════════════════════════════════════
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [[{ activeChats }]] = await pool.query("SELECT COUNT(*) AS activeChats FROM chat_sessions WHERE status='active'");

    const [signupsChart] = await pool.query(`
      SELECT DATE(created_at) AS day, COUNT(*) AS count
      FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at) ORDER BY day ASC
    `);

    res.json({ totalUsers, activeChats, signupsChart });
  } catch (e) { res.status(500).send(); }
});

app.get('/api/admin/customers', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.name, u.email, u.phone, u.created_at, u.last_login,
        COALESCE(u.status, 'active') AS status,
        COUNT(DISTINCT cm.id) AS messages
      FROM users u
      LEFT JOIN chat_sessions cs ON cs.user_id = u.id
      LEFT JOIN chat_messages cm ON cm.session_id = cs.session_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    res.json(rows);
  } catch (e) { res.status(500).send(); }
});

// ── Block a user ──
app.put('/api/admin/users/:id/block', async (req, res) => {
  try {
    await pool.query("UPDATE users SET status='blocked' WHERE id=?", [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Revoke (unblock) a user ──
app.put('/api/admin/users/:id/revoke', async (req, res) => {
  try {
    await pool.query("UPDATE users SET status='active' WHERE id=?", [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Delete user and ALL related records ──
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    // CASCADE on FK handles chat_sessions→chat_messages
    await pool.query('DELETE FROM users WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});






// ═══════════════════════════════════════════════════════
//  CHAT HTTP ROUTES
// ═══════════════════════════════════════════════════════
app.get('/api/admin/chats', async (req, res) => {
  try {
    let rows;
    try {
      // Use enriched view if it exists
      [rows] = await pool.query(`SELECT * FROM v_chat_summary WHERE status != 'closed' ORDER BY COALESCE(last_message_at, started_at) DESC`);
    } catch {
      // Fallback if view doesn't exist yet
      [rows] = await pool.query(`
        SELECT cs.*,
          (SELECT message FROM chat_messages WHERE session_id = cs.session_id ORDER BY sent_at DESC LIMIT 1) AS last_message,
          (SELECT COUNT(*) FROM chat_messages WHERE session_id = cs.session_id AND sender='user' AND is_read=0) AS unread_count
        FROM chat_sessions cs WHERE cs.status != 'closed' ORDER BY cs.started_at DESC
      `);
    }
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/chat/:sessionId/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chat_messages WHERE session_id = ? ORDER BY sent_at ASC', [req.params.sessionId]);
    await pool.query("UPDATE chat_messages SET is_read=1 WHERE session_id=? AND sender='user'", [req.params.sessionId]);
    res.json(rows);
  } catch (e) { res.status(500).send(); }
});

app.put('/api/chat/:sessionId/close', async (req, res) => {
  try {
    await pool.query(
      "UPDATE chat_sessions SET status='closed', closed_at=NOW() WHERE session_id=?",
      [req.params.sessionId]
    );
    // Notify the customer's chatbot that the session was closed
    io.to(req.params.sessionId).emit('chat_closed');
    res.json({ success: true });
  } catch (e) { res.status(500).send(); }
});

// ═══════════════════════════════════════════════════════
//  SOCKET.IO — LIVE CHAT
// ═══════════════════════════════════════════════════════
// Track which customer sessions currently have an active socket connection
const onlineSessions = new Set();

io.on('connection', (socket) => {
  console.log('🔌 Connection:', socket.id);

  socket.on('user_join', async ({ sessionId, guestName, userId }) => {
    try {
      let sid   = null;
      const ip  = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
      let displayName = guestName || 'Guest';

      // ── STEP 1: If a sessionId was provided, verify it actually exists in DB ──
      if (sessionId) {
        const [check] = await pool.query(
          "SELECT session_id, guest_name FROM chat_sessions WHERE session_id = ? AND status != 'closed'",
          [sessionId]
        );
        if (check.length > 0) {
          sid = check[0].session_id;
          displayName = check[0].guest_name || displayName;
          console.log(`🔄 Resuming verified session: ${sid}`);
        } else {
          console.log(`⚠️ Session ${sessionId} not found in DB — will create new`);
        }
      }

      // ── STEP 2: For logged-in users with no valid session, find their existing one ──
      if (!sid && userId) {
        const [existing] = await pool.query(
          "SELECT session_id, guest_name FROM chat_sessions WHERE user_id = ? AND status != 'closed' ORDER BY started_at DESC LIMIT 1",
          [userId]
        );
        if (existing.length > 0) {
          sid = existing[0].session_id;
          displayName = existing[0].guest_name || displayName;
          console.log(`🔄 Found existing session for user ${userId}: ${sid}`);
          socket.emit('session_created', { sessionId: sid });
        }
      }

      // ── STEP 3: No valid session found → create brand new one ──
      if (!sid) {
        sid = uuidv4();

        if (userId) {
          const [uRows] = await pool.query('SELECT name FROM users WHERE id = ?', [userId]);
          if (uRows.length) displayName = uRows[0].name;
        }

        console.log(`🆕 Creating session: ${sid} | user=${userId || 'guest'} | name=${displayName}`);
        await pool.query(
          'INSERT INTO chat_sessions (session_id, user_id, guest_name, ip_address, status) VALUES (?,?,?,?,?)',
          [sid, userId || null, displayName, ip, 'waiting']
        );
        socket.emit('session_created', { sessionId: sid });

        // Tell admin panel: new customer block in sidebar
        io.to('admin_room').emit('new_chat_session', {
          session_id: sid, guest_name: displayName,
          user_id: userId || null, status: 'waiting',
          started_at: new Date(), last_message: null, unread_count: 0,
        });
      }

      // ── Join socket room + mark online ──
      socket.join(sid);
      socket.sessionId = sid;
      socket.isUser    = true;
      onlineSessions.add(sid);
      io.to('admin_room').emit('user_presence', { sessionId: sid, online: true });

      // ── Send full message history to customer ──
      const [msgs] = await pool.query(
        'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY sent_at ASC', [sid]
      );
      socket.emit('chat_history', msgs);
      console.log(`✅ user_join complete: ${sid} (${msgs.length} messages)`);

    } catch (e) { console.error('❌ user_join error:', e); }
  });

  socket.on('admin_join', async () => {
    console.log('👑 Admin joined admin_room');
    socket.join('admin_room');
    let sessions = [];
    try {
      // Try enriched view first
      [sessions] = await pool.query(
        "SELECT * FROM v_chat_summary WHERE status != 'closed' ORDER BY COALESCE(last_message_at, started_at) DESC"
      );
      console.log(`📋 Sent ${sessions.length} sessions to admin (via view)`);
    } catch (viewErr) {
      console.warn('⚠️ v_chat_summary view not available, using fallback query');
      try {
        [sessions] = await pool.query(`
          SELECT cs.*,
            (SELECT message FROM chat_messages WHERE session_id = cs.session_id ORDER BY sent_at DESC LIMIT 1) AS last_message,
            (SELECT COUNT(*) FROM chat_messages WHERE session_id = cs.session_id AND sender='user' AND is_read=0) AS unread_count
          FROM chat_sessions cs
          WHERE cs.status != 'closed'
          ORDER BY cs.started_at DESC
        `);
        console.log(`📋 Sent ${sessions.length} sessions to admin (fallback query)`);
      } catch (fallbackErr) {
        console.error('❌ admin_join DB error:', fallbackErr.message);
      }
    }
    // ALWAYS emit — even if empty, so frontend stops loading
    socket.emit('all_sessions', sessions);
    socket.emit('online_sessions', Array.from(onlineSessions));
  });



  socket.on('admin_join_session', async ({ sessionId }) => {
    try {
      console.log(`👑 Admin joining session room: ${sessionId}`);
      socket.join(sessionId);
      await pool.query("UPDATE chat_sessions SET status='active' WHERE session_id=?", [sessionId]);
      const [msgs] = await pool.query(
        'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY sent_at ASC',
        [sessionId]
      );
      // Use a SEPARATE event that includes sessionId so the admin panel
      // can safely ignore late-arriving history from previously-viewed sessions
      socket.emit('admin_chat_history', { sessionId, messages: msgs });
      await pool.query(
        "UPDATE chat_messages SET is_read=1 WHERE session_id=? AND sender='user'",
        [sessionId]
      );
    } catch (e) { console.error('admin_join_session error:', e); }
  });

  socket.on('send_message', async ({ sessionId, message, sender }) => {
    try {
      if (!sessionId || !message) return;
      console.log(`📩 Msg from ${sender} in ${sessionId}: ${message}`);
      await pool.query('INSERT INTO chat_messages (session_id, sender, message) VALUES (?,?,?)', [sessionId, sender, message]);
      const msgObj = { sessionId, sender, message, sent_at: new Date() };
      io.to(sessionId).emit('new_message', msgObj);
      if (sender === 'user') io.to('admin_room').emit('user_message_alert', msgObj);
    } catch (e) { console.error(e); }
  });

  socket.on('clear_chat', async ({ sessionId }) => {
    try {
      if (!sessionId) return;
      await pool.query('DELETE FROM chat_messages WHERE session_id = ?', [sessionId]);
      io.to(sessionId).emit('chat_history', []);
    } catch (e) { console.error(e); }
  });

  socket.on('disconnect', () => {
    console.log('🔌 Disconnected:', socket.id);
    // If this was a customer socket, mark their session as offline
    if (socket.isUser && socket.sessionId) {
      onlineSessions.delete(socket.sessionId);
      io.to('admin_room').emit('user_presence', { sessionId: socket.sessionId, online: false });
      console.log(`🔴 Session offline: ${socket.sessionId}`);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 API: http://localhost:${PORT}`));

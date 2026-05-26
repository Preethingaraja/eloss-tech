-- ============================================================
-- ELOSS TECHNOLOGIES - MySQL Database Schema v2
-- Host: srv1128.hstgr.io
-- DB: u416856653_Eloss
-- Updated: 2026-04-28
-- Architecture: Each customer has their own isolated session block.
--   users            → one row per registered customer
--   chat_sessions    → one row per customer chat thread (isolated by session_id)
--   chat_messages    → all messages (user + admin) stored here, linked by session_id
-- ============================================================

CREATE DATABASE IF NOT EXISTS u416856653_Eloss CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE u416856653_Eloss;

-- ============================================================
-- 1. USERS  (Registered customers)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(120) NOT NULL,
  email        VARCHAR(180) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  phone        VARCHAR(20) UNIQUE,
  ip_address   VARCHAR(50),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login   TIMESTAMP NULL,
  INDEX idx_email (email)
);

-- ============================================================
-- 2. ADMINS  (Fixed credentials, hashed at server startup)
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL
);

-- Default admin row (password gets replaced by bcrypt hash on server startup)
INSERT IGNORE INTO admins (username, password)
VALUES ('eloss', '$2b$10$placeholder_replaced_at_startup');



-- ============================================================
-- 6. CHAT SESSIONS
--    ONE ROW PER CUSTOMER CONVERSATION THREAD.
--    Each customer has their own isolated block identified by `session_id`.
--    session_id is a UUID generated per conversation.
--    Linked to a registered user (user_id) OR a guest (guest_name only).
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_sessions (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  session_id   VARCHAR(100)  NOT NULL UNIQUE,   -- UUID — the key that isolates each customer
  user_id      INT NULL,                         -- NULL for guests
  guest_name   VARCHAR(120)  DEFAULT 'Guest',
  ip_address   VARCHAR(50),
  status       ENUM('waiting','active','closed') DEFAULT 'waiting',
  -- 'waiting'  = customer connected, no admin response yet
  -- 'active'   = admin is currently in the session
  -- 'closed'   = session terminated by admin
  total_messages  INT DEFAULT 0,                 -- Denormalised count for fast dashboard reads
  last_message_at TIMESTAMP NULL,               -- Timestamp of most recent message (any sender)
  started_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at    TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status     (status),
  INDEX idx_started_at (started_at)
);

-- ============================================================
-- 7. CHAT MESSAGES
--    ALL messages for a session stored here — both customer messages
--    (sender='user') and admin replies (sender='admin').
--    Linked to a specific customer session via `session_id` (CASCADE DELETE).
--    Completely isolated: querying WHERE session_id = ? returns ONLY
--    that customer's conversation, no cross-contamination.
-- ============================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  session_id  VARCHAR(100) NOT NULL,   -- Links to chat_sessions.session_id
  sender      ENUM('user','admin') NOT NULL,
  message     TEXT NOT NULL,
  is_read     TINYINT(1) DEFAULT 0,   -- 0=unread, 1=read by admin
  sent_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
  INDEX idx_session_id (session_id),
  INDEX idx_sent_at    (sent_at),
  INDEX idx_is_read    (is_read)
);

-- ============================================================
-- TRIGGERS: Auto-maintain denormalised fields on chat_sessions
-- ============================================================

-- After a new message is inserted, update session's total_messages and last_message_at
DROP TRIGGER IF EXISTS trg_after_message_insert;
DELIMITER //
CREATE TRIGGER trg_after_message_insert
AFTER INSERT ON chat_messages
FOR EACH ROW
BEGIN
  UPDATE chat_sessions
  SET
    total_messages  = total_messages + 1,
    last_message_at = NEW.sent_at
  WHERE session_id = NEW.session_id;
END//
DELIMITER ;

-- After a message is deleted (e.g. clear chat), recalculate count
DROP TRIGGER IF EXISTS trg_after_message_delete;
DELIMITER //
CREATE TRIGGER trg_after_message_delete
AFTER DELETE ON chat_messages
FOR EACH ROW
BEGIN
  UPDATE chat_sessions
  SET total_messages = (
    SELECT COUNT(*) FROM chat_messages WHERE session_id = OLD.session_id
  )
  WHERE session_id = OLD.session_id;
END//
DELIMITER ;

-- ============================================================
-- VIEWS: Convenient admin-facing summary (used by dashboard)
-- ============================================================

-- v_chat_summary: One row per session with aggregated info
CREATE OR REPLACE VIEW v_chat_summary AS
SELECT
  cs.id,
  cs.session_id,
  cs.user_id,
  cs.guest_name,
  cs.status,
  cs.total_messages,
  cs.started_at,
  cs.closed_at,
  cs.last_message_at,
  u.email  AS user_email,
  u.phone  AS user_phone,
  (SELECT message  FROM chat_messages WHERE session_id = cs.session_id ORDER BY sent_at DESC LIMIT 1) AS last_message,
  (SELECT sender   FROM chat_messages WHERE session_id = cs.session_id ORDER BY sent_at DESC LIMIT 1) AS last_sender,
  (SELECT COUNT(*) FROM chat_messages WHERE session_id = cs.session_id AND sender='user' AND is_read=0) AS unread_count
FROM chat_sessions cs
LEFT JOIN users u ON u.id = cs.user_id;

-- ============================================================
-- ELOSS TECHNOLOGIES — Safe Migration Script
-- Run this in Hostinger phpMyAdmin → SQL tab
-- Safe to run on existing databases (uses IF NOT EXISTS / IGNORE)
-- ============================================================

USE u416856653_Eloss;

-- ============================================================
-- STEP 1: Add missing columns to chat_sessions (if not present)
-- ============================================================

ALTER TABLE chat_sessions
  ADD COLUMN IF NOT EXISTS total_messages  INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP NULL;

-- Backfill total_messages and last_message_at for existing sessions
UPDATE chat_sessions cs
SET
  total_messages  = (SELECT COUNT(*) FROM chat_messages WHERE session_id = cs.session_id),
  last_message_at = (SELECT MAX(sent_at) FROM chat_messages WHERE session_id = cs.session_id);

-- ============================================================
-- STEP 2: Add indexes for performance (safe to re-run)
-- ============================================================

ALTER TABLE chat_sessions
  ADD INDEX IF NOT EXISTS idx_status      (status),
  ADD INDEX IF NOT EXISTS idx_started_at  (started_at);

ALTER TABLE chat_messages
  ADD INDEX IF NOT EXISTS idx_session_id  (session_id),
  ADD INDEX IF NOT EXISTS idx_sent_at     (sent_at),
  ADD INDEX IF NOT EXISTS idx_is_read     (is_read);

ALTER TABLE page_visits
  ADD INDEX IF NOT EXISTS idx_visited_at  (visited_at),
  ADD INDEX IF NOT EXISTS idx_pv_user_id  (user_id);

ALTER TABLE users
  ADD INDEX IF NOT EXISTS idx_email       (email);

-- ============================================================
-- STEP 3: Prevent duplicate enrollments
-- ============================================================

ALTER TABLE enrollments
  ADD UNIQUE KEY IF NOT EXISTS uq_user_course (user_id, course_id);

-- ============================================================
-- STEP 4: CREATE THE VIEW
-- v_chat_summary — one row per customer session.
-- Used by admin dashboard to load enriched session data in one query.
-- Each row is ISOLATED to one customer (by session_id).
-- ============================================================

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
  (
    SELECT message FROM chat_messages
    WHERE session_id = cs.session_id
    ORDER BY sent_at DESC LIMIT 1
  ) AS last_message,
  (
    SELECT sender FROM chat_messages
    WHERE session_id = cs.session_id
    ORDER BY sent_at DESC LIMIT 1
  ) AS last_sender,
  (
    SELECT COUNT(*) FROM chat_messages
    WHERE session_id = cs.session_id
      AND sender = 'user'
      AND is_read = 0
  ) AS unread_count
FROM chat_sessions cs
LEFT JOIN users u ON u.id = cs.user_id;

-- ============================================================
-- STEP 5: TRIGGERS (auto-maintain totals on every message)
-- NOTE: If Hostinger blocks triggers, skip this block.
--       The server.js backfills these values via SQL queries instead.
-- ============================================================

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

DROP TRIGGER IF EXISTS trg_after_message_delete;

DELIMITER //
CREATE TRIGGER trg_after_message_delete
AFTER DELETE ON chat_messages
FOR EACH ROW
BEGIN
  UPDATE chat_sessions
  SET
    total_messages = (
      SELECT COUNT(*) FROM chat_messages
      WHERE session_id = OLD.session_id
    )
  WHERE session_id = OLD.session_id;
END//
DELIMITER ;

-- ============================================================
-- STEP 6: Verify — check the view works
-- ============================================================

SELECT
  session_id,
  guest_name,
  status,
  total_messages,
  unread_count,
  last_message,
  last_message_at
FROM v_chat_summary
ORDER BY last_message_at DESC
LIMIT 10;

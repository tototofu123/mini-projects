Requirements:
1. SQLite database with tables: users, sessions, audit_log
2. Python script implementing: register, login, logout, session validation
3. Password policy: 8+ chars, 1 uppercase, 1 number
4. Max 3 active sessions per user
5. Sessions expire after 24 hours
6. Log ALL login attempts to audit_log
7. CLI menu demonstrating all features
8. matplotlib visualization: bar chart of active sessions per user, line chart ... (truncated)



```python
#!/usr/bin/env python3
"""
Company Login/Logout Database System
=====================================
Features:
- SQLite database with users, sessions, audit_log tables
- bcrypt password hashing
- Password policy enforcement
- Max 3 active sessions per user
- 24-hour session expiration
- Full audit logging
- CLI menu with matplotlib visualizations
"""

import sqlite3
import bcrypt
import os
import random
import string
import datetime
import argparse
import sys
from collections import defaultdict
from typing import Optional, Tuple

# ─── Configuration ────────────────────────────────────────────────────────────

DB_PATH = "company_auth.db"
SESSION_EXPIRY_HOURS = 24
MAX_ACTIVE_SESSIONS = 3
PASSWORD_MIN_LENGTH = 8

# ─── Database Setup ───────────────────────────────────────────────────────────

def init_database(db_path: str) -> sqlite3.Connection:
    """Initialize SQLite database with required tables."""
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            ip_address TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            details TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    conn.commit()
    return conn


# ─── Password Utilities ───────────────────────────────────────────────────────

def validate_password(password: str) -> Tuple[bool, str]:
    """Validate password against company policy."""
    if len(password) < PASSWORD_MIN_LENGTH:
        return False, f"Password must be at least {PASSWORD_MIN_LENGTH} characters"
    if not any(c.isupper() for c in password):
        return False, "Password must contain at least one uppercase letter"
    if not any(c.isdigit() for c in password):
        return False, "Password must contain at least one number"
    return True, ""


def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def check_password(password: str, password_hash: str) -> bool:
    """Verify password against bcrypt hash."""
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))


def generate_token(length: int = 32) -> str:
    """Generate a random session token."""
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))


# ─── Audit Logging ────────────────────────────────────────────────────────────

def log_audit(conn: sqlite3.Connection, user_id: Optional[int], action: str,
              ip_address: str = "127.0.0.1", details: str = ""):
    """Log an action to the audit_log table."""
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO audit_log (user_id, action, ip_address, details) VALUES (?, ?, ?, ?)",
        (user_id, action, ip_address, details)
    )
    conn.commit()


# ─── User Registration ────────────────────────────────────────────────────────

def register_user(conn: sqlite3.Connection, username: str, password: str,
                  ip_address: str = "127.0.0.1") -> Tuple[bool, str]:
    """Register a new user."""
    if not username or not username.strip():
        return False, "Username cannot be empty"
    if len(username) < 3:
        return False, "Username must be at least 3 characters"
    if not validate_password(password):
        return False, validate_password(password)[1]

    password_hash = hash_password(password)

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username.strip(), password_hash)
        )
        conn.commit()
        log_audit(conn, None, "REGISTER", ip_address, f"User '{username}' registered")
        return True, f"User '{username}' registered successfully"
    except sqlite3.IntegrityError:
        return False, f"Username '{username}' already exists"


# ─── Session Management ───────────────────────────────────────────────────────

def get_active_session_count(conn: sqlite3.Connection, user_id: int) -> int:
    """Count active (non-expired) sessions for a user."""
    cursor = conn.cursor()
    now = datetime.datetime.now()
    cursor.execute(
        "SELECT COUNT(*) FROM sessions WHERE user_id = ? AND expires_at > ?",
        (user_id, now)
    )
    return cursor.fetchone()[0]


def create_session(conn: sqlite3.Connection, user_id: int, ip_address: str = "127.0.0.1") -> Tuple[bool, str]:
    """Create a new session for a user."""
    now = datetime.datetime.now()
    expires_at = now + datetime.timedelta(hours=SESSION_EXPIRY_HOURS)
    token = generate_token()

    active_count = get_active_session_count(conn, user_id)
    if active_count >= MAX_ACTIVE_SESSIONS:
        return False, f"Maximum {MAX_ACTIVE_SESSIONS} active sessions reached"

    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
        (user_id, token, expires_at)
    )
    conn.commit()
    log_audit(conn, user_id, "LOGIN", ip_address, f"Session token: {token[:8]}...")
    return True, f"Login successful. Session token: {token}"


def validate_session(conn: sqlite3.Connection, token: str) -> Tuple[bool, Optional[int]]:
    """Validate a session token and return user_id if valid."""
    cursor = conn.cursor()
    now = datetime.datetime.now()
    cursor.execute(
        "SELECT user_id FROM sessions WHERE token = ? AND expires_at > ?",
        (token, now)
    )
    row = cursor.fetchone()
    if row:
        return True, row[0]
    return False, None


def logout_session(conn: sqlite3.Connection, token: str, ip_address: str = "127.0.0.1") -> Tuple[bool, str]:
    """Logout and invalidate a session."""
    cursor = conn.cursor()
    cursor.execute(
        "SELECT user_id FROM sessions WHERE token = ? AND expires_at > ?",
        (token, datetime.datetime.now())
    )
    row = cursor.fetchone()
    if row:
        user_id = row[0]
        cursor.execute(
            "DELETE FROM sessions WHERE token = ?",
            (token,)
        )
        conn.commit()
        log_audit(conn, user_id, "LOGOUT", ip_address, "Session terminated")
        return True, "Logged out successfully"
    return False, "Invalid or expired session



Exiting...
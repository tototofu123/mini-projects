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
Author: Qwythos (Empero AI)
"""

import sqlite3
import bcrypt
import secrets
import datetime
import matplotlib.pyplot as plt
from collections import defaultdict

DB_PATH = "company.db"
SESSION_EXPIRY_HOURS = 24
MAX_SESSIONS_PER_USER = 3


def init_db():
    """Initialize the SQLite database with required tables."""
    conn = sqlite3.connect(DB_PATH)
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
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            details TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    conn.commit()
    conn.close()


def validate_password(password):
    """Check password meets policy: 8+ chars, 1 uppercase, 1 number."""
    if len(password) < 8:
        return False
    if not any(c.isupper() for c in password):
        return False
    if not any(c.isdigit() for c in password):
        return False
    return True


def hash_password(password):
    """Hash password using bcrypt."""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def check_password(password, hash):
    """Verify password against hash."""
    return bcrypt.checkpw(password.encode(), hash.encode())


def get_db_connection():
    """Return a database connection."""
    return sqlite3.connect(DB_PATH)


def register(username, password):
    """Register a new user."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if not validate_password(password):
        conn.close()
        raise ValueError("Password must be 8+ chars, contain uppercase and a digit")
    
    cursor.execute(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        (username, hash_password(password))
    )
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return user_id


def login(username, password):
    """Authenticate user and create session."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, password_hash FROM users WHERE username = ?", (username,))
    row = cursor.fetchone()
    conn.close()
    
    if not row or not check_password(password, row[1]):
        log_audit(None, "login_failure", f"Failed login attempt for {username}")
        raise ValueError("Invalid username or password")
    
    user_id = row[0]
    token = secrets.token_urlsafe(32)
    expires = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=SESSION_EXPIRY_HOURS)
    
    cursor.execute(
        "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
        (user_id, token, expires)
    )


Exiting...
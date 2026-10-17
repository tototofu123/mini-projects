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
import sqlite3
import bcrypt
import time
import uuid
import re
import matplotlib.pyplot as plt
import sys

class SessionManager:
    def __init__(self):
        self.conn = sqlite3.connect(":memory:")
        self.conn.row_factory = sqlite3.Row
        self._create_schema()

    def _create_schema(self):
        self.conn.execute("CREATE TABLE users (id TEXT PRIMARY KEY, username TEXT UNIQUE, password TEXT)")
        self.conn.execute("CREATE TABLE sessions (id TEXT PRIMARY KEY, user_id TEXT, created_at REAL)")
        self.conn.execute("CREATE TABLE audit_log (id TEXT PRIMARY KEY, username TEXT, action TEXT, status TEXT, details TEXT, ts REAL)")
        self.conn.commit()

    def _log(self, username, action, status, details=""):
        self.conn.execute(
            "INSERT INTO audit_log VALUES(?, ?, ?, ?, ?, ?)",
            (str(uuid.uuid4()), username, action, status, details, time.time())
        )
        self.conn.commit()

    def _validate_password(self, password):
        if len(password) < 8: raise ValueError("At least 8 chars")
        if not re.search(r'[A-Z]', password): raise ValueError("Need uppercase")
        if not re.search(r'\d', password): raise ValueError("Need digit")

    def register(self, username, password):
        try:
            self._validate_password(password)
            self.conn.execute("INSERT INTO users VALUES(?, ?, ?)", (str(uuid.uuid4()), username, password.encode()))
            self._log(username, "register", "success")
            return True
        except Exception as e:
            self._log(username, "register", "fail", str(e))
            raise

    def login(self, username, password):
        try:
            user = self.conn.execute("SELECT id FROM users WHERE username=?", (username,)).fetchone()
            if not user:
                self._log(username, "login", "fail", "user not found")
                raise ValueError("Invalid username")
            if not self._check_password(password, user['password']):
                self._log(username, "login", "fail", "wrong password")
                raise ValueError("Wrong password")
            if len(self.conn.execute("SELECT id FROM sessions WHERE user_id=?", (user['id'],)).all()) >= 3:
                raise ValueError("Too many sessions")
            sid = str(uuid.uuid4())
            self.conn.execute("INSERT INTO sessions VALUES(?, ?, ?)", (sid, user['id'], time.time()))
            self._log(username, "login", "success", sid)
            return sid
        except Exception as e:
            raise

    def _check_password(self, password, hashed):
        return bcrypt.checkpw(password.encode(), hashed)

    def logout(self, sid):
        user = self.conn.execute("SELECT user_id FROM sessions WHERE id=?", (sid,)).fetchone()
        if not user: raise ValueError("Invalid session")
        self.conn.execute("DELETE FROM sessions WHERE id=?", (sid,))
        self._log("unknown", "logout", "success", sid)

    def validate(self, sid):
        user = self.conn.execute("SELECT user_id FROM sessions WHERE id=?", (sid,)).fetchone()
        if not user: raise ValueError("Invalid session")
        if time.time() - user['user_id'] > 86400:
            self.conn.execute("DELETE FROM sessions WHERE id=?", (sid,))
            raise ValueError("Session expired")
        return user['user_id']

    def get_active_sessions(self):
        return self.conn.execute("SELECT user_id, COUNT(*) FROM sessions GROUP BY user_id").fetchall()

    def get_login_freq(self):
        return self.conn.execute("SELECT COUNT(*) FROM audit_log WHERE action='login' AND status='success'").fetchone()[0]

def main():
    sm = SessionManager()
    print("--- User Management ---")
    while True:
        print("\n1.Register 2.Login 3.Logout 4.Validate 5.Stats 6.Exit")
        cmd = input(">>")
        if cmd == "1":
            u, p = input("User:"), input("Pass:")
            try: sm.register(u, p); print("Registered")
            except Exception as e: print(e)
        elif cmd == "2":
            u, p = input("User:"), input("Pass:")
            try: sid = sm.login(u, p); print(f"Session {sid}")
            except Exception as e: print(e)
        elif cmd == "3":
            sid = input("Session ID:").strip()
            try: sm.logout(sid); print("Logged out")
            except Exception as e: print(e)
        elif cmd == "4":
            sid = input("Session ID:").strip()
            try: print(f"Valid user {sm.validate(sid)}")
            except Exception as e: print(e)
        elif cmd == "5":
            data = sm.get_active_sessions()
            if not data: print("No active sessions")
            else:
                users = [d[0] for d in data]
                counts = [d[1] for d in data]
                plt.figure(figsize=(10, 4))
                plt.subplot(1,2,1); plt.bar(users, counts); plt.title("Active Sessions/User")
                plt.subplot(1,2,2); plt.plot([sm.get_login_freq()], marker='o'); plt.title("Login Success Count")
                plt.tight_layout(); plt.show()
        elif cmd == "6": sys.exit()

if __name__ == "__main__":
    main()
```


Exiting...
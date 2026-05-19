import sqlite3

# Database 연결 connector
conn = sqlite3.connect('example.db')

# Cursor 객체를 통해 실제 데이터 입출력을 함
cur = conn.cursor()

# 테이블 생성
cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                age INTEGER NOT NULL
            )
""")

conn.commit()
conn.close()
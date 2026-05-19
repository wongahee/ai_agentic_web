import sqlite3

conn = sqlite3.connect('example.db')

cur = conn.cursor()

cur.execute('SELECT * FROM users')

# Cursor가 실행한 모든 결과값 출력
rows = cur.fetchall()
print(rows)

conn.close()
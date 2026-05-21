import sqlite3
import os

def initialize_database():
    # Use absolute path relative to the script's location
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, 'board.db')
    
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    # Create the posts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            hue INTEGER NOT NULL,
            likes INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    connection.commit()
    connection.close()
    print(f"Database initialized successfully at: {db_path}")

if __name__ == '__main__':
    initialize_database()

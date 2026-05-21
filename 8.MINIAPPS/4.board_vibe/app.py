from flask import Flask, render_template, jsonify, request
import sqlite3
import os
import random

app = Flask(__name__)

# Base directory for absolute paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'board.db')

def get_db_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        conn = get_db_connection()
        # Order by newest first
        posts = conn.execute('SELECT * FROM posts ORDER BY id DESC').fetchall()
        conn.close()
        
        # Convert sqlite3.Row to list of dicts
        posts_list = [dict(post) for post in posts]
        return jsonify(posts_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posts', methods=['POST'])
def create_post():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        title = data.get('title', '').strip()
        message = data.get('message', '').strip()
        
        # Simple backend validation
        if not title:
            return jsonify({"error": "Title is required"}), 400
        if not message:
            return jsonify({"error": "Message is required"}), 400
        if len(title) > 50:
            return jsonify({"error": "Title is too long (max 50 chars)"}), 400
        if len(message) > 500:
            return jsonify({"error": "Message is too long (max 500 chars)"}), 400

        # Generate a random HSL hue (0-360) for premium card accenting
        hue = random.randint(0, 360)

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO posts (title, message, hue) VALUES (?, ?, ?)',
            (title, message, hue)
        )
        conn.commit()
        new_id = cursor.lastrowid
        
        # Fetch the newly created post to send back to front-end
        new_post = conn.execute('SELECT * FROM posts WHERE id = ?', (new_id,)).fetchone()
        conn.close()
        
        return jsonify(dict(new_post)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posts/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    try:
        conn = get_db_connection()
        post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
        if not post:
            conn.close()
            return jsonify({"error": "Post not found"}), 404
            
        conn.execute('UPDATE posts SET likes = likes + 1 WHERE id = ?', (post_id,))
        conn.commit()
        
        updated_post = conn.execute('SELECT likes FROM posts WHERE id = ?', (post_id,)).fetchone()
        conn.close()
        
        return jsonify({"id": post_id, "likes": updated_post['likes']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    try:
        conn = get_db_connection()
        post = conn.execute('SELECT * FROM posts WHERE id = ?', (post_id,)).fetchone()
        if not post:
            conn.close()
            return jsonify({"error": "Post not found"}), 404
            
        conn.execute('DELETE FROM posts WHERE id = ?', (post_id,))
        conn.commit()
        conn.close()
        
        return jsonify({"success": True, "message": f"Post {post_id} deleted successfully."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask, send_from_directory, jsonify

app = Flask(__name__)

users = {
    1: {"id": 1, "name": "홍길동", "email": "hong@example.com"},
    2: {"id": 2, "name": "김철수", "email": "kim@example.com"},
    3: {"id": 3, "name": "이영희", "email": "lee@example.com"},
    4: {"id": 4, "name": "박민수", "email": "park@example.com"},
    5: {"id": 5, "name": "최지우", "email": "choi@example.com"},
}

products = {
    101: {"id": 101, "name": "Laptop", "price": 1200},
    102: {"id": 102, "name": "Keyboard", "price": 80},
    103: {"id": 103, "name": "Mouse", "price": 40},
    104: {"id": 104, "name": "Monitor", "price": 300},
    105: {"id": 105, "name": "Headphones", "price": 150},
}

# 정적 페이지 라우팅
# ----------------------- #
@app.route('/')
def home():
    return send_from_directory("static", "index.html")

@app.route('/user')
def user(user_id=None):
    return send_from_directory("static", "user.html")

@app.route('/product')
def product():
    return send_from_directory("static", "product.html")


# API 라우팅
# ----------------------- #
@app.route('/api/user/<id>')
def search_user(id):
    # 사용자 검색
    users = None

    return jsonify({"result": users})

@app.route('/api/product')
def search_product():
    # 상품 검색
    product = None

    return jsonify({"result": product})

if __name__ == "__main__":
    app.run(debug=True)
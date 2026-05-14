# 1. /user 경로 생성하여 URL 파라미터 기반 사용자 조회
# /user: 모든 사용자, /user/1: 홍길동, /user/2: 김철수
# 2. /product로 쿼리 파라미터 기반 상품 조회
# /product는 모든 상품, /product?id=101: 상품 검색 ?name: 상품 검색

from flask import Flask
from flask import render_template
from flask import request

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

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/user')
@app.route('/user/<int:user_id>')       # URL 파라미터 기반 사용자 조회
def user(user_id=None):
    return render_template("user.html", user_id=user_id, users=users)


# 쿼리 파라미터 기반 상품 조회
@app.route('/product')
def product():
    id = request.args.get('id', type=int)
    name = request.args.get('name', type=str)

    found = list(products.values())

    if id:
        found = [p for p in found if p["id"] == id]
    if name:
        found = [p for p in found if p["name"].lower() == name.lower()]

    return render_template("product.html", results=found)


if __name__ == "__main__":
    app.run(debug=True)
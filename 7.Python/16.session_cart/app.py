from flask import Flask, render_template, session, redirect, url_for
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'hello1234'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
# 세션 limit 설정

items = [
    {'id': 'item1', 'name': '햄버거', 'price': 3000},
    {'id': 'item2', 'name': '핫도그', 'price': 2000},
    {'id': 'item3', 'name': '콜라', 'price': 1500}
]
@app.route('/')
def index():
    return render_template('product.html', items=items)

@app.route('/add-to-cart/<item_id>')
def add_to_cart(item_id):
    print("장바구니에 담을 상품: ", item_id)

    if 'cart' not in session:
        session['cart'] = {}    # 딕셔너리 초기화

    # 이전에 담았으면 갯수 1 더해주기
    if item_id in session['cart']:
        session['cart'][item_id] += 1
    else:   # 안 담았으면 갯수 1 해주기
        session['cart'][item_id] = 1

    session.modified = True   # 세션 데이터 수정을 flask에 인지시킴

    return redirect(url_for('index'))

@app.route('/cart')
def view_cart():
    cart_items = {}
    total_price = 0

    # cart 비엇을 시 빈 값({})에 넣어줌
    for item_id, quantity in session.get('cart', {}).items():
        item = next((i for i in items if i['id'] == item_id), None)
        cart_items[item_id] = {
            'name': item['name'],
            'quantity': quantity,
            'price': item['price']
        }
        total_price += item['price'] * quantity

    return render_template('cart.html', cart_items=cart_items, total_price=total_price)


if __name__ == "__main__":
    app.run(debug=True)
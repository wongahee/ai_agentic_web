from flask import Flask

app = Flask(__name__)

# 라우트 처리의 두 가지 기법

# 1. 쿼리 파라미터로 처리
# POST 방식
# Http의 body에다가 payload(데이터)를 담아 보냄
# 보안성 높음
@app.route('/user')

# 2. URL 파라미터로 처리
# GET 방식
@app.route('/user/<username>')      # ../<가변인자>
def show_user_profile(username="익명"):
    return f"<h1>사용자: {username}</h1>"

@app.route('/admin')
def show_admin_profile():
    return "관리자: 홍길동"

@app.route('/product')

@app.route('/product/<int:id>')     # type 지정 (int)
def show_product_profile(id=0):
    return f"상품코드: {id}, 상품명: 사과"


if __name__ == '__main__':
    app.run(debug=True)
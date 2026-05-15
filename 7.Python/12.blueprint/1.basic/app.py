from flask import Flask, render_template

# Blueprint 사용 이유
# 각각 라우팅할 시 빠른 주소 이동이 가능하지만, 유지보수에 불편함
# 기능별로 분리하여 프로젝트 구조를 깔끔하게 관리 가능

# 각각 기능별 헨들링 import
from user_routes import user_blueprint
from admin_routes import admin_blueprint

app = Flask(__name__)

# Blueprint 등록
# url_prefix를 통해 공통 URL 경로 지정
app.register_blueprint(user_blueprint, url_prefix="/user")
app.register_blueprint(admin_blueprint, url_prefix="/admin")


# main handling
@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
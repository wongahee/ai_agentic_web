from flask import Flask, render_template, redirect, request
from dotenv import load_dotenv
import requests
import os

load_dotenv()

client_id = os.getenv('NAVER_CLIENT_ID')
client_secret = os.getenv('NAVER_CLIENT_SECRET')
callback_uri = os.getenv('NAVER_REDIRECT_URI')

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/naver/callback')
def naver_callback():
    code = request.args.get("code")
    state = request.args.get("state")
    # console.log(code, state)

    # 이 코드를 네이버에게 준 것이 맞는지 확인
    token_url = (
        f"https://nid.naver.com/oauth2.0/token?"
        f"grant_type=authorization_code&client_id={client_id}"
        f"&client_secret={client_secret}&code={code}&state=HELLO"
    )

    token_response = requests.get(token_url).json()
    access_token = token_response.get("access_token")
    print(access_token)
    # 네이버와 대화할 수 있는 인증 토큰 access_token
    # 이것을 통해 고객님의 정보를 물어봄

    # 필수 항목은 다 받아올 수 있음
    # 선택 동의 항목은 사용자 동의 시에만 받아올 수 있음

    return "인증 성공. 네이버 다녀온 것을 확인함"

@app.route('/login')
def naver_login():
    auth_url = (
        f"https://nid.naver.com/oauth2.0/authorize?"
        f"response_type=code&client_id={client_id}"
        f"&redirect_uri={callback_uri}&state=HELLO"
    )

    return redirect(auth_url)

if __name__ == "__main__":
    app.run(debug=True)
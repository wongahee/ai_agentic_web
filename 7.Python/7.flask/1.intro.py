# pip install flask
from flask import Flask

app = Flask(__name__)

# decorator
@app.route('/')

def home():
    return """
    <html>
        <head>
            <title>타이틀</title>
        </head>
        <style>
            p {
                color: red;
            }
        </style>
        <body>
            <h1>웰컴투 마이 홈</h1>
            <p>여기는 텍스트 본문이 들어갑니다.</p>
            <p>여기는 텍스트 본문 2가 들어갑니다.</p>
        </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True)     
    # debug=True: 파일 내용 변경 시 자동 인식
    # 운영 환경에서는 사용 x (변경 사항이 사용자에게 보여짐)
from flask import Flask, render_template, request
import os

app =Flask(__name__)

# 저장소 설정
app.config['UPLOAD_FOLDER'] = 'uploads'

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)    # 없을 경우 디렉토리 생성

def allowed_file(filename):
    ALLOWED_EXT = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXT     # 내사진.jpg 등의 이미지명 오른쪽부터 자르기

@app.route('/')
def index():
    return render_template('form.html')

@app.route('/login', methods=['POST'])
def login():
    id = request.form.get('id')     # ()안에 html 파일에서 설정한 name값 적기
    pw = request.form.get('pw')

    print(f"입력한 ID는 {id}, PW는 {pw}")
    return render_template('login.html', name=id)

# methods = GET(default) / POST / DELETE
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('photo')
    print(file)

    filename = file.filename    # 실 서비스 시, 여러 이용자가 업로드한 파일명이 겹칠 수 있기에 파일명을 바꿔야함
                                # timestamp, hash, userid 등의 prefix를 붙임

    if file and allowed_file(file.filename):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return "파일 받음"          # FileStorage 객체로 받음
    else:
        return f"{file.filename}은/는 지원되지 않는 파일입니다."

if __name__ == '__main__':
    app.run(debug=True)
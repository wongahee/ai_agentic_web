from flask import Flask, render_template, request

app =Flask(__name__)

@app.route('/')
def index():
    return render_template('form.html')

@app.route('/login', methods=['POST'])
def login():
    id = request.form.get('id')     # ()안에 html 파일에서 설정한 name값 적기
    pw = request.form.get('pw')
    # print(id)
    # print(pw)

    print(f"입력한 ID는 {id}, PW는 {pw}")
    return render_template('login.html', name=id)

if __name__ == '__main__':
    app.run(debug=True)
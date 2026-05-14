from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/user')
def user():
    return send_from_directory('static', 'user.html')

if __name__ == '__main__':
    app.run(debug=True)       
    # app.run(debug=True, port=5001)    
    # 맥북 사용 시, ()안에 추가 -> port=5001
    # 맥북에서 사용하는 5000 port외 다른 것을 사용하기 위해
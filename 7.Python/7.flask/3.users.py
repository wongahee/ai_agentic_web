from flask import Flask, jsonify

app = Flask(__name__)

# Python의 list form
# 각각의 리스트에 딕셔너리가 있는 형태
users = [
    {'name': 'Alice', 'age':25, 'phone': '123-456-7890'},
    {'name': 'Bob', 'age':30, 'phone': '123-555-7890'},
    {'name': 'Charlie', 'age':27, 'phone': '123-777-7890'},
    {'name': 'David', 'age': 25, 'phone': '123-888-7890'}
]

@app.route('/')
def main():
    return jsonify(users)   # 백엔드 list/dict 구조를 웹이 좋아하는 JSON 포맷으로 보내줌

@app.route('/user/<name>')
def get_user_by_name(name):
    print("사용자 입력값: ", name)      # terminal 출력됨
    user = None
    
    for u in users:
        if u['name'].lower() == name.lower():
            user = u

    if user:
        return jsonify(user)
    else:
        return jsonify({"message: " "User not found"})
    
@app.route('/user/<int:age>')
def get_user_by_age(age):
    print("사용자 입력값: ", age)

    user = []

    for u in users:
        # print(u)
        if u["age"] == age:
            user.append(u)
    if user:
        return jsonify(user)
    else:
        return jsonify({"message": "User not Found"})

if __name__ == '__main__':
    app.run(debug=True)
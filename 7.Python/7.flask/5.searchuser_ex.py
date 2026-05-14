from flask import Flask, jsonify, request

app = Flask(__name__)

users = [
    {'name': 'Alice', 'age':25, 'phone': '123-456-7890'},
    {'name': 'Bob', 'age':30, 'phone': '123-555-7890'},
    {'name': 'Charlie', 'age':27, 'phone': '123-777-7890'},
    {'name': 'David', 'age': 25, 'phone': '123-888-7890'}
]

@app.route('/search')
def search_user():
    name = request.args.get('name')
    age = request.args.get('age')
    phone = request.args.get('phone')

    result = users

    if name:
        result = [u for u in users if name.lower() in u['name'].lower()]
    if age:
        result = [u for u in result if int(age) == u['age']]
    if phone:
        result = [u for u in result if phone == u['phone'].startswith(phone)]
    # result = [u for u in result if u['phone'].startswith(phone)]
    # 시작하는 값이 같은(startswith) 전화번호를 가진 사람 출력

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
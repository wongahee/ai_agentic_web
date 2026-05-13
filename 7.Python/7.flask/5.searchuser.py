from flask import Flask, jsonify, request

app = Flask(__name__)

users = [
    {'name': 'Alice', 'age':25, 'phone': '123-456-7890'},
    {'name': 'Bob', 'age':30, 'phone': '123-555-7890'},
    {'name': 'Charlie', 'age':27, 'phone': '321-777-7890'},
    {'name': 'David', 'age': 25, 'phone': '321-888-7890'}
]

@app.route('/search/<username>/<Age>/<Phone>')
def search_user(username, Age, Phone):
    result = None

    # 쿼리 파라미터로 name, age, phone을 검색하여 결과를 반환
    username = request.args.get('q')
    Age = request.args.get('q')
    Phone = request.args.get('q')

    user_input = f"Your Name is {username} and age={Age}, Phone={Phone}"

    return jsonify({"message":user_input})


if __name__ == '__main__':
    app.run(debug=True)
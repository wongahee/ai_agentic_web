from flask import Flask, jsonify, request

app = Flask(__name__)

users = [
    {'name': 'Alice', 'age':25, 'phone': '123-456-7890'},
    {'name': 'Bob', 'age':30, 'phone': '123-555-7890'},
    {'name': 'Charlie', 'age':27, 'phone': '123-777-7890'},
    {'name': 'David', 'age': 25, 'phone': '123-888-7890'}
]

# GET
# 가변인자, 매개변수를 사용하지 않고 불러오는 방법
# & 사용 시 "" 필요
@app.route('/search')
def search():
    
    query = request.args.get('q')
    page = request.args.get('page', default=1, type=int)

    user_input = f"Your query is {query} and page={page}"

    return jsonify({"message":user_input})

    # http://127.0.0.1:5000/search?q=apple에서 확인 가능
    # Prompt에 : curl "http://127.0.0.1:5000/search?q=apple&page=30"


# curl http://127.0.0.1:5000/user/alice/post?page=5
@app.route('/user/<username>/post')
def show_user_posts(username):
    page = request.args.get('page', default=1, type=int)
    result = f'User is {username} and page is {page}'
    return jsonify({"message": result})


if __name__ == '__main__':
    app.run(debug=True)
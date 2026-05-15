from flask import Blueprint, render_template

user_blueprint = Blueprint('user', __name__)   # ('명칭', ~ )

# 해당 페이지에서는 root(/)이지만 app
@user_blueprint.route('/')
def user_page():
    return render_template('user.html')
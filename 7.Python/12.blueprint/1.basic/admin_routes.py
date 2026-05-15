from flask import Blueprint, render_template

admin_blueprint = Blueprint('admin', __name__)   # ('명칭', ~ )

# 해당 페이지에서는 root(/)이지만 app
@admin_blueprint.route('/')
def admin_page():
    return render_template('admin.html')
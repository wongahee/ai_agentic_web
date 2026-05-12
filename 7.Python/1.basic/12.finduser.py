users = [
    {"name": "김민수", "age": 25, "location": "서울", "car": "현대"},
    {"name": "이지은", "age": 29, "location": "부산", "car": "기아"},
    {"name": "박서준", "age": 31, "location": "대구", "car": "BMW"},
    {"name": "최하은", "age": 22, "location": "인천", "car": "아우디"},
    {"name": "윤도윤", "age": 27, "location": "광주", "car": "테슬라"},
    {"name": "한수빈", "age": 24, "location": "대전", "car": "벤츠"},
    {"name": "이예준", "age": 33, "location": "울산", "car": "쉐보레"},
    {"name": "김채원", "age": 26, "location": "수원", "car": "토요타"},
    {"name": "오지호", "age": 30, "location": "제주", "car": "포르쉐"},
    {"name": "백유진", "age": 28, "location": "천안", "car": "볼보"}
]

def find_user_and_print(name):
    for user in users:
        # if user["name"] == name:          # 정확한 이름 찾기
        if user["name"].startswith(name):   # 성으로 찾기
                print(user)

find_user_and_print("김")
find_user_and_print("오")

print('-' * 30)

def find_user_and_return(name):
    found = []         # 찾은 사용자를 담을 list

    for user in users:
          if user["name"].startswith(name):
               found.append(user)

    return found

# found_users = find_user_and_return("김")
# found_users = find_user_and_return("오")
found_users = find_user_and_return("윤")
print("찾은 사용자: ", found_users)

print('-' * 30)

def find_users2(name=None, age=None):
    """이름 또는 나이를 입력받아 매칭되는 사람을 반환"""
    found = []

    for user in users:
        if name is not None and age is not None:
            if user["name"] == name and user["age"] == age:
                found.append(user)
        elif name is not None:
             if user["name"] == name:
                  found.append(user)
        elif age is not None:
            if user["age"] == age:
                found.append(user)

    return found

# print(find_users2("김민수"))
# print(find_users2("김민수", 24))
# print(find_users2("김민수", 25))
print(find_users2(age=25))

print('-' * 30)

def find_users2_better(name=None, age=None, location=None):
    """이름 or 나이를 입력받아 매칭되는 사람 반환"""
    found =[]
    
    for user in users:
        if(name is None or user["name"] == name) and (age is None or user["age"] == age) and (location is None or user["location"] == location):
            found.append(user)
    return found

# print(find_users2_better("김민수"))
# print(find_users2_better("김민수", 24))
print(find_users2_better("김민수", 25, "서울"))
# print(find_users2_better(age=25))

print('-' * 30)

search_condition1 = {
    "name": "김민수"
}

search_condition2 = {
    "name": "김민수",
    "age": 25
}

search_condition3 = {
    "age": 25
}

search_condition4 = {
    "min_age": 25
}

# def find_users2_best(condition):
#     found = []
#     for user in users:
#         if user.get("name") == condition.get("name", "") and \
#             user.get("age") >= condition.get("min_age", 0) and \
#             user.get("location") == condition.get("location", ""):
#             found.append(user)

#     return found

# print(find_users2_best(search_condition1))
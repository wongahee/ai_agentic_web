# from 파일명 import 객체
from person import Person

class Employee(Person):
    def __init__(self, name, age, company):
        super().__init__(name, age)     # 상속받은 속성 가져오기
        self.company = company

    # 메서드 오버라이딩, Overriding
    def greet(self):
        print(f"안녕하세요, 저는 {self.company}에 다니고 있는 {self.name}입니다.")
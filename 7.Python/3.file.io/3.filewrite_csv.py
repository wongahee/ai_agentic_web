import csv

# 리스트형
data = [
    ["Name", "Age", "City"],
    ["John", 25, "Seoul"],
    ["James", 23, "Busan"],
    ["Bob", 24, "Seoul"]
]

filename = "data.csv"

with open(filename, "w", newline="") as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)

# 딕셔너리형
# 딕셔너리형은 메모리를 더 많이 차지만, 상대적으로 최신 기술임
data2 = [
    {"Name":"John", "Age":25, "City":"Seoul"},
    {"Name":"James", "Age":23, "City":"Busan"},
    {"Name":"Bob", "Age":24, "City":"Seoul"}
]

with open(filename, "w", newline="") as file:
    # headers = ["Name", "Age", "City"]
    headers = data2[0].keys()         # 헤더 추출하기
    csv_writer = csv.DictWriter(file, fieldnames=headers)   # DictWriter: 딕셔너리 파싱 기능
    csv_writer.writeheader()        # 헤더 적용
    csv_writer.writerows(data2)     # csv로 파싱하여 저장하기
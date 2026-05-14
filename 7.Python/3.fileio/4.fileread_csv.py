import csv

filename = "data.csv"

#  list 형태로 복원 (예전 방식)
data = []

with open(filename, "r") as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        data.append(row)

    
print(data)

# dict 형태로 복원 (모던 방식)
data2 = []

with open(filename, "r") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        data2.append(row)

print(data2)
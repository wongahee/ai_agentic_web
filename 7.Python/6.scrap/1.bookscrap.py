# 1. books.toscrape.com에 접속해서 페이지를 받아옴
# 2. DOM을 bs4로 구성함
# 3. 첫 페이지의 도서명, 평점, 가격을 받아옴
# 4. CSV 파일로 저장한다.

import requests
from bs4 import BeautifulSoup
import csv

url = "https://books.toscrape.com/"

resp = requests.get(url)
resp.encoding = "utf-8"

soup = BeautifulSoup(resp.text, "html.parser")
# print(soup)

# 방법 1.
# books = soup.find_all("article", class_="product_pod")

# 방법 2.
books = soup.select("article.product_pod")

rating_map = {
    "One": 1,
    "Two": 2,
    "Three": 3,
    "Four": 4,
    "Five": 5    
}

with open("books.csv", "w", newline="", encoding="utf-8") as file:
    csv_writer = csv.writer(file)
    csv_writer.writerow({"도서명", "평점", "가격"})

    for book in books:
        # 제목
        title = book.h3.a["title"]
        
        # 평점
        rating = book.p["class"][1]
        rating_num = rating_map[rating]

        # 가격
        price = book.select_one(".price_color").text
        price = price.replace("£", "")

        # print(f"도서명: {title}, 평점: {rating}, 가격: {price}")
        csv_writer.writerow({title, rating, price})

print("파일 작성 완료")
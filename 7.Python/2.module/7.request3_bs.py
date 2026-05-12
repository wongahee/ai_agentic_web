import requests
from bs4 import BeautifulSoup

url = "https://www.example.com"

resp = requests.get(url)

soup = BeautifulSoup(resp.text, "html.parser")
# print(soup)

title = soup.find("title")
print(title)

headings = soup.find_all("h1")
print(headings)

divs = soup.find_all("div")
print(divs)

for elem in divs:
    link = elem.a       # 요소 중 a태그 찾기
    
    if link:
        href = link.get("href")
        print("링크 주소: ", href)
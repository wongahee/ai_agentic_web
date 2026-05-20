from dotenv import load_dotenv      # 키값 보호하기
import requests
import os

load_dotenv()

client_id = os.getenv("NAVER_CLIENT_ID")
client_secret = os.getenv("NAVER_CLIENT_SECRET")

text = "파이썬 웹 개발"     # 검색 키워드
url = "https://openapi.naver.com/v1/search/blog.json"   # blog 검색
# url = "https://openapi.naver.com/v1/search/news.json"   # new 검색

headers = {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret
}

params = {
    "query": text
}

response = requests.get(url, params=params, headers=headers)
# print(response)     # 성공 시 200 출력
data = response.json()

print(data)
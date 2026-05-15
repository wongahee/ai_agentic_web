# API 사용하기 (Google Cloud)
# API_KEY 발급 - 필요한 API 선택

# pip install python-dotenv
from dotenv import load_dotenv
import os
import requests

# .env 파일을 읽어 해당 key, value를 메모리(환경변수)에 올려둠
load_dotenv()

# API_KEY = '키입력'
API_KEY = os.getenv("YOUTUBE_API_KEY")

url = 'https://www.googleapis.com/youtube/v3/search'

search_query = "파이썬 튜토리얼"

params = {
    'part': 'snippet',
    'q': search_query,
    'type': 'video',
    'maxResults': 50,
    'key': API_KEY
}

response = requests.get(url, params)
data = response.json()
print(data)

for item in data['items']:
    title = item['snippet']['title']    # 2차원 구조
    video_id = item['id']['videoId']
    video_url = f"https://www.youtube.com/watch?v={video_id}"
    description = item['snippet']['description']

    print(f"제목: {title}, URL: {video_url}, 설명: {description}")
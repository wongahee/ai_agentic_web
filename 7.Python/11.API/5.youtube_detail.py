# pip install python-dotenv

import os
import requests
from dotenv import load_dotenv

# .env 로드
# 해당 key, value를 메모리(환경변수)에 올려둠
load_dotenv()

# API_KEY = '키입력'
API_KEY = os.getenv("YOUTUBE_API_KEY")

search_url = 'https://www.googleapis.com/youtube/v3/search'
main_video_url = 'https://www.googleapis.com/youtube/v3/videos'

search_query = "파이썬 튜토리얼"

search_params = {
    'part': 'snippet',
    'q': search_query,
    'type': 'video',
    'maxResults': 50,
    'key': API_KEY
}

response = requests.get(search_url, search_params)

data = response.json()
# print(data)

search_results = data['items']

# 결과 표시할 위치
table = []

# 데이블 헤더 - 가져오고 싶은 추가정보
table_header = ['index', 'title', 'view count', 'video url']

for index, result in enumerate(search_results, start=1):
    
    title = result['snippet']['title']
    video_id = result['id']['videoId']
    video_url = f"https://www.youtube.com/watch?v={video_id}"

    # 원하는 정보를 얻기 위해 공식문서로 파라미터 확인
    video_params = {
        'part': 'statistics',
        'id': video_id,
        'key': API_KEY
    }

    video_response = requests.get(main_video_url, video_params)

    video_data = video_response.json()

    if 'items' in video_data and video_data['items']:
        view_count = video_data['items'][0]['statistics']['viewCount']
    else:
        view_count = 'N/A'

    table.append([index, title, view_count, video_url])

print(table)
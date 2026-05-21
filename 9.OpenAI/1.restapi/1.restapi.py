from dotenv import load_dotenv
import os
import requests

load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
user_input = "안녕하세요, 반갑습니다. 오늘 저녁에 난 뭘 먹으면 좋을까?"

response = requests.post(
    'https://api.openai.com/v1/chat/completions',
    json= {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {'role': 'system', 'content': '너는 나를 잘 도와주는 경력 20년차 SW 개발자야.'},  # 시스템 프롬프트: 대화 목적 정의
            {'role': 'user', 'content': user_input}        
        ],
        'temperature' : 0.7
    },
    headers= {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {openai_api_key}'     # Basic 인증
    }
)

data = response.json()
final_response = data['choices'][0]['message']['content']

print(final_response)
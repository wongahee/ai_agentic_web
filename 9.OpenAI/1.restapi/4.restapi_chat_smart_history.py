from dotenv import load_dotenv
import os
import requests

load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
user_input = "안녕하세요, 반갑습니다. 오늘 저녁에 난 뭘 먹으면 좋을까?"

# 대화 내용 저장함수 생성
message = []
message.append({'role': 'system', 'content': '너는 나를 잘 도와주는 경력 20년차 개그맨이야.'})

def ask_chatbot(user_input):
    try:
        message.append({'role': 'user', 'content': user_input})

        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            json= {
                'model': 'gpt-3.5-turbo',
                'messages': message,
                'temperature' : 1.0
            },
            headers= {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {openai_api_key}'     # Basic 인증
            }
        )

        data = response.json()
        final_response = data['choices'][0]['message']['content']

        message.append({'role': 'user', 'content': final_response})


        # 예시 - 히스토리 10개 (5개의 오고간 대화)로 제한
        message[:] = [message[0:]] + message[-10:]
        
    except Exception as e:
        print('오류: ', e)

    return final_response

# print(ask_chatbot("안녕하세요"))
# print(ask_chatbot("오늘은 2026년 5월 5일 어린이날 입니다."))
# print(ask_chatbot("오늘은 무슨 날인가요?"))

while True:
    user_input = input("\n 당신의 질문: ").strip()
    if user_input.lower() in ['quit', 'exit', '종료', '끝']:
        print("대화를 종료합니다. 안녕히 가세요.")
        break
    else:
        print("대화를 생성중입니다. 잠시만 기다려주세요...")
        print("챗봇 응답: ", ask_chatbot(user_input))
        print("-" * 60)
import openai, base64
from dotenv import load_dotenv
import os

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=openai_api_key)

# 이미지를 읽어서 base64로 인코딩하는 함수
def encode_image_to_base64(image_path):
    with open(image_path, "rb") as file:
        base64_bytes = base64.b64encode(file.read()).decode('utf-8')
        return f"data:image/jpeg;base64,{base64_bytes}"

def ask_chatbot(image_path, user_input):
    image_base64 = encode_image_to_base64(image_path)

    final_message = [
        {'role':'system', 'content': '당신은 트레이너입니다.'},
        {'role':'user', 'content': [
            {
                "type": "text",
                "text": user_input
            },
            {
                "type": "image_url",
                "image_url": {
                    "url" : image_base64    # 사진을 base64로 인코딩한 텍스트
                }
            }
        ]}
    ]
    
    response = client.chat.completions.create(
        model='gpt-4o',     # gpt-4 시리즈부터 이미지 지원
        messages=final_message
    )

    final_response = response.choices[0].message.content
    return final_response

image_path = "fam.jpg"
question = "여기에는 몇 마리의 동물이 있나요?"

# image_path = "squats-good.jpg"
# image_path, question = "나의 운동 자세가 어떤지 전문가 입장으로 해석해주세요."

print("*" * 60)

# image_path = "squats-bad.jpg"
# image_path, question = "나의 운동 자세가 어떤지 전문가 입장으로 해석해주세요."

print(ask_chatbot(image_path, question))
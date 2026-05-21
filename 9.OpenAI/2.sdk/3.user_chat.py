import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = openai.OpenAI(api_key=openai_api_key)  # 모든 대화를 클라이언트를 통해 진행

def ask_chatbot(user_input):
    response = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=[
            {'role':'system', 'content': '당신은 나의 질문에 잘 답변하는 챗봇입니다.'},
            {'role':'user', 'content': user_input}
        ]
    )
    final_response = response.choices[0].message.content
    return final_response

while True:
    user_input = input("\n질문: ").strip()
    chatbot_response = ask_chatbot(user_input)
    print("챗봇 응답: ", chatbot_response)
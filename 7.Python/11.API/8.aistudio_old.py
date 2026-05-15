# deprecated
# pip install google-generativeai

import os
from dotenv import load_dotenv
import google.generativeai as genai

# API KEY 불러오기
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

response = model.generate_content("파이썬이 뭔지 이해하기 쉽게 설명해줘")

print(response.text)
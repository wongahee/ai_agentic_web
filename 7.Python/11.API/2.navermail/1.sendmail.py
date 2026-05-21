import smtplib
import os
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = 'smtp.naver.com'
SMTP_PORT = 587

NAVER_ID = os.getenv('NAVER_MAIL_ID')
NAVER_PASSWORD = os.getenv('NAVER_MAIL_APP_SECRET')
NAVER_EMAIL = f"{NAVER_ID}@naver.com"

subject = "네이벌 메일 보내기 테스트 중"
body = "<html><body><h1>이메일은 파이썬을 통해 작성되었습니다.</h1></body></html>"

# MIMEType으로 이메일이 작성됨. 본문을 MIMEText으로 인코딩
message = MIMEText(body, 'html', _charset='utf-8')
# print(message)
message['Subject'] = subject
message['From'] = NAVER_EMAIL
message['To'] = NAVER_EMAIL

# print(message)
try:
    smtp = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    smtp.starttls()     # TLS 보안 연결 시작
    smtp.login(NAVER_ID, NAVER_PASSWORD)
    smtp.sendmail(NAVER_EMAIL, message['To'], message.as_string())

    print("메일이 성공적으로 전달되었습니다.")
except Exception as e:
    print(f"메일 전송 중 오류 발생: {e}")
finally:
    smtp.quit()
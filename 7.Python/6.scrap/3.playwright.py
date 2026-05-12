# pip install playwright
# playwright install
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # 크롬 실행
    browser = p.chromium.launch(headless=False)

    # 빈 페이지 띄우기
    page = browser.new_page()

    # 원하는 사이트로 가게함
    page.goto("https://www.naver.com")

    # 페이지 타이틀 표시
    print(page.title())

    # 화면 캡쳐 후 저장
    page.screenshot(path="naver.png")

    input("Enter 시 종료")
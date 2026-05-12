# 잡코리아 개발자 공고 컨텐츠 출력하기
# 스킬, 요건 등 정보 추출하기

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    page.goto("https://www.jobkorea.co.kr/")

    headlines = page.locator("")

    links = []

    for i in range(headlines.count()):
        news = headlines.nth(i)

        # 1) 뉴스 헤드라인 추출
        title = news.inner_text().strip()
        
        # 2) 링크 가져오기
        href = news.get_attribute('href')

        links.append({
            "title": title,
            "href": href
        })

    for news in links:
        print("-" * 60)
        print("제목: ", news['title'])
        print("링크: ", news['href'])

        # 게시물로 이동
        page.goto(news['href'])

        # 3) 본문 추출
        content = page.locator("#dic_area").inner_text().strip()
        
        print("본문: ", content)
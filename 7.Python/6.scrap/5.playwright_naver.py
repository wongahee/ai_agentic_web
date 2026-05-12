from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    page.goto("https://news.naver.com/section/105")

    headlines = page.locator("a.sa_text_title")
    # headlines = page.locator(".section_article.as_headline a.sa_text_title")
    # print("헤드라인 갯수: ", headlines.count())

    for i in range(headlines.count()):
        headline = headlines.nth(i)

        # 뉴스 헤드라인 추출
        title = headline.locator("strong").inner_text()
        # title = headline.inner_text().strip()
        
        # 링크 가져오기
        url = headline.get_attribute('href')

        print(f"{i + 1}. {title} \n {url}")

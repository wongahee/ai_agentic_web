from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    page.goto("https://www.wanted.co.kr/")

    zone = page.locator(".JobCard_JobCard__body__KVSqk.wds-1cgr1sd")
    print(zone.count())

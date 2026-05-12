import requests
from bs4 import BeautifulSoup
import csv

url = "https://www.naver.com/"

resp = requests.get(url)
resp.encoding = "utf-8"

soup = BeautifulSoup(resp.text, "html.parser")
print(soup)


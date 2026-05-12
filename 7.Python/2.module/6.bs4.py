# pip install bs4
from bs4 import BeautifulSoup

html = """
<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
        <h1>Title</h1>
        <p>여기는 첫번째 Paragraph</p>
        <p>여기는 두번째 Paragraph</p>
    </body>
</html>
"""

soup = BeautifulSoup(html, "html.parser")

print(soup)

# 출력값
# <html>
# <head>
# <title>Hello</title>
# </head>
# <body>
# <h1>Title</h1>
# <p>여기는 첫번째 Paragraph</p>
# <p>여기는 두번째 Paragraph</p>
# </body>
# </html>

#  -------------------------------------------------------------------------------
heading = soup.find_all('h1')
paragraph = soup.find_all('p')

print(heading)
print(paragraph)

# 출력값
# [<h1>Title</h1>]
# [<p>여기는 첫번째 Paragraph</p>, <p>여기는 두번째 Paragraph</p>]
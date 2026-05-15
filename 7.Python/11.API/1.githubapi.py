import requests

url = 'http://api.github.com/users/lovehyun/repos'

resp = requests.get(url)    # 응답 받아오기
repos = resp.json()          # 응답 json으로 파싱

# print(repos)
data = []

for repo in repos:
    name = repo['name']
    html_url= repo['html_url']
    description= repo['description']
    
    data.append({'name':name, 'html_url':html_url, 'desc':description})

print(data)

print(f"{'리포 이름': <30} {'URL': <50} {'설명':<20}")

for d in data:
    print(f"{d['name']:<30} {d['html_url']:<50}")
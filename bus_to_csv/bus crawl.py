import requests
import csv
import numpy as np
import pandas as pd
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'}

res = requests.get('http://www.hoseo.ac.kr/Home/Contents.mbz?action=MAPP_1708220067', headers = headers)
soup = BeautifulSoup(res.content, 'html.parser')
data = soup.select('table:nth-of-type(2) > tbody tr')

edit_data = list()
for x in data:
    edit_data.append(x.text.strip().split('\n')[1:])

df = pd.DataFrame(edit_data)
f = open('bus_out.csv', 'w', newline='', encoding="utf-8")
wr = csv.writer(f)

for x in range(df.shape[1]):
    wr.writerow(df[x])
f.close()

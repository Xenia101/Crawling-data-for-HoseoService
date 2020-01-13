# Crawling data for HoseoService

Crawling data(meal, library) for [HoseoService](https://github.com/Xenia101/HoseoService-on-Kakao-ch) using node.js

## 설치 방법

- modules
```javascript 
var client = require('cheerio-httpcli');
var moment = require('moment');
``` 

- 실행 환경 / 테스트 환경
  - node.js on windows10 or linux
  
## 예시

- Crawling meal data

```javascript
let data = JSON.parse($.html().replace('var xlivinghall= ', '').replace(';', ''));
console.log(data);
```

```javascript
{
  'year' : '',
  'month': '',
  'week' : '',
  'day1' : '',
  'eat11':'data',
  'eat12':'data',
  'day2' : '',
  ...
}
```

- Crawling library data

```javascript
let data = JSON.parse($.html());
data = data['data']['list'];

let name = data[index]['name'];
let total = data[index]['total'];
let occupied = data[index]['occupied'];
let available = data[index]['available'];
let percent = Math.round(occupied/total * 100);
```

```javascript
{
  'name' : '',
  'total' : '',
  'occupied' : '',
  'available' : ''
}
```

- Crawling university schedule

```javascript
let msg = m.month()+1;
for (let index = 0; index < $('.firstDate').length; index++) {
            msg += $('.firstDate')[index]['children'][0]['data'].trim() + " : " + $('td h4')[index]['children'][0]['data'].trim() + "\n";
}
```

- Crawling bus data to csv

```python
data = soup.select('table:nth-of-type(2) > tbody tr')

edit_data = list()
edit_data.append(x.text.strip().split('\n')[1:] for x in data)
df = pd.DataFrame(edit_data)

# output - bus_out.csv
```

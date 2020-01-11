# Crawling data for HoseoService

Crawling data(meal, library) for [HoseoService](https://github.com/Xenia101/HoseoService-on-Kakao-ch) using node.js

## 설치 방법

- modules
```javascript 
var client = require('cheerio-httpcli');
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
  'available' : '',
}
```

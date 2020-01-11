var client = require('cheerio-httpcli');

let url = 'https://library.hoseo.ac.kr/smufu-api/pc/2/rooms-at-seat?branchGroupId=1&isActive=true';
//let url = 'https://library.hoseo.ac.kr/smufu-api/pc/2/rooms-at-seat?branchGroupId=2&isActive=true';


client.set('headers', { 
    'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 
    'Accept-Charset': 'utf-8'
}); 

client.fetch(url, {}, function(err, $, res){
    if(err){
        console.log(err);
        return;
    }
    else{
        data = JSON.parse($.html());
        data = data['data']['list'];
        
        for (let index = 0; index < data.length; index++) {
            let name = data[index]['name'];
            let total = data[index]['total'];
            let occupied = data[index]['occupied'];
            let available = data[index]['available'];
            let percent = Math.round(occupied/total * 100);
            console.log(name + '\n전체 좌석수 : ' + total + '\n사용 좌석수 : ' + occupied  + '\n잔여 좌석수 : ' + available + '\n이용율 : ' + percent + '%\n');
        }
    }
});

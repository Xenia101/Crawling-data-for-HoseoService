var client = require('cheerio-httpcli');
var moment = require('moment');

let url = 'http://www.hoseo.ac.kr/Home//SCDList.mbz?action=MAPP_1708250140&schIdx=0&schYear=2020&schMonth=01&schClassify=%ED%95%99%EB%B6%80&schKeyword=';

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
        var m = moment();
        let msg = m.month()+1 + '월 학사일정\n\n'
        for (let index = 0; index < $('.firstDate').length; index++) {
            msg += $('.firstDate')[index]['children'][0]['data'].trim() 
            + " : " + $('td h4')[index]['children'][0]['data'].trim() + "\n";
        }
        msg = msg.slice(0,-1);
        console.log(msg);
    }
});


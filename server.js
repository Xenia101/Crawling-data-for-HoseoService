var client = require('cheerio-httpcli');
var moment = require('moment');
let url = 'http://hoseoin.hoseo.ac.kr/dbimage/livinghall/Menu/livinghall.js';

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
        data = JSON.parse($.html().replace('var xlivinghall= ', '').replace(';', ''));
        day = moment().day();
        if(day == 1){return data['eat11'] + '\n' + data['eat12'];}
        else if(day == 2){return data['eat21'] + '\n' + data['eat22'];}
        else if(day == 3){return data['eat31'] + '\n' + data['eat32'];}
        else if(day == 4){return data['eat41'] + '\n' + data['eat42'];}
        else if(day == 5){return data['eat51'] + '\n' + data['eat52'];}
        else if(day == 6){return 'X';}
        else{return 'X';}
    }
});


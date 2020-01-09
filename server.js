var client = require('cheerio-httpcli');
let url = 'http://hoseoin.hoseo.ac.kr/dbimage/livinghall/Menu/livinghall.js';

var param = {}; 
client.set('headers', { 
    'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 
    'Accept-Charset': 'utf-8'
}); 
client.fetch(url, param, function(err, $, res){
    if(err){
        console.log(err);
        return;
    }
    console.log(JSON.parse($.html()).replace('var xlivinghall= ','').replace(';',''));
});

const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const request = require("request");
const cheerio = require("cheerio-httpcli");
const moment = require("moment");

const apiRouter = express.Router();

let url = 'http://hoseoin.hoseo.ac.kr/dbimage/livinghall/Menu/livinghall.js';

cheerio.set('headers', {
  'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  'Accept-Charset': 'utf-8'
});

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use('/api', apiRouter);

apiRouter.post('/eat', function(req, res) {
  cheerio.fetch(url, {}, function(err, $){
    if(err){
        console.log(err);
        return;
    }
    else{
        data = JSON.parse($.html().replace('var xlivinghall= ', '').replace(';', ''));
        day = moment().day();

        if(day == 1){r_data = '▼아침식사▼\n' + data['eat11'] + '\n\n▼저녁식사▼\n' + data['eat12'];}
        else if(day == 2){r_data = '▼아침식사▼\n' + data['eat21'] + '\n\n▼저녁식사▼\n' + data['eat22'];}
        else if(day == 3){r_data = '▼아침식사▼\n' + data['eat31'] + '\n\n▼저녁식사▼\n' + data['eat32'];}
        else if(day == 4){r_data = '▼아침식사▼\n' + data['eat41'] + '\n\n▼저녁식사▼\n' + data['eat42'];}
        else if(day == 5){r_data = '▼아침식사▼\n' + data['eat51'] + '\n\n▼저녁식사▼\n' + data['eat52'];}
        else if(day == 6){r_data = "식사가 없습니다.";}
	else{r_data = "식사가 없습니다."}

        const responseBody = {
   	  version: "2.0",
   	  template: {
    	    outputs: [
   	      {
         	simpleText: {
             	  text: r_data
                }
              }
            ]
          }
	}
	res.status(200).send(responseBody);
    }
  });
});

apiRouter.post('/l_asan', function(req, res) {
  cheerio.fetch(url, {}, function(err, $){
    if(err){
        console.log(err);
        return;
    }
    else{
	let url = 'https://library.hoseo.ac.kr/smufu-api/pc/1/rooms-at-seat?branchGroupId=1&isActive=true';

	cheerio.set('headers', {
	    'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 
	    'Accept-Charset': 'utf-8'
	});

	cheerio.fetch(url, {}, function(err, $){
	    if(err){
	        console.log(err);
	        return;
	    }
	    else{
	        data = JSON.parse($.html());
	        data = data['data']['list'];

		let r_data = '호서대 아산캠 열람실 이용현황\n\n';

		for (let index = 0; index < data.length; index++) {
       		     let name = data[index]['name'];
       		     let total = data[index]['total'];
       		     let occupied = data[index]['occupied'];
       		     let available = data[index]['available'];
          	     let percent = Math.round(occupied/total * 100);
           	     r_data += '-' + name + '-\n전체 좌석수 : ' + total + '\n사용 좌석수 : ' + occupied  + '\n잔여 좌석수 : ' + available + '\n이용율 : ' + percent + '%\n\n';
        	}
		r_data = r_data.slice(0,-2);
		const responseBody = {
	            "version": "2.0",
        	    "template": {
        	        "outputs": [
        	            {
        	                "simpleText": {
        	                    "text": r_data
        	                }
        	            }
        	        ]
        	    }
		}
		res.status(200).send(responseBody);
	    }
	});
    }
  });
});


apiRouter.post('/l_cheonan', function(req, res) {
  cheerio.fetch(url, {}, function(err, $){
    if(err){
        console.log(err);
        return;
    }
    else{
        let url = 'https://library.hoseo.ac.kr/smufu-api/pc/2/rooms-at-seat?branchGroupId=1&isActive=true';

        cheerio.set('headers', {
            'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
            'Accept-Charset': 'utf-8'
        });

        cheerio.fetch(url, {}, function(err, $){
            if(err){
                console.log(err);
                return;
            }
            else{
                data = JSON.parse($.html());
                data = data['data']['list'];

                let r_data = '호서대 천안캠 열람실 이용현황\n\n';

                for (let index = 0; index < data.length; index++) {
                     let name = data[index]['name'];
                     let total = data[index]['total'];
                     let occupied = data[index]['occupied'];
                     let available = data[index]['available'];
                     let percent = Math.round(occupied/total * 100);
                     r_data += '-' + name + '-\n전체 좌석수 : ' + total + '\n사용 좌석수 : ' + occupied  + '\n잔여 좌석수 : ' + available + '\n이용율 : ' + percent + '%\n\n';
                }
		r_data = r_data.slice(0,-2);
                const responseBody = {
                    "version": "2.0",
                    "template": {
                        "outputs": [
                            {
                                "simpleText": {
                                    "text": r_data
                                }
                            }
                        ]
                    }
                }
                res.status(200).send(responseBody);
            }
        });
    }
  });
});


app.listen(3001, function() {
  console.log('Example skill server listening on port 3000!');
});

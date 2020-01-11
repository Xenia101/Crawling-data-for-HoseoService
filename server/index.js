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

apiRouter.post('/library', function(req, res) {
  cheerio.fetch(url, {}, function(err, $){
    if(err){
        console.log(err);
        return;
    }
    else{
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



app.listen(3000, function() {
  console.log('Example skill server listening on port 3000!');
});


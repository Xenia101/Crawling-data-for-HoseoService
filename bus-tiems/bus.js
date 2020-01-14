const fs = require('fs');
const moment = require('moment');


let where = 0; // where 0~13
fs.readFile('bus_out.csv', 'utf8', function (err, data) { 
    var dataArray = data.split(/\r?\n/); 

    const dates = dataArray[where].replace(' ','').split(',');

    for (let index = 0; index < dates.length; index++) {
        dates[index] = moment(dates[index], 'HH:mm').format('HH:mm');
    }

    const timesafter = dates.map(function(s){
        var t = moment(s, "HH:mm");
        return t;
    }).sort(function(m){
        console.log(m.valueOf());
        return m.valueOf();
    }).find(function(m){console.log(m); return m.isAfter();});

    const timesbefore = dates.map(function(s){
        var t = moment(s, "HH:mm");
        return t;
    }).sort(function(m){
        return m.valueOf();
    }).reverse(function(r){
        return r.reverse();
    }).find(function(m){return m.isSameOrBefore();});

    let msg1, msg2;
    if (timesafter) {msg1="다음 버스 - " + timesafter.format("HH:mm") + " [which is " + timesafter.fromNow() + "]";}
    else {msg1="No more buses";}
    if (timesbefore) {msg2="이전 버스 - " + timesbefore.format("HH:mm") + " [which is " + timesbefore.fromNow() + "]";}
    else {msg2="No more buses";}
    console.log(msg2);
    console.log(msg1);
})
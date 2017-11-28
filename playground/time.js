var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth()+1);
// console.log(moment('20150217','YYYYMMDD').fromNow());

// var date=moment('5 Feb 2017','DD MMM YYYY');
//
// // console.log(date.format('Do of MMM, Year of our Lord  YYYY'));
// date.add('-3','years');
// console.log(date.format('Do of MMM, YYYY'))

var someTimeStamp = new moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date =new moment(createdAt);

console.log(date.format('LT'));
//console.log(date.subtract(12, 'hours').format('h:mm a'));
console.log(date.format('Do MMMM YYYY h:mm:ss:SSS a'));

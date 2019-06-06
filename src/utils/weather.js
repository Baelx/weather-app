const request = require('request');
const creds = require('./creds.js');

const weather = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${creds.darksky}/${lat},${long}`;

  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback("Can't reach weather service!", undefined);
    } else if (body.error){
      callback(body.error, undefined);
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees and there is a ${body.currently.precipProbability}% chance of preciptation.`);
    }
  })
}

module.exports = weather;

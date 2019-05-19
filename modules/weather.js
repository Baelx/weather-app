const request = require('request');
const creds = require('./creds.js');

const weather = (lat, long, callback) => {
  const darkskyURL = `https://api.darksky.net/forecast/${creds.darksky}/${lat},${long}`;

  request({url: darkskyURL, json: true}, (err, res) => {
    if (err) {
      callback("Can't reach weather service!", undefined);
    } else if (res.body.error){
      callback(res.body.error, undefined);
    } else {
      callback(undefined, `${res.body.daily.data[0]. summary} It is currently ${res.body.currently.temperature} degrees and there is a ${res.body.currently.precipProbability}% chance of preciptation.`);
    }
  })
}

module.exports = weather;

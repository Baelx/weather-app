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
      callback(undefined, {
        summary: body.daily.data[0].summary,
        time: body.currently.time,
        temp: body.currently.temperature,
        precip: body.currently.precipProbability,
        uv: body.currently.uvIndex,
        humidity: body.currently.humidity,
        wind: body.currently.windSpeed,
        alerts: body.currently.alerts
// {
//           title: body.alerts[0].title,
//           desc: body.alerts[0].description,
//           uri: body.alerts[0].uri
//         }
      })
    }
  })
}

module.exports = weather;

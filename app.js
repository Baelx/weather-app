const request = require('request');
const creds = require('./creds.js');

const links = {
  darksky: `https://api.darksky.net/forecast/${creds.darksky}/12.8267,-122.4233`,
  mapbox: `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json${creds.mapbox}`
}

// HTTP query strings for custom responses
const query = {
  lang: {
    en: '?lang=en',
    fr: '?lang=fr'
  },
}


const options = {
  url: links.darksky,
  json: true
}

// Weather data
request(options, (err, res) => {
  if (err){
    console.log("Can't reach the weather service site!");
  } else if (res.body.error) {
    console.log(res.body.error);
  } else {
    console.log(`${res.body.daily.data[0]. summary} It is currently ${res.body.currently.temperature} degrees and there is a ${res.body.currently.precipProbability}% chance of preciptation.`);
  }
})

//Geocoding
// request(options, (err, res) => {
// console.log(res.body.features[0].center);
// })

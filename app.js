const geoCode = require('./modules/geocode');
const weather = require('./modules/weather');

// HTTP query strings for custom responses
const query = {
  lang: {
    en: '?lang=en',
    fr: '?lang=fr'
  },
}

//Geocoding
geoCode("Victoria British Columbia", (err, location) => {
  if (err) {
    return console.log(err);
  }
  weather(location.lat, location.long, (err, forecast) => {
    if (err) {
      return console.log(err);
    }

    console.log(location.location);
    console.log(forecast);
  });

});

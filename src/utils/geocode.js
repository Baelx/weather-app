const request = require('request');
const creds = require('./creds.js');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${creds.mapbox}`;

  request({url, json: true}, (err, {body}) => {
    if (err) {
      callback("Can't reach geocoding server!", undefined);
    } else if (!body.features[0]){
      callback("Invalid request parameters. Unable to find location.", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      }
    );
    }
  })
}

module.exports = geoCode;

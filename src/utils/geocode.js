const request = require('request');

const geocode = (address, callback) => {
    const geocodeAccessToken = 'pk.eyJ1IjoibG9yZC10YXJhcyIsImEiOiJjbWhjbjZjZW8wMjZzMmpvOHdsY2E5MXg3In0.VmrrON6XrAdGUXnc7KNyPQ';
    const qPram = encodeURIComponent(address);
    const geocodeUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${qPram}&access_token=${geocodeAccessToken}&limit=1`;
    // console.log('geocodeUrl = ', geocodeUrl);
    request({url: geocodeUrl, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to Location service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location! Please try again with a different location name!', undefined);
        } else {
            const coordinates = body.features[0].geometry.coordinates;
            callback(undefined, {
                latitude: coordinates[1],
                longitude: coordinates[0],
                location: body.features[0].properties.full_address,
            });
        }
    });
}

module.exports = geocode;
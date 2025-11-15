const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const queryParam = latitude + ',' + longitude;
    // const queryParam = latitude + ',' + longitude;
    const url = `https://api.weatherstack.com/current?access_key=532ee671c60cc779abcdc366389316af&query=${queryParam}&units=m`;
    console.log(url);
    request({url, json: true}, (err, { body }) => {
    // request({url, json: true}, (err, response) => {
        if (err) {
            callback('Unnable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const weather = body.current;
            const weatherDescription = `${weather.weather_descriptions[0]}.
            It is currently ${weather.temperature} degrees out. It feels like ${weather.feelslike} degrees out.
            There is ${weather.precip}% chance of rain.`;
            callback(undefined, weatherDescription);
        }
    });
}

module.exports = forecast;
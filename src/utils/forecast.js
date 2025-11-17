const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const queryParam = latitude + ',' + longitude;

    // there is only 100 request fora month => I use 2 accounts
    // const access_key = '532ee671c60cc779abcdc366389316af';  //dm.a account
    const access_key = '324a7b7871c2f97db829d86e1eea4628';  //lord account

    const url = `https://api.weatherstack.com/current?access_key=${access_key}&query=${queryParam}&units=m`;
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
            The humidity is ${weather.humidity}%. There is ${weather.precip}% chance of rain.`;
            callback(undefined, weatherDescription);
        }
    });
}

module.exports = forecast;
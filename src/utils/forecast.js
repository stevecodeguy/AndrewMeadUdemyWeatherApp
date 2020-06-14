const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=638886fc12b3bfed7e897f2d7a77a9b4&query=${latitude},${longitude}&units=f`;


  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error){
      callback('Unable to find location.', undefined);
    } else {
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;
      const description = body.current.weather_descriptions[0];
      const precip = body.current.precip * 100;
      const uvIndex = body.current.uv_index;

      callback(undefined, `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees. The chance of precipitation is ${precip}%. The UV index rating is ${uvIndex}`);
    }
  });
}

module.exports = forecast;
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=81dd22a0-53f1-11ec-b3f4-df72f73572be`);
}

const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).latitude
  const long = JSON.parse(body).longitude
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds.`)
  }
}


module.exports = { nextISSTimesForMyLocation, printPassTimes, }

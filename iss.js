const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, function(error, response, body) {
    // check for server error (only 200 response is acceptable)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // check to ensure no other errors
    if (!error) {
      // parse the body
      body = JSON.parse(body);
      // if there's nothing, return an error message and null body
      if (!body) {
        callback(`No Data Found!`, null);
        return;
      }
      // otherwise return null error and body's ip value
      callback(null, body.ip);
    } else {
      // and if all else fails, error.
      callback(error, null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=81dd22a0-53f1-11ec-b3f4-df72f73572be`, function(error, response, body) {
    // const { longitude, latitude } = JSON.parse(body);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!error) {
      body = JSON.parse(body);
      
      if (!body) {
        callback(`Found No Coordinates!`, null);
        return;
      }
      callback(null, `${body.latitude}, ${body.longitude}`);
    } else {
      callback(error, null);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, body) => {
    if (response.statusCode !== 200) {

      const msg = `Status Code ${response.statusCode} when fetching Flyover Time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!error) {
      const flyOver = JSON.parse(body)["response"];
      if (!flyOver) {
        callback(`Found No Info!`, null);
        return;
      }
      callback(null, flyOver);
    } else {
      callback(error, null);
    }
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
};


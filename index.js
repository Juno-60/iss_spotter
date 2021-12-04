const { nextISSTimesForMyLocation } = require('./iss');


const coords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("IP finding didn't work!", error);
//     return;
//   }
//   console.log(`It worked! Returned IP: ${ip}`);
// });

// fetchCoordsByIP(`107.190.104.41`, (error, location) => {
//   if (error) {
//     console.log("GeoLocator didn't work!", error);
//     return;
//   }
//   console.log(`It worked! Returned GeoLocation: ${location}`);
// });

// fetchISSFlyOverTimes(coords, (error, flyOver) => {
//   if (error) {
//     console.log("Didn't find flyover times.", error);
//     return;
//   }
//   console.log(`It worked! Flyover times are:`, flyOver);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds.`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
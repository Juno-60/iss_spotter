const { nextISSTimesForMyLocation, printPassTimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Something broke: ", error.message);
  });
  
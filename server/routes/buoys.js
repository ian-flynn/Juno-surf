const router = require('express').Router();

const apiURL = 'https://www.ndbc.noaa.gov/data/realtime2/41114.txt';
const pierURL = 'https://www.ndbc.noaa.gov/data/realtime2/LKWF1.txt';

const getBuoyData = async (req, res, next) => {
  try {
    let buoyStuff = await fetch(apiURL);
    let buoyJson = await (await buoyStuff.text()).split('\n');
    res.locals.ocean = buoyJson;
    return next();
  } catch (err) {
    console.log(err);
  }
};
const getPierData = async (req, res, next) => {
  try {
    let pierStuff = await fetch(pierURL);
    let pierJson = await (await pierStuff.text()).split('\n');
    res.locals.pier = pierJson;
    return next();
  } catch (err) {
    console.log(err);
  }
};
// app.get('/api/buoy', getBuoyData, getPierData, (req, res) => {
//   // console.log('LOCALS: ', res.locals)
//   return res
//     .status(200)
//     .json({ ocean: res.locals.ocean, pier: res.locals.pier });
// });

module.exports = router;

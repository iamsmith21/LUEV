const express = require('express');
const router = express.Router();
const {getCarByName, compareEVs} = require('../controller/LexController');

router.post('/lex-webhook', async (req, res) => {
    console.log('Request body:', req.body);
    const {intent, slots} = req.body;

   if (intent === 'SearchCarByName') {
    const carName = slots?.carName;
    const msg = await getCarByName(carName);
    return res.json({ message: msg });
  }

  if (intent === 'CompareEVs') {
    const carOne = slots?.car_one;
    const carTwo = slots?.car_two;
    const msg = await compareEVs(carOne, carTwo);
    return res.json({ message: msg });
  }

//   if (intent === 'SearchCarByFeature') {
//     const msg = await searchByFeature(req.body.feature_type);
//     return res.json({ message: msg });
//   }

  return res.json({ message: "Invalid intent." });

});

module.exports = router;
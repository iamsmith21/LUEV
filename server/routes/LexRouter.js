const express = require('express');
const router = express.Router();
const {getCarByName, compareEVs} = require('../controller/LexController');

router.post('/lex-webhook', async (req, res) => {
    console.log('Request body:', req.body);
    const {intent} = req.body;

    if (intent === 'SearchCarByName') {
    const msg = await getCarByName(req.body.model_name);
    return res.json({ message: msg });
  }

  if (intent === 'CompareEVs') {
    const msg = await compareEVs(req.body.car_one, req.body.car_two);
    return res.json({ message: msg });
  }

//   if (intent === 'SearchCarByFeature') {
//     const msg = await searchByFeature(req.body.feature_type);
//     return res.json({ message: msg });
//   }

  return res.json({ message: "Invalid intent." });

});

module.exports = router;
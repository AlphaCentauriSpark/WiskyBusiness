const axios = require('axios');
const data = require('./seed.js');

module.exports.getPets = async (req, res) => {
  try {
    // let location = req.query.location;
    // console.log('req.query: ', req.query)
    // console.log('req.query.location: ', req.query.location)
    // const response = await axios.get(`https://api.petfinder.com/v2/animals`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.API_KEY_HEADER}`
    //   },
    //   params: {
    //     // ...req.query,
    //     // gender: 'male',
    //     sort: 'distance',
    //     limit: 20
    //   }
    // });
    res.status(200).send(data);
  } catch (error) {
    console.log(error.message || error)
    res.status(400).send(error);
  }
}

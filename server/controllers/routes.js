const axios = require('axios');
const path = require('node:path');
const dotenv = require('dotenv').config({ path: '../.env' });
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
    console.log(error.message || error);
    res.status(400).send(error);
  }
};

module.exports.getAnimals = (req, res) => {
  //console.log(req.query.zip);
  axios.defaults.baseURL = 'https://api.petfinder.com/v2/';
  axios({
    method: 'post',
    url: 'oauth2/token',
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.API_Key,
      client_secret: process.env.Secret,
    },
  })
    .then((tokenObj) => {
      console.log(tokenObj);
      let token = tokenObj.data.token_type + ' ' + tokenObj.data.access_token;
      let category = `animals/?location=${req.query.zip}&limit=50`;
      axios({
        method: 'get',
        url: category,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          res.send(response.data.animals);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getTypes = (req, res) => {
  axios.defaults.baseURL = 'https://api.petfinder.com/v2/';
  axios({
    method: 'post',
    url: 'oauth2/token',
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.API_Key,
      client_secret: process.env.Secret,
    },
  })
    .then((tokenObj) => {
      let token = tokenObj.data.token_type + ' ' + tokenObj.data.access_token;
      let category = 'types';
      axios({
        method: 'get',
        url: category,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          console.log(response.data.types.length);
          res.send(response.data.types);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getOrganizations = (req, res) => {
  axios.defaults.baseURL = 'https://api.petfinder.com/v2/';
  axios({
    method: 'post',
    url: 'oauth2/token',
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.API_Key,
      client_secret: process.env.Secret,
    },
  })
    .then((tokenObj) => {
      let token = tokenObj.data.token_type + ' ' + tokenObj.data.access_token;
      let category = 'organizations/?limit=100';
      axios({
        method: 'get',
        url: category,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          res.send(response.data.organizations);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

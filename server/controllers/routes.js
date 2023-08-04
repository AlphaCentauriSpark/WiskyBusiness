const axios = require('axios');
const path = require('node:path');
const dotenv = require('dotenv').config({ path: '../.env' });

module.exports.getAnimals = (req, res) => {
  console.log('REQ QUERY', req.query);
  console.log('ZIP CODE', req.query.zip);
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
      let zipcode = req.query.zip || 77096;
      console.log('zip code', zipcode);
      let category = `animals/?location=${zipcode}&limit=75`;
      axios({
        method: 'get',
        url: category,
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          console.log('SECOND THEN Token WORKS', token);
          res.send(response.data.animals);
        })
        .catch((err) => {
          console.log('FIRST ERROR Token broken', token);
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.log('SECOND ERROR ENV broken', token);
      res.status(400).send(err);
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
          res.send(response.data.types);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
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
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

let animalsLoader = (cb) => {
  axios({
    method: 'get',
    url: '/animals'
  })
  .then((res) => {
    cb(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
}

// const animalsLoader = () => {
//   console.log('I AM BEING CALLED');
//   axios
//     .get('http://localhost:3000/')
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log('ERROR I HATE YOU', error);
//     });
// };

export default animalsLoader;

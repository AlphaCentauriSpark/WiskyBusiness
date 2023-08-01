import axios from 'axios';

const petsLoader = () => {
  return axios
    .get('http://localhost:3000/')
    .then((response) => {
      console.log('axios call from loader: ', response.data)
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default petsLoader;

import axios from 'axios';

const petsLoader = () => {
  return axios
    .get('http://localhost:3000/')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default petsLoader;

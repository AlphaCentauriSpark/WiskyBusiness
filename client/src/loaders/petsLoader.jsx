import axios from 'axios';

const petsLoader = () => {
  return axios
    .get('http://54.176.189.181:3000/')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default petsLoader;

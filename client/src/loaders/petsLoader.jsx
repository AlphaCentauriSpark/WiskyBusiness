import axios from 'axios';

const petsLoader = () => {
  return axios
    .get('http://54.176.189.181:3000/animals')
    .then((response) => {
      console.log(response);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default petsLoader;

import axios from 'axios';

const petsLoader = () => {
  return axios
    .get('ip-172-31-30-86.us-west-1.compute.internal:3000')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default petsLoader;

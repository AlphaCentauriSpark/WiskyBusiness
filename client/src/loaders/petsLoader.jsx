import axios from 'axios';

const petsLoader = () => {
  return axios
    .get(
      'https://wiskey-business-server-kvj6f98ia-alphacentaurispark.vercel.app/'
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default petsLoader;

import axios from 'axios';

const animalsLoader = () => {
  console.log('I AM BEING CALLED');
  axios
    .get('http://localhost:3000/')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('ERROR I HATE YOU', error);
    });
};

export default animalsLoader;

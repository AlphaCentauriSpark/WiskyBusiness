import axios from 'axios';

const petsLoader = async () => {
  try {
    const response = await axios.get('http://localhost:3000/')
    return response.data;
  } catch (error) {
    console.log(error)
    return error
  }
}


export default petsLoader;

import { useState, useEffect, createContext } from 'react';
// import '../index.css';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
// import animalsLoader from './loaders/animalsLoader.jsx';
import Stack from '@mui/material/Stack';

export const AnimalContext = createContext();
export const PetContext = createContext();

const App = () => {
  const [count, setCount] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [longitude, setlongitude] = useState(null);
  const [latitude, setlatitude] = useState(null);
  const [currentPet, setCurrentPet] = useState({});

  const fetch = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=dfb6f1c5097f40d883ef5fee3c7e97a3`
        )
        .then((results) => {
          const postcode = results.data.results[0].components.postcode;
          return axios.get('http://localhost:3000/animals', {
            params: {
              zip: postcode,
            },
          });
        })
        .then((response) => {
          console.log('AXIOS RESPONSE IN APP', response.data);
          setAnimals(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    fetch();
  }, []);


  if (animals !== undefined) {
    return (
      <AnimalContext.Provider value={animals}>
        <PetContext.Provider value={[currentPet, setCurrentPet]}>
          <Stack m={2}>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <Link to="/home">HomePage</Link>
            <Link to="/catalog">Catalog</Link>
            <Outlet />
          </Stack>
        </PetContext.Provider>
      </AnimalContext.Provider>
    );
  }
};

export default App;

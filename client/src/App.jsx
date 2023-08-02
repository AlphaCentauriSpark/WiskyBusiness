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
    navigator.geolocation.getCurrentPosition(
      (location) => {
        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=dfb6f1c5097f40d883ef5fee3c7e97a3`
          )
          .then((results) => {
            let postcode = results.data.results[0].components.postcode;
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
      },
      (error) => {
        if (error.code == error.PERMISSION_DENIED) {
          let postcode = 10005;
          return axios
            .get('http://localhost:3000/animals', {
              params: {
                zip: postcode,
              },
            })
            .then((response) => {
              console.log('AXIOS RESPONSE IN APP', response.data);
              setAnimals(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  if (animals !== undefined) {
    return (
      <AnimalContext.Provider value={animals}>
        <PetContext.Provider value={[currentPet, setCurrentPet]}>
          <div className="flex flex-row gap-10 bg-gradient-to-r from-pink-500 via-pink-400/60 to-pink-500 items-center justify-evenly py-5 text-white font-comico-regular">
            <div>
              <Link className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150" to="/home">Play The Game!</Link>
            </div>
            <p className="text-5xl font-bold font-comico-regular text-shadow-lg">Whisky Business</p>
            <div>
              <Link className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150" to="/catalog">Catalog</Link>
            </div>
          </div>
          <Outlet />
        </PetContext.Provider>
      </AnimalContext.Provider>
    );
  }
};

export default App;

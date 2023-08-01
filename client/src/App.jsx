import { useState, useEffect, createContext } from 'react';
import './index.css';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import animalsLoader from './loaders/animalsLoader.jsx';
import Stack from '@mui/material/Stack';


export const AnimalsContext = createContext();

const App = () => {

  const [count, setCount] = useState(0);
  const [animals, setAnimals] = useState([]);


  // axios.defaults.baseURL = 'http://localhost:3000'

  // const fetch = () => {
  //   axios.get('http://localhost:3000/').then((response) => {
  //     console.log('AXIOS RESPONSE IN APP', response.data);
  //     setAnimals(response.data.animals);
  //   });
  // };

  // let allAnimals = useLoaderData();

  useEffect(() => {
    animalsLoader(setAnimals);
  }, []);

  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    // <div className="m-5">
    <AnimalsContext.Provider value={animals}>
      <Stack m={2}>
        <Link to="/home">Home Button</Link>
        <Outlet />
        <Link to="/catalog">Catalog Button</Link>
        <Outlet />
      </Stack>
    </AnimalsContext.Provider>
    // </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
// import '../index.css';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
// import animalsLoader from './loaders/animalsLoader.jsx';
import Stack from '@mui/material/Stack';

const App = () => {
  const [count, setCount] = useState(0);
  const [animals, setAnimals] = useState([]);

  const fetch = () => {
    axios.get('http://localhost:3000/').then((response) => {
      console.log('AXIOS RESPONSE IN APP', response.data);
      setAnimals(response.data.animals);
    });
  };

  // let allAnimals = useLoaderData();

  // useEffect(() => {
  //   console.log(animalsLoader());
  // }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    // <div className="m-5">
    <Stack m={2}>

      <Link to="/home">HomePage</Link>
      <Outlet />
    </Stack>
    // </div>
  );
};

export default App;

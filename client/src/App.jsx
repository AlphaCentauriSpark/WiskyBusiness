import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import animalsLoader from './loaders/animalsLoader.jsx';

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
    <div>
      <Link to="/home">Home Button</Link>
      <Outlet />
    </div>
  );
};

export default App;

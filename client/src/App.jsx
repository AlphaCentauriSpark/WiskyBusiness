import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom'
const App = () => {
  const [count, setCount] = useState(0);
  const [animals, setAnimals] = useState([]);

  return (
    <div>
      <Link to="/home">Home Button</Link>
      <Outlet />
    </div>
  );
};

export default App;

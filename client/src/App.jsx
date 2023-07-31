import { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const App = () => {
  const [count, setCount] = useState(0);
  const [animals, setAnimals] = useState([]);

  return (
    // <div className="m-5">
    <Stack m={2}>
      <Link to="/home">Home Button</Link>
      <Outlet />
    </Stack>
    // </div>
  );
};

export default App;

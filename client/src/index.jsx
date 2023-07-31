import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Game from './components/Game';
import Card from './components/Card';
import petsLoader from './loaders/petsLoader'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={petsLoader} id="root" element={<App />}>
      <Route index path="home" element={<Game />}></Route>
      <Route path="catalog" element={<Card />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css';
import 'tailwindcss/tailwind.css';
import petsLoader from './loaders/petsLoader'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Game from './components/MemoryGame/Game';
import Card from './components/Card';
import Catalog from './components/Catalog';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={petsLoader} id="root" element={<App />}>
      <Route index path="home" element={<Game />}></Route>
      <Route path="catalog" element={<Catalog />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

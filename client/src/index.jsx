import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css';
import 'tailwindcss/tailwind.css';
import petsLoader from './loaders/petsLoader';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Game from './components/MemoryGame/Game';
import Catalog from './components/Catalog';
import Profile from './components/Profile';
import Welcome from './components/Welcome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={petsLoader} id="root" element={<App />}>

      <Route index path="/" element={<Welcome />}></Route>
      <Route path="home" element={<Game />}></Route>
      <Route path="catalog" element={<Catalog />}></Route>
      <Route path="profile/:id" element={<Profile />}></Route>
    </Route>
  )

);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

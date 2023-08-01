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
import Catalog from './components/Catalog';
import Profile from './components/Profile';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="home" element={<Game />}></Route>
      <Route path="card" element={<Card />}></Route>
      <Route path="catalog" element={<Catalog />}></Route>
      <Route path="fullProfile" element={<Profile />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import { AnimalsContext } from '../App.jsx';

export default function Catalog () {

  const animals = useContext(AnimalsContext);

  return(
    <div>
      {animals.map((animal, index) => {
        if (animal.primary_photo_cropped) {
          return (
            <React.Fragment>
                <Card animal = {animal} key = {index} />
            </React.Fragment>
          )
        }
      })
      }
    </div>
  )
}




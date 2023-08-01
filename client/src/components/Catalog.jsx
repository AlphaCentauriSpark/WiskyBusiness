import axios from 'axios';
import Stack from '@mui/material/Stack';
import Card from './Card.jsx';
import { AnimalContext } from '../App';
import { useContext } from 'react';

const Catalog = () => {
  const animals = useContext(AnimalContext);

  // console.log(animals);
  return (
    <Stack direction="row" spacing={2}>
      {animals.map((animal) => {
        if (animal.primary_photo_cropped) {
          return (
            <Card
              photo={animal.primary_photo_cropped.small}
              name={animal.name}
              species={animal.species}
              gender={animal.gender}
              animal={animal}
            />
          );
        }
      })}
    </Stack>
  );
};

export default Catalog;

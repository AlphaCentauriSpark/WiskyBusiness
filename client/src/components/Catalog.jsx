import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from './Card.jsx';
import { AnimalContext } from '../App';
import { useContext, useState } from 'react';

const Catalog = () => {
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const animals = useContext(AnimalContext);

  // console.log(animals);
  return (
    <>
      <Box>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="Species Filter">Species</InputLabel>
          <Select
            labelId="Species Filter"
            id="Species Filter"
            value={speciesFilter}
            onChange={(event) => setSpeciesFilter(event.target.value)}
            label="Species"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="Gender Filter">Gender</InputLabel>
          <Select
            labelId="Gender Filter"
            id="Gender Filter"
            value={genderFilter}
            onChange={(event) => setGenderFilter(event.target.value)}
            label="Gender"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="Species Filter">Size</InputLabel>
          <Select
            labelId="Size Filter"
            id="Size Filter"
            value={sizeFilter}
            onChange={(event) => setSizeFilter(event.target.value)}
            label="Size"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Large">Large</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {animals
          .filter(
            (animal) =>
              (genderFilter === 'all' || animal.gender === genderFilter) &&
              (speciesFilter === 'all' || animal.species === speciesFilter) &&
              (sizeFilter === 'all' || animal.size === sizeFilter)
          )
          .map((animal) => {
            if (animal.primary_photo_cropped) {
              return (
                <Grid item xs={6} sm={3} md={2} lg={1.5}>
                  <Card
                    photo={animal.primary_photo_cropped.small}
                    name={animal.name}
                    species={animal.species}
                    gender={animal.gender}
                    animal={animal}
                  />
                </Grid>
              );
            }
          })}
      </Grid>
    </>
  );
};

export default Catalog;

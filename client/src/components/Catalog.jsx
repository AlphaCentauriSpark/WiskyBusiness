import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AnimalContext } from '../App';
import { HomeContext } from '../App.jsx';
import { useCookies } from 'react-cookie';
import {
  Grid,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Card from './Card.jsx';

const Catalog = () => {
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [cookies, setCookie, removeCookie] = useCookies();
  const animals = useContext(AnimalContext);
  const setHomeStatus = useContext(HomeContext);

  useEffect(() => {
    setHomeStatus(false);
  }, []);

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        gap: 5,
      }}
    >
      <Box sx={{ paddingBottom: '20px' }}>
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
          .map((animal, index) => {
            if (animal.primary_photo_cropped) {
              return (
                <Grid key={Math.random()} item xs={6} sm={3} md={2} lg={1.5}>
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
    </Stack>
  );
};

export default Catalog;

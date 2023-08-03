import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { useContext } from 'react';
// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../App';
import { useCookies } from 'react-cookie';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

const Pet = ({ photo, name, species, gender, animal }) => {
  const setCurrentPet = useContext(PetContext)[1];
  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();

  const handleCardClick = (evt) => {
    setCurrentPet(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
    if (localStorage.getItem('viewedPets') === null) {
      let arr = [];
      arr.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')).id);
      localStorage.setItem('viewedPets', JSON.stringify(arr));
    } else {
      let lsNew = JSON.parse(localStorage.getItem('viewedPets'));
      lsNew.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')).id);
      localStorage.setItem('viewedPets', JSON.stringify(lsNew));
    }
    localStorage.setItem('currentPet', JSON.stringify(animal));
    navigate('/profile/' + JSON.parse(evt.currentTarget.getAttribute('data-animal')).id);
  };

  const handleFavorite = (evt) => {
    const isFavorite = cookies[animal.id.toString()];
    if (isFavorite) {
      removeCookie(animal.id.toString());

      // setting for removing a favorite
      let localStore = JSON.parse(localStorage.getItem('savedPets'));
      let id = JSON.parse(evt.currentTarget.getAttribute('data-id'));
      let location = null;
      if (localStore.length !== 0) {
        localStore.map((element, index) => {
          if (element.id.toString() === id) {
            location = index;
          }
        })
      localStore.splice(location, 1);
      localStorage.setItem('savedPets', JSON.stringify(localStore));
      console.log('removed from favorites')
    }

    } else {
      setCookie(animal.id.toString(), true);

      // setting for making a favorite
      if (localStorage.getItem('savedPets') === null) {
        let arr = [];
        arr.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
        localStorage.setItem('savedPets', JSON.stringify(arr));
      } else {
        let alreadySaved = false;
        let location = null;
        let localStore = JSON.parse(localStorage.getItem('savedPets'));
        let id = JSON.parse(evt.currentTarget.getAttribute('data-id'));
        localStore.map((element, index) => {
          if (element.id.toString() === id) {
            alreadySaved = true;
            location = index;
          }
        })
        if (alreadySaved === false) {
          localStore.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
          localStorage.setItem('savedPets', JSON.stringify(localStore));
        }
        console.log('saved to favorites');
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 200,
        borderRadius: '15px',
        backgroundColor: '#fae8ff',
        transition: 'box-shadow 0.1s ease',
        '&:hover': {
          boxShadow: '0 10px 26px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardMedia
        sx={{ height: 150 }}
        image={photo}
        title="lil cat"
        data-animal={JSON.stringify(animal)}
        style={{ cursor: 'pointer' }}
      onClick={(evt) => {
        handleCardClick(evt);
        }}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" id="cardText">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {gender} {species}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Tooltip title="Favorite">
          {cookies[animal.id.toString()] ? (
            <Button onClick={handleFavorite} data-animal={JSON.stringify(animal)} data-id={animal.id.toString()}>
              <FavoriteOutlinedIcon />
            </Button>
          ) : (
            <Button onClick={handleFavorite} data-animal={JSON.stringify(animal)} data-id={animal.id.toString()}>
              <FavoriteBorderOutlinedIcon />
            </Button>
          )}
        </Tooltip>
        <Tooltip title="More info">
          <Button>
            <InfoOutlinedIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Share">
          <Button>
            <IosShareOutlinedIcon />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Pet;

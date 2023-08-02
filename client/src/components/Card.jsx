import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../App';

const Pet = ({ photo, name, species, gender, animal }) => {
  const setCurrentPet = useContext(PetContext)[1];

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
    navigate('/profile');
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
      <CardMedia sx={{ height: 150 }} image={photo} title="lil cat" data-animal={JSON.stringify(animal)} style={{cursor: "pointer"}}
      onClick={(evt) => {
        handleCardClick(evt);
      }}/>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {gender} {species}
        </Typography>
      </CardContent>
      <CardActions>
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

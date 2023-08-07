import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../App';
import { useCookies } from 'react-cookie';
import {
  Card,
  CardActions,
  CardContent,
  Tooltip,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import {
  InfoOutlined,
  IosShareOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';

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
    navigate(
      '/profile/' + JSON.parse(evt.currentTarget.getAttribute('data-animal')).id
    );
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
        });
        localStore.splice(location, 1);
        localStorage.setItem('savedPets', JSON.stringify(localStore));
        console.log('removed from favorites');
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
        });
        if (alreadySaved === false) {
          localStore.push(
            JSON.parse(evt.currentTarget.getAttribute('data-animal'))
          );
          localStorage.setItem('savedPets', JSON.stringify(localStore));
        }
        console.log('saved to favorites');
      }
    }
  };

  const handleShareClick = () => {
    const link = `https://www.facebook.com/sharer/sharer.php?u=https://127.0.0.1:5173/profile/${animal.id}&quote=Available%20%20for%20adoption!`;

    window.open(link, '_blank');
  };

  return (
    <Card
      sx={{
        width: '90%',
        height: 300,
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
        <Typography gutterBottom variant="h6" component="div" id="cardText">
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
            <Button
              onClick={handleFavorite}
              data-animal={JSON.stringify(animal)}
              data-id={animal.id.toString()}
            >
              <FavoriteOutlined />
            </Button>
          ) : (
            <Button
              onClick={handleFavorite}
              data-animal={JSON.stringify(animal)}
              data-id={animal.id.toString()}
            >
              <FavoriteBorderOutlined />
            </Button>
          )}
        </Tooltip>
        <Tooltip title="Share">
          <Button onClick={handleShareClick}>
            <IosShareOutlined />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Pet;

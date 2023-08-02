import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShareIcon from '@mui/icons-material/Share';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../App';


const Pet = ({ photo, name, species, gender, animal }) => {

  const setCurrentPet = useContext(PetContext)[1];

  const navigate = useNavigate();

  const handleCardClick = (evt) => {
    setCurrentPet(JSON.parse(evt.currentTarget.getAttribute("data-animal")))
    navigate("/profile")
  }

  return (
    <Card
      sx={{
        maxWidth: 200,
        borderRadius: '15px',
        transition: 'box-shadow 0.1s ease',
        '&:hover': {
          boxShadow: '0 10px 26px rgba(0, 0, 0, 0.1)',
        },
      }}
      data-animal={JSON.stringify(animal)}
      onClick={(evt) => {
        handleCardClick(evt);
      }}
    >
      <CardMedia sx={{ height: 150 }} image={photo} title="lil cat" />

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
            <LocalLibraryIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Share">
          <Button>
            <ShareIcon />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Pet;

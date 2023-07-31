import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ShareIcon from '@mui/icons-material/Share';

const Pet = () => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        borderRadius: '15px',
        transition: 'box-shadow 0.1s ease',
        '&:hover': {
          boxShadow: '0 10px 26px rgba(0, 0, 0, 0.1)', // Change the shadow on hover
        },
      }}
      onClick={() => {
        const audio = new Audio('../../public/flipcard-91468.mp3');
        audio.play();
      }}
    >
      <CardMedia
        sx={{ height: 150 }}
        image="https://media.istockphoto.com/id/1143549147/photo/gray-short-hair-cat-grooming.jpg?s=1024x1024&w=is&k=20&c=siGTVwKGHLiSFmBjW8B6OhEvDJQhNCI05R6ZY4ZfrwE="
        title="lil cat"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Kit ten
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Purr
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

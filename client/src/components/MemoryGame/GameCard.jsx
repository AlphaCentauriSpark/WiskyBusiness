import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ShareIcon from "@mui/icons-material/Share";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const GameCard = ({ pet, setFlipped, waiting, }) => {

  const handleFlip = () => {
    if (!waiting) {
      setFlipped(pet.id, pet.index);
      const audio = new Audio("../../public/flipcard-91468.mp3");
      audio.play();
    } else {
      return;
    }
  };

  return (
    <div>
      {pet.isFlipped || pet.isMatched ? (
        <Card
          className="flipped-card"
          sx={{
            maxWidth: 200,
            borderRadius: "15px",
            transition: "box-shadow 0.1s ease",
            "&:hover": {
              boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CardMedia
            sx={{ height: 150 }}
            image="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"
            title="lil cat"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pet.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pet.id}
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
      ) : (
        <Card
          sx={{
            maxWidth: 200,
            borderRadius: "15px",
            transition: "box-shadow 0.1s ease",
            "&:hover": {
              boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={handleFlip}
        >
          <CardMedia sx={{ height: 150, background: "#CDB4DB" }} />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              !isFlipped
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip>
              <Button>
                <AutorenewIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Share">
              <Button>
                <AutorenewIcon />
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default GameCard;

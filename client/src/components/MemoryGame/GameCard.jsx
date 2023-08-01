import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const GameCard = ({
  pet,
  setFlipped,
  setTurn,
  turn,
  checkMatch,
  setFirstCard,
  setSecondCard,
  matches,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleFlip = () => {
    // console.log('pet',pet);
    setFlipped(pet.id, pet.index);
    // if(!waiting) {
    //   if (turn === 0) {
    //     setTurn(1);
    //     setIsFlipped(true);
    //     setFirstCard(pet.id)
    //   } else {
    //     setIsFlipped(true);
    //     setSecondCard(pet.id);
    //     wait();
    //   }
    // }
  };

  const wait = () => {
    setWaiting(true);
    setTimeout(() => {
      setTurn(0);
      setIsFlipped(false);
      setWaiting(true);
    }, 2500);
  };

  const isMatched = matches.includes(pet.id);

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
              boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)", // Change the shadow on hover
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
              boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)", // Change the shadow on hover
            },
          }}
          onClick={() => {
            handleFlip();
            const audio = new Audio("../../public/flipcard-91468.mp3");
            audio.play();
          }}
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

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

const GameCard = ({
  pet,
  setFlipped,
  waiting,
}) => {
  const handleFlip = () => {
    if (!waiting) {
      setFlipped(pet.id, pet.index);
      const audio = new Audio("../../public/flipcard-91468.mp3");
      audio.play();
    } else {
      return;
    }
  };

  console.log(pet)

  return (
    <div>
      {pet.isFlipped || pet.isMatched ? (
        <button className="flex flex-col h-64 w-48 rounded-3xl">
          <img className="pet-image h-full w-auto border rounded-t-3xl object-cover" src={pet.photo}></img>
          <div className="pet-info bg-white h-full w-full rounded-b-3xl">{pet.name}</div>
        </button>
        // <Card
        //   className="flipped-card"
        //   sx={{
        //     maxWidth: 200,
        //     borderRadius: "15px",
        //     transition: "box-shadow 0.1s ease",
        //     "&:hover": {
        //       boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
        //     },
        //   }}
        // >
        //   <CardMedia
        //     sx={{ height: 150 }}
        //     image="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg"
        //     title="lil cat"
        //   />

        //   <CardContent>
        //     <Typography gutterBottom variant="h5" component="div">
        //       {pet.name}
        //     </Typography>
        //     <Typography variant="body2" color="text.secondary">
        //       {pet.id}
        //     </Typography>
        //   </CardContent>
        //   <CardActions>
        //     <Tooltip title="More info">
        //       <Button>
        //         <LocalLibraryIcon />
        //       </Button>
        //     </Tooltip>
        //     <Tooltip title="Share">
        //       <Button>
        //         <ShareIcon />
        //       </Button>
        //     </Tooltip>
        //   </CardActions>
        // </Card>
      ) : (
        <button className="h-64 w-48 mr-16 min-w bg-gradient-to-r from-light-purple to-light-pink rounded-3xl shadow-lg flex items-center justify-center text-7xl" onClick={handleFlip}>
          <i className="fa-solid fa-paw text-medium-pink text-shadow-lg"></i>
        </button>
        // <Card
        //   sx={{
        //     maxWidth: 200,
        //     borderRadius: "15px",
        //     transition: "box-shadow 0.1s ease",
        //     "&:hover": {
        //       boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
        //     },
        //   }}
        //   onClick={handleFlip}
        // >
        //   <CardMedia sx={{ height: 150, background: "#CDB4DB" }} />

        //   <CardContent>
        //     <i className="fa-solid fa-paw"></i>
        //   </CardContent>
        // </Card>
      )}
    </div>
  );
};

export default GameCard;

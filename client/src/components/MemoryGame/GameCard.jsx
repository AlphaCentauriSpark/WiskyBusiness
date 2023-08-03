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
import { useState } from 'react'

const GameCard = ({ pet, setFlipped, waiting, }) => {

  const [effect, setEffect] = useState(false)

  const handleFlip = () => {
    if (!waiting) {
      setFlipped(pet.id, pet.index);
      const audio = new Audio("../../public/flipcard-91468.mp3");
      audio.play();
    } else {
      return;
    }
  };

  const handleClick = () => {
    setEffect(true);
  }

  console.log(pet)

  return (
    <div>
      {pet.isFlipped || pet.isMatched ? (
        <button onClick={handleClick} className={`${effect && "animate-wiggle"} flex flex-col h-64 w-48 rounded-3xl`} onAnimationEnd={() => setEffect(false)}>
          <div className="pet-container h-48 w-full">
            <img className="pet-image h-full w-full border rounded-t-3xl object-cover" src={pet.photo}></img>
          </div>
          <div className="pet-info bg-white h-24 w-full rounded-b-3xl font-comico-regular">{pet.name}</div>
        </button>
      ) : (
        <button className="h-64 w-48 mr-16 min-w bg-gradient-to-r from-light-purple to-light-pink rounded-3xl shadow-lg flex items-center justify-center text-7xl" onClick={handleFlip}>
          <i className="fa-solid fa-paw text-medium-pink text-shadow-lg"></i>
        </button>
      )}
    </div>
  );
};

export default GameCard;

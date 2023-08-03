import { useState } from 'react';

const GameCard = ({ pet, setFlipped, waiting }) => {
  const [effect, setEffect] = useState(false);

  const handleFlip = () => {
    if (!waiting) {
      setFlipped(pet.id, pet.index);
      const audio = new Audio('../../public/flipcard-91468.mp3');
      audio.play();
    } else {
      return;
    }
  };

  const handleClick = () => {
    setEffect(true);
  };

  return (
    <div>
      {pet.isFlipped || pet.isMatched ? (
        <button
          onClick={handleClick}
          className={`${
            effect && 'animate-wiggle'
          } flex flex-col h-72 w-48 rounded-3xl`}
          onAnimationEnd={() => setEffect(false)}
        >
          <div className="pet-container h-48 w-full">
            <img
              className="pet-image h-full w-full border rounded-t-3xl object-cover"
              src={pet.photo}
            ></img>
            <div className="pet-info h-24 w-full rounded-b-3xl text-dark-pink font-comico-regular flex flex-col items-center gap-1 pt-1 bg-gradient-to-t from-light-blue from-10% to-white to-90%">
              <button
                className="tooltip tooltip-right text-xl font-quicksand-bold text-shadow-md hover:text-sky-300 rounded-full w-auto px-3 text-center transition-colors duration-100 hover:underline"
                data-tip="View Pet Profile"
              >
                {pet.name.split(' ')[0]}
              </button>
              <div className="text-sm font-quicksand-medium">{pet.breed}</div>
              <div className="text-sm font-quicksand-medium">
                {pet.age} • {pet.gender}
              </div>
            </div>
          </div>
        </button>
      ) : (
        <button
          className="h-72 w-48 mr-16 min-w bg-gradient-to-r from-light-purple to-light-pink rounded-3xl shadow-lg flex items-center justify-center text-7xl"
          onClick={handleFlip}
        >
          <i className="fa-solid fa-paw text-medium-pink text-shadow-lg"></i>
        </button>
      )}
    </div>
  );
};

export default GameCard;

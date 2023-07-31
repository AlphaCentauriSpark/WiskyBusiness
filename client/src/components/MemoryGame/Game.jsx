import GameCard from './GameCard.jsx';

const Game = () => {
  return (
  <div>
  <h1 className="text-3xl font-bold underline" >Flip and match!</h1>
    <div className="bg-red-500">test</div>
    <div className="flex flex-row gap-10">
      <GameCard />
      <GameCard />
    </div>
  </div>
  )
};

export default Game;

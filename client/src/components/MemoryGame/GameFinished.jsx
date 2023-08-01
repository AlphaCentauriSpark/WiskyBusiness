import Confetti from 'react-confetti';


const GameFinished = () => {


  return (
    <div>
      <p>GAME FINISHED!</p>
      <Confetti
      width={600}
      height={600}
    />
    </div>
  )
}


export default GameFinished;
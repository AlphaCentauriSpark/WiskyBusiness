import Confetti from 'react-confetti';
import { useEffect, useRef } from 'react';


const GameFinished = () => {
  const audioRef = useRef();

useEffect(() => {
  audioRef.current.play()
  audioRef.current.volune = 0.2
}, [])

  return (
    <div>
      <p className="text text-5xl font-comico-regular mt-10 animate-wiggle text ">GAME FINISHED!</p>
      <Confetti
    />
    <div className="w-full">
         <img className="rounded-3xl w-96 mt-20 border border-6 border-medium-pink" alt="dog-gif" src="/fluff-win.gif"/>
         <audio ref={audioRef} src="/yay.mp3"/>
    </div>
    </div>
  )
}


export default GameFinished;
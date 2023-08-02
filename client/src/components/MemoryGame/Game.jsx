import GameCard from "./GameCard.jsx";
import { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";

import GameFinished from './GameFinished.jsx';

import io from 'socket.io-client';


const Game = () => {
  //TODO add styling:
  // when you try to click the back of a card, it shakes
  // when there's a match, ding sound & cards size increases temporarily
  // add padding to each card
  // flip animation if no match
  // ability to turn sound on/off
  // add cat img to front of card: https://media.istockphoto.com/id/1303646726/vector/doodle-cat-mustache-icon-isolated-on-white-outline-hand-drawing-art-line-sketch-logo-animal.jpg?s=612x612&w=0&k=20&c=41W_rC17pyfN_xNxxNIDL1BBTWXFLqtIYf9LL6z1qPk=


  const [firstCard, setFirstCard] = useState("");
  const [secondCard, setSecondCard] = useState("");
  const [matches, setMatches] = useState([]);
  const petsData = useRouteLoaderData("root");
  let petsArr = petsData.data.animals.sort(() => Math.random() - 0.5)
  let firstSelectedPets = petsArr.slice(0, 6);
  const [turn, setTurn] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [gameFinshed, setGameFinished] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  let firstPetCards = firstSelectedPets.map((petCard, index) => {
    const petDetails = {
      id: petCard.id,
      index: index,
      name: petCard.name,
      isMatched: false,
      isFlipped: false,
    };
    return petDetails;
  });

  let secondPetCards = firstSelectedPets.map((petCard, index) => {
    const petDetails = {
      id: petCard.id,
      index: index + 6,
      name: petCard.name,
      isMatched: false,
      isFlipped: false,
    };
    return petDetails;
  });

  const [petCards, setPetCards] = useState([
    ...firstPetCards,
    ...secondPetCards,
  ]);

  useEffect(() => {
    setPetCards(unshuffledCards => {
      return unshuffledCards.sort(() => Math.random() - 0.5)
    })
    setLoading(false);
  }, [])


  const setFlipped = (petId, index) => {
    setPetCards((pets) => {
      return pets.map((pet) => {
        if (petId === pet.id && index === pet.index) {
          return { ...pet, isFlipped: !pet.isFlipped };
        }
        return pet;
      });
    });

    if (turn === 0) {
      setFirstCard(petId);
      setTurn(1);
    } else {
      setSecondCard(petId);
      setTurn(0);
    }
  };

  useEffect(() => {
    if (matchCount === petCards.length) {
      setGameFinished(true);
    }
  }, [matchCount]);

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard === secondCard) {
        setMatchCount((matchCount) => matchCount += 2)
        console.log('matchcount: ', matchCount)
        setPetCards((currPetCards) => {
          return currPetCards.map((currPetCard) => {
            if (currPetCard.id === firstCard) {
              currPetCard.isMatched = true;
            }
            return currPetCard;
          });
        });
        setFirstCard("");
        setSecondCard("");
      } else {
        setFirstCard("");
        setSecondCard("");
        wait();
      }
    }
  }, [secondCard]);

  const wait = () => {
    setWaiting(true);
    setTimeout(() => {
      setTurn(0);
      setPetCards((currPetCards) => {
        return currPetCards.map((currPetCard) => {
          if (currPetCard.id === firstCard || currPetCard.id === secondCard) {
            currPetCard.isFlipped = false;
          }
          return currPetCard;
        });
      });
      setWaiting(false);
    }, 2500);
  };


<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

  useEffect(() => {}, [firstCard, secondCard, turn]);
  useEffect(() => {
    // setPetCards([...petCards, petCardArray]);
    //setPetCards([...petCardArray, ...petCardArray])
  }, [])

  useEffect(() => {
    const socket = io.connect('http://localhost:3000', {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    });
    // const socket = io();

    console.log('connecting to server soon...');

    socket.emit("msg", 5, "4", { 7: Uint8Array.from([8]) });

    socket.on('hello', () => {
      console.log('Connected to the server');
      //socket.emit("msg", 5, "4", { 7: Uint8Array.from([8]) });

      // Emit a "ready" event to the server when the player is ready to start the game
      // socket.emit('ready');

      // // Handle the "player_ready" event received from the server
      // socket.on('player_ready', (data) => {
        //   console.log('Player', data.player, 'is ready');
        // });

        // // Example: Sending a "make_move" event to the server with move data
        // const moveData = {move:'move-data-here'};
        // socket.emit('make_move', moveData);

        // // Handle the "move_made" event received from the server
        // socket.on('move_made', (data) => {
          //   console.log('Player', data.player, 'made a move:', data.move);
          // });
        });

        // socket.on('disconnect', () => {
          //   console.log('Disconnected from the server');
          // });

          // Clean up the socket connection when the component is unmounted
          return () => {
            socket.disconnect();
          };
        }, []);

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>

      {!gameFinshed ?
      <div>
        <h1 className="text-3xl font-bold underline m-1/2">Flip and match!</h1>
        <div className="flex flex-row gap-15 flex-wrap">
          {petCards.map((petCard, i) => (
            <GameCard
            key={i}
            pet={petCard}
            setFlipped={setFlipped}
            setTurn={setTurn}
            turn={turn}
            waiting={waiting}
            setFirstCard={setFirstCard}
            setSecondCard={setSecondCard}
              matches={matches}
            />
          ))}
        </div>
      </div>
      : <GameFinished />}
    </div>
  );
};

export default Game;

import GameCard from "./GameCard.jsx";
import { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";
import io from 'socket.io-client';

const Game = () => {
  //4x3 grid

  //states to track: ID,  url,

  //user clicks card (ID #1a)
  //card flips (#1a changes to flipped, turn 0 -> 1)
  //when turn is 1, user cannot click back of a card
  //when you try to click the back, it shakes
  //user clicks another card (pet ID #5a) that isnt #1a
  //card flips (#5a changes to flipped, turn 1-- >2)
  //if turn === 2 && cards don't match
  //both cards return to the front state, turn is reset to 0
  //else if they match, setMatched(true)
  //ding sound! cards pop up! they stay in place. if you click on them they pop up.

  const [firstCard, setFirstCard] = useState("");
  const [secondCard, setSecondCard] = useState("");
  const [matches, setMatches] = useState([]);
  const petsData = useRouteLoaderData("root");
  let petsArr = petsData.data.animals;
  let firstSelectedPets = petsArr.slice(0, 6);

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

  const [petCards, setPetCards] = useState([...firstPetCards, ...secondPetCards]);
  const [turn, setTurn] = useState(0);

  console.log(petCards);

  const checkMatch = () => {
    if (firstCard === secondCard) {
      console.log("Match!");
      // setMatches((matches) => [...matches, firstCard]);
      setFirstCard("");
      setSecondCard("");
      return true;
    } else {
      setFirstCard("");
      setSecondCard("");
      console.log("No match!");
      return false;
    }
  };

  const setFlipped = (petId, index) => {
    console.log("pet id:", petId);
    setPetCards((pets) => {
      return pets.map((pet) => {
        if (petId === pet.id && index === pet.index) {
          return { ...pet, isFlipped: !pet.isFlipped };
        }
        return pet;
      });
    });

    // for (let i = 0; i < petCards.length; i++) {
    //   if (petCards[i].id === petId) {
    //     console.log('found card');
    //     setPetCards({...petCards, [petCards[i].isFlipped]:true})
    //   }
    // }

    console.log("petCard in flipped", petCards[0].isFlipped);
    if (turn === 0) {
      setFirstCard(petId);
      setTurn(1);
    } else {
      setSecondCard(petId);
      checkMatch();
      //wait();
      setTurn(0);
    }
  };

  // useEffect(() => {
  //   if (firstCard && secondCard) {
  //     checkMatch();
  //   }
  // }, [secondCard]);

  // const wait = () => {
  //   setTimeout(() => {
  //     setTurn(0);
  //     setIsFlipped(false);
  //     setWaiting(true);
  //   }, 2500);
  // };

  useEffect(() => {
    console.log("turn: ", turn);
    console.log("firstCard: ", firstCard);
    console.log("secondCard: ", secondCard);
  }, [firstCard, secondCard, turn]);

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

  return (
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
            checkMatch={checkMatch}
            setFirstCard={setFirstCard}
            setSecondCard={setSecondCard}
            matches={matches}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;

import GameCard from './GameCard.jsx';
import { useState, useEffect, useContext } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { HomeContext } from '../../App.jsx';
import { useCookies } from 'react-cookie';

import GameFinished from './GameFinished.jsx';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

const Game = () => {
  //TODO add styling:
  // when there's a match, ding sound & cards size increases temporarily
  // flip animation if no match
  // ability to turn sound on/off

  console.log('TESTTESTTESTTESTTESTTESTTEST');

  const [firstCard, setFirstCard] = useState('');
  const [secondCard, setSecondCard] = useState('');
  const [matches, setMatches] = useState([]);
  const petsData = useRouteLoaderData('root');
  const [turn, setTurn] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [waitingForOpp, setWaitingForOpp] = useState(true);
  const [playerId, setPlayerId] = useState('');
  const [oppId, setOppId] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  const setHomeStatus = useContext(HomeContext);

  let petsArr = petsData.data.animals.sort(() => Math.random() - 0.5);

  let allPets = petsArr
    .filter((pets) => {
      return pets['primary_photo_cropped'] !== null;
    })
    .slice(0, 6);

  let firstPetCards = allPets.map((petCard, index) => {
    const petDetails = {
      id: petCard.id,
      index: index,
      name: petCard.name.split(' ')[0],
      age: petCard.age,
      gender: petCard.gender,
      breed: petCard.breeds.primary,
      isMatched: false,
      isFlipped: false,
      photo: petCard['primary_photo_cropped'].small,
    };
    console.log('pet details inside: ', petDetails);
    return petDetails;
  });

  let secondPetCards = allPets.map((petCard, index) => {
    const petDetails = {
      id: petCard.id,
      index: index + 6,
      name: petCard.name,
      age: petCard.age,
      gender: petCard.gender,
      breed: petCard.breeds.primary,
      isMatched: false,
      isFlipped: false,
      photo: petCard['primary_photo_cropped'].small,
    };
    return petDetails;
  });

  const [petCards, setPetCards] = useState([
    ...firstPetCards,
    ...secondPetCards,
  ]);

  console.log('these are the final pet cards!!!: ', secondPetCards);

  useEffect(() => {
    setHomeStatus(true);
    setPetCards((unshuffledCards) => {
      return unshuffledCards.sort(() => Math.random() - 0.5);
    });
    setLoading(false);
  }, []);

  const setFlipped = (petId, index) => {
    const moveData = { cardFlipped: index };
    socket.emit('make_move', moveData);

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
        setMatchCount((matchCount) => (matchCount += 2));
        setPetCards((currPetCards) => {
          return currPetCards.map((currPetCard) => {
            if (currPetCard.id === firstCard) {
              currPetCard.isMatched = true;
            }
            return currPetCard;
          });
        });
        setFirstCard('');
        setSecondCard('');
      } else {
        setFirstCard('');
        setSecondCard('');
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
    }, 2000);
  };

  useEffect(() => {}, [firstCard, secondCard, turn]);

  useEffect(() => {
    console.log('name: ', cookies.user);
    socket.on('connect', () => {
      console.log('Connected to the server');

      // Emit a "ready" event to the server when the player is ready to start the game
      socket.emit('ready', (socketId) => {
        console.log('socketId: ', socketId);
      });

      socket.on('id', (id) => {
        console.log('your id is: ', id);
        setPlayerId(id);
      });

      // // // Handle the "player_ready" event received from the server
      // socket.on('player_ready', (data) => {
      //   console.log('Player', data.player, 'is ready');
      // });

      // // Handle the "player_ready" event received from the server
      socket.on('players_ready', (room) => {
        console.log('Room: ', room);
        let opp = '';
        if (room.players[0] == playerId) {
          opp = room.players[1];
        } else {
          opp = room.players[0];
        }
        setOppId(opp);
        setWaitingForOpp(false);
      });

      // // Example: Sending a "make_move" event to the server with move data
      // const moveData = {move: 'move-data-here'};
      // socket.emit('make_move', moveData);

      // // Handle the "move_made" event received from the server
      socket.on('move_made', (data) => {
        console.log('Player', data.player, 'made a move:', data.move);
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('test in main');

  return (
    <div className="flex items-center justify-center ">
      {!gameFinished && !waitingForOpp ? (
        <div className="flex items-center flex-col justify-center gap-5 mt-14">
          <h1 className="text-4xl font-bold font-comico-regular mb-10 ml-5 text-medium-pink text-shadow-xl">
            Flip and match! ({playerId} Versus {oppId})
          </h1>
          <p>Flip count: {matches.length}</p>c
          <div className="grid grid-cols-6 gap-6 w-4/5 justify-center">
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
      ) : gameFinished ? (
        <GameFinished />
      ) : (
        <div>
          Waiting for Opponent...
          <button onClick={() => setWaitingForOpp(false)}>Start</button>
        </div>
      )}
    </div>
  );
};

export default Game;

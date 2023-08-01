import GameCard from "./GameCard.jsx";
import { useState, useEffect } from "react";
import { useRouteLoaderData } from "react-router-dom";

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
  const [turn, setTurn] = useState(0);

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
      setTurn(0);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      console.log('this is the check match: ', firstCard, secondCard)
      if (firstCard === secondCard) {
        console.log("Match!");
        // setMatches((matches) => [...matches, firstCard]);
        setPetCards(currPetCards => {
          return currPetCards.map(currPetCard => {
            if (currPetCard.id === firstCard) {
              currPetCard.isMatched = true;
            }
            return currPetCard;
          })
        })
        setFirstCard("");
        setSecondCard("");
      } else {
        setFirstCard("");
        setSecondCard("");
        console.log("No match!");
        wait()
      }
    }
  }, [secondCard]);

  const wait = () => {
    setTimeout(() => {
      setTurn(0);
      console.log('no match')
      setPetCards(currPetCards => {
        return currPetCards.map(currPetCard => {
          if (currPetCard.id === firstCard || currPetCard.id === secondCard) {
            currPetCard.isFlipped = false;
          }
          return currPetCard;
        })
      })
      console.log('wait has been called')
      // setIsFlipped(false);
     // setWaiting(true);
    }, 2500);
  };

  useEffect(() => {
    console.log("turn: ", turn);
    console.log("firstCard: ", firstCard);
    console.log("secondCard: ", secondCard);
  }, [firstCard, secondCard, turn]);

  useEffect(() => {
    // setPetCards([...petCards, petCardArray]);
    //setPetCards([...petCardArray, ...petCardArray])
  }, [])

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
            // checkMatch={checkMatch}
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

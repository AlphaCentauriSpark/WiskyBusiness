// import { useContext } from 'react';
import { useState, useEffect } from 'react';
// import { PetContext } from '../App';
import { useParams } from 'react-router';



const Profile = () => {

  let { id } = useParams();

  const [currentPet, setCurrentPet] = useState(JSON.parse(localStorage.getItem('currentPet')))
  // const [alreadySaved, setAlreadySaved] = useState(false);

  // const currentPet = useContext(PetContext)[0];
  // const setCurrentPet = useContext(PetContext)[1];

  let alreadySaved = false;
  let localStore = JSON.parse(localStorage.getItem('savedPets'));
  if (localStore !== null) {
    localStore.map((element) => {
      if (element.id.toString() === id) {
        alreadySaved = true;
      }
    });
  }



  // if (JSON.stringify(currentPet) === JSON.stringify({})) {
  //   console.log('got here')
  //   setCurrentPet(JSON.parse(localStorage.getItem('currentPet')));
  // }

  const viewedPets = JSON.parse(localStorage.getItem('viewedPets'));
  const views = viewedPets.reduce((accum, element) => {
    if (currentPet.id === element) {
      accum++;
    }
    return accum
  }, 0)

  const handleClick = (evt) => {
    if (localStorage.getItem('savedPets') === null) {
      let arr = [];
      arr.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
      // saving first pet when no other favorites have been made
      localStorage.setItem('savedPets', JSON.stringify(arr));
      // document.getElementById("fav").innerHTML="Remove from Favorites"
    } else {
      let alreadySaved = false;
      let localStore = JSON.parse(localStorage.getItem('savedPets'));
      let location = null;
      localStore.map((element, index) => {
        if (element.id.toString() === id) {
          alreadySaved = true;
          location = index;
        }
      })
      if (alreadySaved === false) {
        //adding a favorite
        localStore.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
        localStorage.setItem('savedPets', JSON.stringify(localStore));
        // document.getElementById("fav").innerHTML="Add to Favorites"
      } else {
        //removing a favorite
        localStore.splice(location, 1);
        localStorage.setItem('savedPets', JSON.stringify(localStore));
        alreadySaved = false;
        // document.getElementById("fav").innerHTML="Remove from Favorites"
      }
    }
    // location.reload();
    // console.log('innerHTML: ', document.getElementById("favorite").innerHTML === "Add to Favorites");
    if (document.getElementById("favorite").innerHTML === "Add to Favorites") {
      document.getElementById("favorite").innerHTML = "Remove from Favorites"
    } else {
      document.getElementById("favorite").innerHTML = "Add to Favorites";
    }
 }

  // useEffect(() => {
  // }, [alreadySaved])

  return (
    <div>
      <h1 className="text-stone-950 font-comico-regular text-3xl m-8">{currentPet.description}</h1>
      <p></p>
      <div className="flex-auto m-8 flex flex-row">
        <img className="rounded-2xl m-8" src={currentPet.primary_photo_cropped.small}></img>
        <div className="flex flex-col m-8">
          {views === 1
          ? <h2 className="text-stone-950 font-comico-regular text-xl pb-2">This is your first click on me.</h2>
          : <h2 className="text-stone-950 font-comico-regular text-xl pb-2"> You have viewed me {views} times!! We need to get together!!!</h2>
          }

          <div className="text-stone-950 font-comico-regular text-xl pb-2">Name:  {currentPet.name}</div>
          <div className="text-stone-950 font-comico-regular text-xl pb-2">Primary Breed:  {currentPet.breeds.primary}</div>
          <div className="text-stone-950 font-comico-regular text-xl pb-2">Gender: {currentPet.gender}</div>
          <div className="text-stone-950 font-comico-regular text-xl pb-2">Size: {currentPet.size}</div>
          <h2 className="text-stone-950 font-comico-regular text-xl pb-2">Yes, I am {currentPet.status}!!!</h2>
          <h2 className="text-stone-950 font-comico-regular text-xl pb-2">Please email {currentPet.contact.email} or call {currentPet.contact.phone}</h2>
          <div className="flex flex-row">

            {alreadySaved === false
            ? <button id="favorite" className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 w-52 mr-40" onClick={handleClick} data-animal={JSON.stringify(currentPet)}>Add to Favorites</button>
            :<button id="favorite" className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 w-52 mr-40" onClick={handleClick} data-animal={JSON.stringify(currentPet)}>Remove from Favorites</button>
            }
            <button className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 w-52">See Your Favorite Pets</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
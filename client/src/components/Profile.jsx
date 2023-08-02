import { useContext } from 'react';
import { PetContext } from '../App';
import { useParams } from 'react-router';



const Profile = () => {

  let { id } = useParams();

  console.log(id)

  let alreadySaved = false;
  let localStore = JSON.parse(localStorage.getItem('savedPets'));
  localStore.map((element) => {
    if (element.id.toString() === id) {
      alreadySaved = true;
    }
  });

  const currentPet = useContext(PetContext)[0];
  const viewedPets = JSON.parse(localStorage.getItem('viewedPets'));
  const views = viewedPets.reduce((accum, element) => {
    if (currentPet.id === element) {
      accum++;
    }
    return accum
  }, 0)

  const handleSaveClick = (evt) => {
    if (localStorage.getItem('savedPets') === null) {
      let arr = [];
      arr.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
      localStorage.setItem('savedPets', JSON.stringify(arr));
    } else {
      let alreadySaved = false;
      let localStore = JSON.parse(localStorage.getItem('savedPets'));
      localStore.map((element) => {
        if (element.id.toString() === id) {
          alreadySaved = true;
        }
      })
      if (alreadySaved === false) {
        localStore.push(JSON.parse(evt.currentTarget.getAttribute('data-animal')));
        localStorage.setItem('savedPets', JSON.stringify(localStore));
      }
    }
    console.log(JSON.parse(localStorage.getItem('savedPets')));
  }

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
            ? <button className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 w-48 mr-40" onClick={handleSaveClick} data-animal={JSON.stringify(currentPet)}>Add to Favorites</button>
            :<button className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 w-48 mr-40" data-animal={JSON.stringify(currentPet)}>Remove from Favorites</button>
            }
            <button className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 w-52">See Your Favorite Pets</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
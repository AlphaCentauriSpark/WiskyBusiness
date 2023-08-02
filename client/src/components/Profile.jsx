import React from 'react';
import { useContext } from 'react';
import { PetContext } from '../App';



const Profile = () => {
  const currentPet = useContext(PetContext)[0];
  const viewedPets = JSON.parse(localStorage.getItem('viewedPets'));
  const views = viewedPets.reduce((accum, element) => {
    if (currentPet.id === element) {
      accum++;
    }
    return accum
  }, 0)
  console.log('clicked animal: ', currentPet)
  return (
    <div>
      <h1 className="text-stone-950 font-comico-regular text-3xl m-8">{currentPet.description}</h1>
      <p></p>
      <div className="flex-auto m-8 flex flex-row">
        <img className="rounded-2xl m-8" src={currentPet.primary_photo_cropped.small}></img>
        <div className="flex flex-col m-8">
          {views === 1
          ? <h2 className="text-stone-950 font-comico-regular text-xl pb-2">This is your first click on me.  We should meet some time.</h2>
          : <h2 className="text-stone-950 font-comico-regular text-xl pb-2"> You have viewed me {views} times!!! So...your place or mine?  Better make it mine....</h2>
          }

          <div className="text-stone-950 font-comico-regular text-xl pb-2">Name:  {currentPet.name}</div>
          <div className="text-stone-950 font-comico-regular text-xl pb-2">Primary Breed:  {currentPet.breeds.primary}</div>
          <div className="text-stone-950 font-comico-regular text-xl pb-2">Gender: {currentPet.gender}</div>
          <div className="text-stone-950 font-comico-regular text-xl pb-2">Size: {currentPet.size}</div>
          <h2 className="text-stone-950 font-comico-regular text-xl pb-2">Yes, I am {currentPet.status}!!!</h2>
          <h2 className="text-stone-950 font-comico-regular text-xl pb-2">Please email {currentPet.contact.email} or call {currentPet.contact.phone}</h2>
          <button className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150">Save Me</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;
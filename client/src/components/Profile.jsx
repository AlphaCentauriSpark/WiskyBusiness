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
      <h1 className="text-stone-950">{currentPet.description}</h1>
      <p></p>
      {views === 1
      ? <h2>This is your first click on me.  We should meet some time.</h2>
      : <h2> You have viewed me {views} times!!! So...your place or mine?  Better make it mine....</h2>
      }
      <div className='flex-auto m-8'>
        <img src={currentPet.primary_photo_cropped.small}></img>
        <div>Name:  {currentPet.name}</div>
        <div>Gender: {currentPet.gender}</div>
        <div>Size: {currentPet.size}</div>
      </div>

      <h2>Yes, I am {currentPet.status}!!!</h2>
      <h2>Please email {currentPet.contact.email} or call {currentPet.contact.phone}</h2>
    </div>
  )
}

export default Profile;
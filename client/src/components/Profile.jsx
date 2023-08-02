import React from 'react';
import { useContext } from 'react';
import { PetContext } from '../App';



const Profile = () => {
  const currentPet = useContext(PetContext)[0];
  return (
    <div>
      <h1 className="text-3xl font-bold underline">{currentPet.description}</h1>
      <img src={currentPet.primary_photo_cropped.small}></img>
      <h2>Yes, I am {currentPet.status}!!!</h2>
      <h2>Please email {currentPet.contact.email} or call {currentPet.contact.phone}</h2>
    </div>
  )
}

export default Profile;
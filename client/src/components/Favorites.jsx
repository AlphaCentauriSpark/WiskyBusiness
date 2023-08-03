

const Favorites = () => {

  let localStore = JSON.parse(localStorage.getItem('savedPets'))

  return (
    <div>
      {(localStore !== null && localStore.length > 0)
        ? localStore.map((currentPet, index) => {
            return (
              <div key={index}>
                <h1 className="text-stone-950 font-comico-regular text-3xl m-8">{currentPet.description}</h1>
                <p></p>
                <div className="flex-auto m-8 flex flex-row">
                  <img className="rounded-2xl m-8" src={currentPet.primary_photo_cropped.small}></img>
                  <div className="flex flex-col m-8">
                    <div className="text-stone-950 font-comico-regular text-xl pb-2">Name:  {currentPet.name}</div>
                    <div className="text-stone-950 font-comico-regular text-xl pb-2">Primary Breed:  {currentPet.breeds.primary}</div>
                    <div className="text-stone-950 font-comico-regular text-xl pb-2">Gender: {currentPet.gender}</div>
                    <div className="text-stone-950 font-comico-regular text-xl pb-2">Size: {currentPet.size}</div>
                    <h2 className="text-stone-950 font-comico-regular text-xl pb-2">Yes, I am {currentPet.status}!!!</h2>
                    <h2 className="text-stone-950 font-comico-regular text-xl pb-2">Please email {currentPet.contact.email} or call {currentPet.contact.phone}</h2>
                  </div>
                </div>
              </div>
            )
           })
        : <h1 className="flex flex-col gap-5 items-center justify-evenly py-5 text-pink-500 font-comico-regular text-xl">You do not have any saved pets.  You are missing out on some great new friends!!! </h1>
        }
    </div>
  )
}

export default Favorites;
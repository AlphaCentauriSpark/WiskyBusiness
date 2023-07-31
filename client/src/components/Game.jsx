import react from 'react';
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useRouteLoaderData } from "react-router-dom";

const Game = () => {

  const pets = useRouteLoaderData("root");

  console.log('this is the child: ', pets)

  return (
    <div>
      test pls
    </div>
  )
};

export default Game;

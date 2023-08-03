import { Link } from 'react-router-dom';

const Welcome = () => {


  return (
    <div className="flex flex-col gap-5 items-center justify-evenly py-5 text-pink-500 font-comico-regular">
      <span className="text-4xl">Welcome!</span>
      <span className="text-2xl">Name: <input type="text" /></span>
      <span className="text-2xl">Zip Code: <input type="text" /></span>
      <span className="text-2xl">Play Game:</span>
      <div className="flex flex-row gap-5 text-2xl">
      <Link className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-white" to="/solo">Solo</Link>
      <Link className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-white" to="/versus">Versus</Link>
      </div>
      <Link className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-2xl text-white" to="/catalog">Catalog</Link>
    </div>
  )
}

export default Welcome;
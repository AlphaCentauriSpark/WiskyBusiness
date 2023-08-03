import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Welcome = () => {
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'zip']);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, zip);
    setCookie('user', name);
    setCookie('zip', zip);
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-evenly py-5 text-pink-500 font-comico-regular">
      <span className="text-4xl">Welcome!</span>
      <form>
        <span className="text-2xl">
          Name:{' '}
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </span>
        <span className="text-2xl">
          Zip Code:{' '}
          <input
            type="text"
            onChange={(event) => {
              setZip(event.target.value);
            }}
          />
        </span>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <span className="text-2xl">Play Game:</span>
      <div className="flex flex-row gap-5 text-2xl">
        <Link
          className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-white"
          to="/solo"
        >
          Solo
        </Link>
        <Link
          className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-white"
          to="/versus"
        >
          Versus
        </Link>
      </div>
      <Link
        className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-2xl text-white"
        to="/catalog"
      >
        Catalog
      </Link>
    </div>
  );
};

export default Welcome;

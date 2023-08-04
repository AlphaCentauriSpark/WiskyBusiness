import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


const Welcome = () => {
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'zip']);
  const [versus, setVersus] = useState(false);
  const [roomId, setRoomId] = useState('');
  const room = Math.random().toString(36).substr(2, 4);


  const handleSubmit = (event) => {
    event.preventDefault();
    setCookie('user', name);
    setCookie('zip', zip);
    console.log(cookies.user, cookies.zip);
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
      {!versus ? <div><Link
          className="rounded-full bg-pink-300 hover:bg-sky-300/80 p-4 transition-colors duration-150 text-white text-center"
          to="/solo">Solo</Link> or <button
          className="rounded-full bg-pink-300 hover:bg-sky-300/80 p-4 transition-colors duration-150 text-white"
          onClick={()=>{setVersus(true)}}
        >Versus</button></div> : <div><Link
          className="rounded-full bg-pink-300 hover:bg-sky-300/80 p-4 transition-colors duration-150 text-white"
          to={`/versus/${room}`}
        >Create</Link> or <Link className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-white"
        to={`/versus/${roomId}`}
      >Join</Link><input type="text" onChange={(e) => setRoomId(e.target.value)}/></div>}
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

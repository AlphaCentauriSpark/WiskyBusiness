import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';


const Welcome = () => {
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'zip']);
  const [versus, setVersus] = useState(false);
  const [roomId, setRoomId] = useState('');
  const room = Math.random().toString(36).substr(2, 8);


  const handleSubmit = (event) => {
    event.preventDefault();
    setCookie('user', name);
    setCookie('zip', zip);
    console.log(cookies.user, cookies.zip);
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-evenly text-pink-400 font-comico-regular  ">
      <div className="bg-[#BDE0fE]/30 w-full items-center flex flex-col p-7 mb-5 border-b-2 border-[#A2D2FF]/40">
        <span className="text-6xl text-shadow-md mb-5">Welcome!</span>
        <form className="flex flex-col gap-3">
          <span className="text-2xl">
            Name:{' '}
            <input
              className="flex mt-[2.5px] rounded-xl"
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </span>
          <span className="text-2xl">
            Zip Code:{' '}
            <input
              className="flex mt-[2.5px] rounded-xl"
              type="text"
              onChange={(event) => {
                setZip(event.target.value);
              }}
            />
          </span>
          <button
            type="submit"
            onClick={handleSubmit}
            className=" bg-pink-300 text-white text-xl mt-2 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
      <span className="text-6xl justify-center flex mb-10 mt-3">Play Now!</span>
      <div className="gap-5 flex text-2xl w-full h-48 justify-center items-center p-10">
        {!versus ? (
          <>
            <div className="flex w-full h-full">
              <button className="rounded-full bg-pink-300 hover:bg-sky-300/80  transition-colors duration-150 text-white text-4xl p-6 text-shadow w-full h-full">
                <Link to="/solo">Solo</Link>
              </button>
            </div>
            <p>or</p>
            <div className="flex w-full h-full">
              <button
                className="rounded-full bg-pink-300 hover:bg-sky-300/80  transition-colors duration-150 text-white text-4xl p-6 text-shadow w-full h-full"
                onClick={() => {
                  setVersus(true);
                }}
              >
                Versus
              </button>
            </div>
          </>
        ) : (
          <div>
            <Link
              className="rounded-full bg-pink-300 hover:bg-sky-300/80 p-4 transition-colors duration-150 text-white"
              to={`/versus/${room}`}
            >
              Create
            </Link>{' '}
            or{' '}
            <Link
              className="rounded-full bg-pink-300 p-4 hover:bg-sky-300/80 transition-colors duration-150 text-white"
              to={`/versus/${roomId}`}
            >
              Join
            </Link>
            <input type="text" onChange={(e) => setRoomId(e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;

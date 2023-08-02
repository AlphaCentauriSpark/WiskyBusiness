const test = require('./test.js');
const make_move = require('./make_move.js');

module.exports = (socket, io) => {
  const rooms = new Map();
  
  //Matchmaking and room creation logic
  let room;
  if (!room) {
    room = createNewRoom();
    socket.join(room);
  } else {
    socket.join(room);
  };
 
  // Notify the clients that they are connected
  io.to(room).emit('players_connected', { room });

  
  socket.on('ready', (data) => {
    test(data);
  });
  
  socket.on('make_move', (move) => {
    make_move(move, socket, io, room);
  });
  
  function createNewRoom() {
    const room = 'room_' + Math.random().toString(36).substr(2, 4);
    rooms.set(room, { players: 0 });
    return room;
  }
  
};

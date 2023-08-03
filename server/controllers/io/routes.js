const test = require('./test.js');
const make_move = require('./make_move.js');

module.exports = (socket, io, rooms) => {
  
  console.log('New player connected:', socket.id);
  
  //Matchmaking and room creation logic
  let room;
  for (const [currentRoom, currentPlayers] of rooms) {
    if (currentPlayers.players < 2) {
      room = currentRoom;
    }
  }
  
  if (!room) {
    room = createNewRoom();
    socket.join(room);
    console.log(`creating new room ${room}`);
  } else {
    rooms.set(room, {players: rooms.get(room).players + 1});
    console.log(`joining room ${room}, room now has ${rooms.get(room).players} players in it`);
    socket.join(room);
  };
  
  console.log('rooms: ', rooms);
  
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
    rooms.set(room, { players: 1 });
    return room;
  }
  
};

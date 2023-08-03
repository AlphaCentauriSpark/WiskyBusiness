const test = require('./test.js');
const make_move = require('./make_move.js');

module.exports = (socket, io, rooms) => {
  
  console.log('New player connected:', socket.id);
  
  //Matchmaking and room creation logic
  let room;
  for (let i in rooms) {
    if (rooms[i].players.length < 2) {
      room = i;
      break;
    }
  }
  
  if (!room) {
    room = createNewRoom(socket.id);
    socket.join(room);
    console.log(`creating new room ${room}`);
  } else {
    rooms[room].players.push(socket.id);
    console.log(`joining room ${room}, room now has ${rooms[room].players.length} players in it`);
    socket.join(room);
    io.to(room).emit('players_ready', rooms[room]);
  };
  
  console.log('rooms: ', rooms);
  
  // Notify the clients that they are connected
  io.to(room).emit('players_connected', { room });

  
  socket.on('ready', (cb) => {
    // io.to(socket.id).emit('id', socket.id);
    let socketId = socket.id;
    cb(socket.io);
    // io.to(socketId).emit('id', socket.id);
    socket.emit('id', socket.id);
  });
  
  socket.on('make_move', (move) => {
    make_move(move, socket, io, room);
  });
  
  function createNewRoom() {
    const room = 'room_' + Math.random().toString(36).substr(2, 4);
    rooms[room] = { players: [socket.id] };
    return room;
  }
  
};

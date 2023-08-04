const test = require('./test.js');
const make_move = require('./make_move.js');

module.exports = (socket, io, rooms) => {

  console.log('New player connected:', socket.id);
  let room;

  //Matchmaking and room creation logic
  socket.on('room_joined', (room_id) => {
    room = room_id;
    if (!rooms[room]) {
      rooms[room] = { players: [] };
    }
    rooms[room].players.push(socket.id);
    socket.join(room);
    if (rooms[room].players.length === 2) {
      io.to(room).emit('unpause');
    }
  })
  // io.to(room_id).emit('players_ready', rooms[room_id]);

  // if (!room) {
  //   room = createNewRoom(socket.id);
  //   socket.join(room);
  //   console.log(`creating new room ${room}`);
  // } else {
  //   rooms[room].players.push(socket.id);
  //   console.log(`joining room ${room}, room now has ${rooms[room].players.length} players in it`);
  //   socket.join(room);
  //   io.to(room).emit('players_ready', rooms[room]);

  //   //axios call; emit data
  // };

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
  
  
  socket.on('disconnect', () => {
    console.log('server disc');
    let i = rooms[room].players.indexOf(socket.id);
    rooms[room].players.splice(i, 1);
    io.to(room).emit('pause');
  })
};

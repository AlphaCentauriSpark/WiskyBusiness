const test = require('./test.js');
const make_move = require('./make_move.js');

const socketRooms = {};

game: {
  card1: {
    flipped: bool;
    matched: bool;
    petdata: { . . . };
  }
}


module.exports = (socket, io, rooms) => {

  console.log('New player connected:', socket.id);


  //Matchmaking and room creation logic
  socket.on('room_joined', (room_id) => {
    socketRooms[socket.id] = room_id;
    if (!rooms[socketRooms[socket.id]]) {
      rooms[socketRooms[socket.id]] = { players: [], game: {} };
      //populate game data
    }
    rooms[socketRooms[socket.id]].players.push(socket.id);
    console.log(rooms[socketRooms[socket.id]]);
    socket.join(socketRooms[socket.id]);

    if (rooms[socketRooms[socket.id]].players.length === 2) {
      io.to(socketRooms[socket.id]).emit('unpause');
    }
  });


  // Notify the clients that they are connected
  io.to(socketRooms[socket.id]).emit('players_connected', socketRooms[socket.id] );


  socket.on('ready', (cb) => {
    // io.to(socket.id).emit('id', socket.id);
    let socketId = socket.id;
    cb(socket.io);
    // io.to(socketId).emit('id', socket.id);
    socket.emit('id', socket.id);
  });

  socket.on('make_move', (move) => {
    // store & send game state
    make_move(move, socket, io, socketRooms[socket.id]);
  });


  socket.on('disconnect', () => {
    console.log('server disc');
    const i = rooms[socketRooms[socket.id]].players.indexOf(socket.id);
    rooms[socketRooms[socket.id]].players.splice(i, 1);
    io.to(socketRooms[socket.id]).emit('pause');
  });
};

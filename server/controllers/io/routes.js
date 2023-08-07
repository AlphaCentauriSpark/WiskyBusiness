const test = require('./test.js');
const make_move = require('./make_move.js');

const socketRooms = {};

// game: {
//   card1: {
//     isFlipped: bool;
//     isMatched: bool;
//     petdata: { . . . };
//   }
// }

// module.exports = (socket, io, rooms) => {

//   console.log('New player connected:', socket.id);

//   //Matchmaking and room creation logic
//   socket.on('room_joined', (room_id, petData) => {
//     socketRooms[socket.id] = room_id;
//     if (!rooms[socketRooms[socket.id]]) {
//       rooms[socketRooms[socket.id]] = { players: [], game: {} };
//       //populate game data

//       //do stuff w/ pet data
//       socket.room_id;

//       rooms[socketRooms[socket.id]].game.data = petData;
//     }
//     rooms[socketRooms[socket.id]].players.push(socket.id);
//     console.log(room_id, ' : ', rooms[socketRooms[socket.id]]);
//     socket.join(socketRooms[socket.id]);

//     if (rooms[socketRooms[socket.id]].players.length === 2) {
//       io.to(socketRooms[socket.id]).emit('unpause');
//     }
//   });

//   // Notify the clients that they are connected
//   io.to(socketRooms[socket.id]).emit('players_connected', socketRooms[socket.id] );

//   socket.on('make_move', (move) => {
//     // store & send game state
//     make_move(move, socket, io, socketRooms[socket.id]);
//   });

//   socket.on('disconnect', () => {
//     console.log('server disc');
//     const i = rooms[socketRooms[socket.id]].players.indexOf(socket.id);
//     rooms[socketRooms[socket.id]].players.splice(i, 1);
//     io.to(socketRooms[socket.id]).emit('pause');
//   });
// };

module.exports = (socket, io, rooms) => {
  console.log('New player connected:', socket.id);

  //Matchmaking and room creation logic
  socket.on('room_joined', (room_id, name, pet_data) => {
    socket.room_id = room_id;

    if (!rooms[socket.room_id]) {
      rooms[socket.room_id] = { players: {}, game: {} };

      //set game data
      rooms[socket.room_id].game.data = pet_data;
    }

    rooms[socket.room_id].players[socket.id] = name;
    console.log(room_id, ' : ', rooms[socket.room_id]);
    socket.join(socket.room_id);

    socket.emit('game_data', rooms[socket.room_id].game.data);

    if (Object.keys(rooms[socket.room_id].players).length === 2) {
      io.to(socket.room_id).emit('unpause');
    }
  });

  // Notify the clients that they are connected
  io.to(socket.room_id).emit('players_connected', socket.room_id);

  // socket.on('get_game_data', () => {
  //   io.to(socket.room_id).emit(rooms[socket.room_id].game.data);
  // });

  socket.on('make_move', (pet_id, card_index) => {
    // store & send game state
    // make_move(move, socket, io, socket.room_id);

    console.log(`pet_id::: ${pet_id}`);
    console.log(`card_index::: ${card_index}`);
    io.to(socket.room_id).emit('move_made', {
      player: socket.id,
      pet_id: pet_id,
      index: card_index,
    });
  });

  socket.on('disconnect', () => {
    console.log('server disc');
    delete rooms[socket.room_id].players[socket.id];

    // rooms[socket.room_id].players.splice(i, 1);
    io.to(socket.room_id).emit('pause');
  });
};

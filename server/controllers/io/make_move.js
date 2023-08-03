module.exports = (move, socket, io, room) => {
  // Handle the "make_move" event with the move data from the client
  // Update game state and notify all clients about the move
  console.log('MOVE HAS BEEN MADE FROM PLAYER: ', socket.id);
  io.to(room).emit('move_made', { player: socket.id, move });
};
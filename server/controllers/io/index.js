const routes = require('./routes.js');

module.exports = (io) => {
  const rooms = {};
  io.on('connection', (socket) => {
    
    routes(socket, io, rooms);
  });
};
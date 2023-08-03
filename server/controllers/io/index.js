const routes = require('./routes.js');

module.exports = (io) => {
  const rooms = new Map();
  io.on('connection', (socket) => {
    
    routes(socket, io, rooms);
  });
};
const routes = require('./routes.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    routes(socket, io);
  });
};
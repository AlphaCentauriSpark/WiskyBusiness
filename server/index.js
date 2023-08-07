const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const http = require('http');
const socketIO = require('socket.io'); // Import socket.io
const SocketControllers = require('./controllers/io');
require('dotenv').config();

app.use(express.static(path.join(__dirname)));

console.log(path.join(__dirname));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app); // Use Express app to create the HTTP server
//const io = socketIO(server); // Pass the HTTP server to socket.io

const { Server } = socketIO;
// const io = new Server(server, {
//   cors: {
//     origin: 'http://127.0.0.1:5173/home', // Set this to the specific origin of your React app, e.g., 'http://localhost:3000'
//   },
// });
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://admin.socket.io/'],
  },
});
SocketControllers(io);

// const rooms = new Map();

// io.on('connection', (socket) => {
//   console.log('New player connected:', socket.id);
//   console.log('rooms: ', rooms);
//   //Matchmaking and room creation logic
//   let room;
//   if (!room) {
//     room = createNewRoom();
//     socket.join(room);
//   } else {
//     socket.join(room);
//   };

//   // Notify the clients that they are connected
//   io.to(room).emit('players_connected', { room });

//   // Handle client events
//   socket.on('ready', () => {
//     // Handle the "ready" event, indicating the player is ready to start the game
//     console.log('PLAYER READY');
//     io.to(room).emit('player_ready', { player: socket.id });
//   });

//   socket.on('make_move', (move) => {
//     // Handle the "make_move" event with the move data from the client
//     // Update game state and notify all clients about the move
//     console.log('MOVE HAS BEEN MADE');
//     io.to(room).emit('move_made', { player: socket.id, move });
//   });

//   socket.on('disconnect', () => {
//     console.log('Player disconnected:', socket.id);
//     // Implement logic to handle a player disconnecting mid-game (if needed)
//   });
// });

// function createNewRoom() {
//   const room = 'room_' + Math.random().toString(36).substr(2, 4);
//   rooms.set(room, { players: 0 });
//   return room;
// }

const routes = require('./controllers/routes.js');

app.get('/', routes.getAnimals);

app.get('/animals', routes.getAnimals);

app.get('/types', routes.getTypes);

app.get('/organizations', routes.getOrganizations);

server.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

module.exports = app;

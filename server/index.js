const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
require('dotenv').config()

app.use(express.static(path.join(__dirname)));


console.log(path.join(__dirname));


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
const http = require('http');
const socketIO = require('socket.io'); // Import socket.io

const server = http.createServer(app); // Use Express app to create the HTTP server
//const io = socketIO(server); // Pass the HTTP server to socket.io

const { Server } = socketIO;
// const io = new Server(server, {
//   cors: {
//     origin: 'http://127.0.0.1:5173/home' // Set this to the specific origin of your React app, e.g., 'http://localhost:3000'
//   }
// });
const io = new Server(server);

const rooms = new Map();

io.on('connection', (socket) => {
  // console.log('New player connected:', socket.id);
  console.log('connected');
  
  socket.emit('helooooo', 1, '2', { 3: Buffer.from([4])});

  socket.on('msg', (data) => {
    console.log('message!!')
    io.sockets.emit('hello', data);
  })


  // Matchmaking and room creation logic
  // let room;
  // if (!room) {
  //   room = createNewRoom();
  //   socket.join(room);
  // } else {
  //   socket.join(room);
  // }

  // // Notify the clients that they are connected
  // //io.to(room).emit('players_connected', { room });

  // // Handle client events
  // socket.on('ready', () => {
  //   // Handle the "ready" event, indicating the player is ready to start the game
  //   io.to(room).emit('player_ready', { player: socket.id });
  // });

  // socket.on('make_move', (move) => {
  //   // Handle the "make_move" event with the move data from the client
  //   // Update game state and notify all clients about the move
  //   io.to(room).emit('move_made', { player: socket.id, move });
  // });

  // socket.on('disconnect', () => {
  //   console.log('Player disconnected:', socket.id);
  //   // Implement logic to handle a player disconnecting mid-game (if needed)
  // });
});

// function createNewRoom() {
//   const room = 'room_' + Math.random().toString(36).substr(2, 4);
//   rooms.set(room, { players: 0 });
//   return room;
// }






const routes = require('./controllers/routes.js');
// const exampleRoute = require('');
// const exampleRoute = require('');
// const exampleRoute = require('');

app.get('/', routes.getPets);
// app.use('/multiplayer', reviewRoute);
// app.use('/catalog', registerRoute);
// app.use('/:id', loginRoute);

app.get('/animals', (req, res) => {
  routes.getAnimals(req, res)
});

app.get('/types', (req, res) => {
  routes.getTypes(req, res)
});

app.get('/organizations', (req, res) => {
  routes.getOrganizations(req, res)
});

server.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
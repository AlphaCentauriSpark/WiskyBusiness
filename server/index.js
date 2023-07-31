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
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
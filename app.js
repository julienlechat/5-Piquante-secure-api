const express = require('express');
const bodyParser = require('body-parser')

// BASE DE DONNEE
const mongoose = require('mongoose');

// ROUTE
const usersRoute = require('./routes/users')


mongoose.connect('mongodb://localhost:27017/piquante',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json())

app.use('/api/auth', usersRoute);

module.exports = app;
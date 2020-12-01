const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet');
const app = express();

// BASE DE DONNEE
mongoose.connect('mongodb://localhost:27017/piquante',
  { useNewUrlParser: true,
    useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// ROUTE
const usersRoute = require('./routes/users')
const saucesRoute = require('./routes/sauces')

// CHANGE LE HEADER SUR TOUTE LES REQUETES ECOUTER
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
  });
  
// SECURISE LES EN-TETES
app.use(helmet());

// PARSE LE BODY EN JSON
app.use(bodyParser.json())

// ASSOCIE LE CHEMIN '/images' AU DOSSIER 'images'
app.use('/images', express.static(path.join(__dirname, 'images')))

// ASSOCIE LE CHEMIN A UNE ROUTE
app.use('/api/auth', usersRoute)
app.use('/api/sauces', saucesRoute)

//EXPORT LE CONTENU
module.exports = app;
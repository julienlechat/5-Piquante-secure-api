const express = require('express')
const bouncer = require('express-bouncer')(30000, 800000, 3) // anti-bruteforce, après 3 erreurs -> attendre entre 30s et 800s
const route = express.Router()
const userCtrl = require('../controllers/users')

route.post('/signup', userCtrl.signup)
route.post('/login', bouncer.block, userCtrl.login)

module.exports = route;
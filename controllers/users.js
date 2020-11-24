const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Users = require('../models/users')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new Users({
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(() => res.status(201).json({ message: 'Register: Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
    Users.findOne({email:req.body.email})
        .then(user => {
            if(!user) return res.status(401).json({error: 'Login: utilisateur introuvable!'})
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) return res.status(401).json({error: 'Login: Mot de passe incorrect!'})
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'W0TFH87VH8NgAINL-EQrXbaBZ-A0i2lrnENcv6zzqsz70QnJ2vQOfif3RaUp2Py9lBRpVTsmnkGuawKGHJ6dbLSvIqoAJKo2V2X4oACal0',
                            {expiresIn: '24h'}
                        )
                    })
                })
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))

}
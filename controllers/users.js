const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const pwdValidator = require("password-validator")
const Users = require('../models/users')

// Exigence du mot de passe
let pwd = new pwdValidator();
pwd
.is().min(8) // minimum 8 caractères
.is().max(25) // maximum 25 caractères
.has().uppercase() // une majuscule
.has().lowercase() // une minuscule
.has().not().spaces() // pas d'espaces
.has().digits() // un chiffre

exports.signup = (req, res, next) => {
    if (!pwd.validate(req.body.password)) {
        return res.status(400).json({error: "Votre mot de passe n'est pas assez compléxe !"})
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Users({email: req.body.email, password: hash})
            
            user.save()
                .then(() => res.status(201).json({ message: 'Register: Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
            })
        .catch(error => res.status(500).json({ error }));
    }
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
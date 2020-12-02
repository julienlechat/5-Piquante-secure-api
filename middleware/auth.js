const jwt = require('jsonwebtoken')

// VERIFICATION DE L'UTILISATEUR
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, 'W0TFH87VH8NgAINL-EQrXbaBZ-A0i2lrnENcv6zzqsz70QnJ2vQOfif3RaUp2Py9lBRpVTsmnkGuawKGHJ6dbLSvIqoAJKo2V2X4oACal0')
        const userId = decodeToken.userId

        if (req.body.userId && req.body.userId !== userId) {
            throw 'userID non valide'
        } else {
            next()
        }
    } catch {
        res.status(401).json({error: new Error('Requête non valide!')})
    }
}
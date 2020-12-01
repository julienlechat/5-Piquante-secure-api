const Sauce = require('../models/sauces')
const fs = require('fs')

// RETOURNE LA LISTE DES SAUCES
exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => {res.status(200).json(sauces)})
        .catch(error => {res.status(404).json({error})})
}

// RETOURNE UNE SAUCE
exports.getSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {res.status(200).json(sauce)})
        .catch(error => {res.status(404).json({error})})
}

// ENVOIE UNE SAUCE
exports.postSauce = (req, res, next) => {
    const sauce = new Sauce({
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce envoyé'}))
        .catch(error => {res.status(400).json({error})})
}

// MODIFIE UNE SAUCE
exports.editSauce = (req, res, next) => {
    const sauceId = {_id: req.params.id}

    function updateSauce() {
        function bodyContentImg() {
            if (!req.file) return {...req.body}
            return {...JSON.parse(req.body.sauce),imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
        }

        Sauce.updateOne(sauceId, {...bodyContentImg(), _id: req.params.id})
            .then(() => res.status(200).json({message: 'Objet modifié !'}))
            .catch(error => res.status(400).json({error}))
    }

    if(req.file) {
        Sauce.findOne(sauceId)
            .then(img => {
                const filename = img.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, () => {return updateSauce()})
            })
            .catch(error => res.status(500).json({error}))
    } else {updateSauce()}
}

// SUPPRIME UNE SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({error}))
}

// GERE LES AJOUT/SUPR DE LIKE/DISLIKE
exports.likeSauce = (req, res, next) => {
    var sauceId = {_id: req.params.id}
    
    function applyLike(status) {

         function editFn(st) {
             console.log(st, req.body.like)
            // SI JE NE SUIS PAS DANS UN TABLEAU
            if (st === 0 && req.body.like === 1) return {$inc: {likes: 1},$push: {usersLiked: req.body.userId}, _id: req.params.id}
            if (st === 0 && req.body.like === -1) return {$inc: {dislikes: 1},$push: {usersDisliked: req.body.userId}, _id: req.params.id}
            // SI JE SUIS DANS LE TABLEAU LIKE
            if (st === 1 && req.body.like === 0) return {$inc: {likes: -1},$pull: {usersLiked: req.body.userId}, _id: req.params.id}
            if (st === 1 && req.body.like === -1) return {$inc: {likes: -1, dislikes: 1},$pull: {usersLiked: req.body.userId},$push: {usersDisliked: req.body.userId}, _id: req.params.id}
            // SI JE SUIS DANS LE TABLEAU DISLIKE
            if (st === 2 && req.body.like === 1) return {$inc: {likes: 1, dislikes: -1},$pull: {usersDisliked: req.body.userId},$push: {usersLiked: req.body.userId}, _id: req.params.id}
            if (st === 2 && req.body.like === 0) return {$inc: {dislikes: -1},$pull: {usersDisliked: req.body.userId}, _id: req.params.id}
        }

        Sauce.updateOne(sauceId, editFn(status))
                .then(() => res.status(200).json({message: 'Like publié !'}))
                .catch(error => res.status(400).json({error}))
    }

    Sauce.findOne(sauceId)
        .then(sauce => {
            console.log(sauce)
            if (sauce.usersLiked.find((user) => user === req.body.userId)) return applyLike(1)
            if (sauce.usersDisliked.find((user) => user === req.body.userId)) return applyLike(2)
            return applyLike(0)
        })
        .catch(error => console.log(error))

}
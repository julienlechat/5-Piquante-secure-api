const express = require('express')
const router = express.Router()
const saucesCtrl = require('../controllers/sauces')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/', auth, saucesCtrl.getSauces)
router.get('/:id', auth, saucesCtrl.getSauce)
router.post('/', auth, multer, saucesCtrl.postSauce)
router.put('/:id', auth, multer, saucesCtrl.editSauce)
router.delete('/:id', auth, saucesCtrl.deleteSauce)
router.post('/:id/like', auth, saucesCtrl.likeSauce)

module.exports = router
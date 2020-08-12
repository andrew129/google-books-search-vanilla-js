const router = require("express").Router();
const db = require('../models')

router.post('/api/savebook', function(req, res) {
    console.log(req.body)
    db.Book.create({
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        image: req.body.imagePath,
        bookLink: req.body.bookLink
    }).then(dbBook => {
        res.json(dbBook)
    })
    .catch(err => {
        res.json(err.message)
    })
})

router.get('/api/savebook', function(req, res) {
    db.Book.find({})
        .then(dbBook => {
            res.json(dbBook)
        })
        .catch(err => {
            res.json(err.message)
        })
})

router.delete('/api/savebook/:id', function(req, res) {
    console.log(req.params.id)
    db.Book.findByIdAndRemove(req.params.id)
        .then(dbBook => {
            res.json(dbBook)
        })
        .catch(err => res.json(err.message))
})

module.exports = router;
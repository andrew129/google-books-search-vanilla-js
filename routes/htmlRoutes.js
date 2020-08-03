const path = require('path')
const router = require("express").Router();

router.get('/search', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/saved', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/saved.html'))
})

module.exports = router;
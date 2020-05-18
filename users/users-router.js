const router = require('express').Router()

const Users = require('./users-module')

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(er => {
        res.send(err)
    })
})

module.exports = router
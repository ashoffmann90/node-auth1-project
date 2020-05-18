const router = require('express').Router()

const Users = require('./users-module')

function restricted(req, res, next){
    if(req.session && req.session.loggedIn){
        next()
    } else {
        res.status(401).json({ message: "Cannot login"})
    }
}

router.use(restricted)

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
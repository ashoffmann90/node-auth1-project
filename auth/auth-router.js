const bcrypt = require('bcryptjs')

const router = require('express').Router()

const Users = require('../users/users-module')
const { isValid } = require('../users/users-service')

router.post('/register', (req, res) => {
    const credentials = req.body
    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 10

        //hash the password
        const hash = bcrypt.hashSync(credentials.password, rounds)
        credentials.password = hash

        //save user to database
        Users.add(credentials)
        .then(user => {
            req.session.loggedIn === true
            res.status(201).json({ data: user })
        })
        .catch(er => {
            res.status(500).json({ message: er.message })
        })
    } else {
        res.status(400).json({ message: 'Please provide username and password' })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body

    if(isValid(req.body)){
        Users.findBy({ username: username })
        .then(([user]) => {
            //compare password and hash stored in database
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.loggedIn = true
                req.session.user = user
                res.status(200).json({ message: "Logged in"})
            } else {
                res.status(400).json({ message: "Invalid credentials" })
            }
        })
        .catch(er => {
            res.status(400).json({ message: 'Please provide username and password'})
        })
    }
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(er => {
            if(er){
                res.status(500).json({ message: 'We could not log you out.'})
            } else {
                res.status(204).end()
            }
        })
    } else {
        res.status(204).end()
    }
})


module.exports = router
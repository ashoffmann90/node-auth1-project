const express = require('express')
const cors = require('cors')
const session = require('express-session')

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const server = express()

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.send.SECURE_COOKIE || false, //send cookie over HTTPS only, should be true during production
        httpOnly: true, //true means that clients JS cannot access the cookie
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: 'Name',
    secret: process.env.COOKIE_SECRET || 'secretcookie'
}

//create session, send cookie back (cookie stores session id)
server.use(session(sessionConfig)) //turn on sessions for API

server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.json({ api: "ip" })
})

module.exports = server
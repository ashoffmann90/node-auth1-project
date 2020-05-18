const express = require('express')
const cors = require('cors')

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const server = express()

server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.json({ api: "ip" })
})

module.exports = server
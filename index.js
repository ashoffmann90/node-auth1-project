const server = require('./server')

const port = process.env.PORT || 4444

server.listen(port, () => 
    console.log(`Running on Port ${port}`)
)
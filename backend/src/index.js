const http = require('http')
const socketIo = require('socket.io')
const { logger } = require('./util')
const Routes = require('./routes')
const PORT = 3000

const handler = function (request, response){
    const defaultRoute = async (request, response) => response.end('Hello!')

    const routes = new Routes(io)
    const chosen = routes[request.method.toLowerCase()] || defaultRoute

    return chosen.apply(routes, [request, response])
}

const server = http.createServer(handler)
const io = socketIo(server, {
    cors:{
        origin:"*",
        Credential: false
    }
})

io.on("connection", (socket) => logger.info('someone connected', socket.id))
// const interval = setInterval(() => {
//     io.emit('file-uploaded', 5e6)
// }, 250)


const startServer = () => {
    const { port } = server.address()
    logger.info(`App running at http://localhost:${port}`)
}

server.listen(PORT, startServer)
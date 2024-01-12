const url = require('url')
const UploadHandler = require('./uploadHandler')

class Routes {
    #io
    constructor(io){
        this.#io = io
    }

    async post (request, response){
        const { headers } = request
        const { query: { socketId }} = url.parse(request.url, true)
        const redirectTo = headers.origin

        const uploadHandler = new UploadHandler(this.#io, socketId)

        const onFinish = (response, redirectTo) => () => {
            response.writeHead(303, {
                Conection: 'close',
                Location: `${redirectTo}?msg=Files uploaded with success!`
            })

            response.end()
        }

        uploadHandler
            .registerEvents(
                headers, 
                onFinish(response, redirectTo)
            )
    }
}

module.exports = Routes
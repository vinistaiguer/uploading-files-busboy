const Busboy = require('busboy')

const { logger } = require('./util')

class UploadHandler {

    #io
    #socketIo

    constructor(io, socketIo){
        this.#io = io
        this.#socketIo = socketIo
    }

    registerEvents(headers, onFinish){
        const busboy = new Busboy({ headers })

        busboy.on("file", (fieldname, file, filename) => {
            logger.info('file '+ filename)
        })

        busboy.on("finish", onFinish)

        return busboy
    }
}

module.exports = UploadHandler
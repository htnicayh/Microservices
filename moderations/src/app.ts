import express, { Application, Request, Response } from 'express'
import axios from 'axios'
import cors from 'cors'
import * as configProperties from '../config/config.js'

const expressApp: Application = express()
const PORT = process.env.PORT || 4003

expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

const host = configProperties?.CoreEvents?.link || process.env.CORE_EVENTS
const url = `${host}/events`

expressApp.post('/events', async (request: Request, response: Response) => {
    const { type, data } = request.body
    console.log('Receive Event: ', type)
    
    if (type === 'CreateComment') {
        const status = data.content.toLowerCase().includes('danger') ? 'reject' : 'approve'
        const payload = {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        }

        await axios.post(url, payload)
    }

    response.status(200).json(data)
})

expressApp.listen(PORT, () => {
    console.log(`ModerationsService is listening at PORT ${PORT}`)
})
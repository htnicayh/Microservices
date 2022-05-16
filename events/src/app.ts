import express, { Request, Response } from 'express'
import axios from 'axios'
import cors from 'cors'
import * as configProperties from '../config/config.js'

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

expressApp.use(cors())

const events = []

expressApp.post('/events', (req: Request, res: Response) => {
    const event = req.body
    const urlPost = configProperties?.CorePosts?.link || process.env.CORE_POST
    const urlComment = configProperties?.CoreComments?.link || process.env.CORE_COMMENT
    const urlQueries = configProperties?.CoreQueries?.link || process.env.CORE_QUERIES
    const urlModeration = configProperties?.CoreModeration?.link || process.env.CORE_MODERATION
    events.push(event)

    axios.post(`${urlPost}/events`, event)
    axios.post(`${urlComment}/events`, event)
    axios.post(`${urlQueries}/events`, event)
    axios.post(`${urlModeration}/events`, event)

    res.json({ status: 'oke' })
})

expressApp.get('/events', (req: Request, res: Response) => {
    res.json(events)
})

expressApp.listen(4005, () => {
    console.log('EventBus is listening at port 4005')
})
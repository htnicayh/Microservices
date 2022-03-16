import express, { Application, Request, Response } from 'express'
import axios from 'axios'
import cors from 'cors'

const expressApp: Application = express()
const PORT = process.env.PORT || 4003

expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

expressApp.post('/events', async (request: Request, response: Response) => {
    const { type, data } = request.body
    
    if (type === 'CommentCreated') {
        const status = data.content.includes('danger') ? 'reject' : 'approve'

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        })
    }

    response.status(200).json(data)
})

expressApp.listen(PORT, () => {
    console.log(`ExpressApp is listening at PORT ${PORT}`)
})
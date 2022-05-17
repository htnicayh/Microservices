import { randomBytes } from 'crypto'
import express, {
    Application, 
    Request,
    Response
} from 'express'
import { corsMiddleware } from './middlewares'
import morgan from 'morgan'
import axios from 'axios'
import * as configProperties from '../config/config.js'

const expressApp: Application = express();

const posts = {}

expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

expressApp.use(corsMiddleware)
expressApp.use(morgan('dev'))

expressApp.get('/posts', (_: Request, res: Response) => {
    res.status(200).json(posts)
})

expressApp.post('/posts/create', async (req: Request, res: Response) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id,
        title
    }
    const url = configProperties?.CoreEvents?.link || process.env.CORE_EVENT

    await axios.post(`${url}/events`, {
        type: 'CreateStatus',
        data: {
            id, 
            title
        }
    })

    res.status(201).json(posts[id])
})

expressApp.post('/events', (req: Request, res: Response) => {
    console.log('Receive event: ', req.body.type)

    res.json({})
})

expressApp.listen(4000, () => {
    console.log('ConfigProperties - ', configProperties)
    console.log('Version Latest')
    console.log(`PostService is listening at PORT 4000`)
})
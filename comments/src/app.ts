import axios from 'axios'
import { randomBytes } from 'crypto'
import express, {
    Application,
    Request,
    Response
} from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares'

const expressApp: Application = express()

expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

expressApp.use(corsMiddleware)
expressApp.use(morgan('dev'))

const commentsByPostId = {}

expressApp.get('/posts/:id/comments', (req: Request, res: Response) => {
    res.json(commentsByPostId[req.params.id] || [])
})

expressApp.post('/posts/:id/comments', async (req: Request, res: Response) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content })
    commentsByPostId[req.params.id] = [...comments]

    await axios.post('http://localhost:4005/events', {
        type: 'CreateComment',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).json(comments)
})
 
expressApp.post('/events', (req: Request, res: Response) => {
    console.log('Receive Event: ', req.body.type)

    res.json({})
})

expressApp.listen(4001, () => {
    console.log('ExpressApp is listening at PORT 4001')
})
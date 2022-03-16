import axios from 'axios'
import { randomBytes } from 'crypto'
import express, {
    Application,
    Request,
    Response
} from 'express'
import morgan from 'morgan'
import { ICommentPayload } from './interfaces'
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

    const payload: ICommentPayload = {
        type: 'CreateComment',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    }

    await axios.post('http://localhost:4005/events', payload)

    res.status(201).json(comments)
})
 
expressApp.post('/events', async (req: Request, res: Response) => {
    console.log('Receive Event: ', req.body.type)

    const { type, data } = req.body
    const { postId, id, status } = data

    if (type === 'CommentModerated') {
        const comments = commentsByPostId[postId]
        const comment = comments.find((cmt: any) => {
            return cmt.id === id
        })
        comment.status = status

        const payload = {
            type: 'CommentUpdated',
            data: {
                ...data,
                status
            }
        } as ICommentPayload
    
        await axios.post('http://localhost:4005/events', payload)
    }


    res.json({})
})

expressApp.listen(4001, () => {
    console.log('ExpressApp is listening at PORT 4001')
})
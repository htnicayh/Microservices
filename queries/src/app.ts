import axios from 'axios'
import cors from 'cors'
import express, {
    Application,
    Request,
    Response
} from 'express'
import morgan from 'morgan'
import * as configProperties from '../../config/constant.js'

const expressApp: Application = express()

expressApp.use(morgan('dev'))
expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))
expressApp.use(cors())

const posts = {}

const handleEvents = (type: string, data: any) => {
    switch(type) {
        case 'CreateStatus': {
            const { id, title } = data
            posts[id] = { id, title, comments: [] }

            break
        }
        case 'CreateComment': {
            const { id, content, postId, status } = data
            const post = posts[postId]
            post.comments.push({ id, content, status })

            break
        }
        case 'CommentUpdated': {
            const { id, postId, content, status } = data
            const post = posts[postId]
            const comment = post.comments.find((cmt: any) => {
                return cmt.id === id
            })

            console.log('data', data)

            comment.status = status
            comment.content = content

            break
        }
        default: {
            break
        }
    }
}

expressApp.get('/posts', (_: Request, res: Response) => {
    res.status(200).json(posts)
})

expressApp.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body

    handleEvents(type, data)

    res.json(posts)
})

expressApp.listen(4002, async () => {
    console.log('QueriesService is listening at port 4002')

    const response = await axios.get(`${configProperties.HTTP.host}:4005/events`)

    for (const event of response.data) {
        const { type, data } = event
        console.log(`Processing event: ${event.type}`)

        handleEvents(type, data)
    }
})
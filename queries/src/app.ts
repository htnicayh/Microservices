import cors from 'cors'
import express, {
    Application,
    Request,
    Response
} from 'express'
import morgan from 'morgan'

const expressApp: Application = express()

expressApp.use(morgan('dev'))
expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))
expressApp.use(cors())

const posts = {}

expressApp.get('/posts', (_: Request, res: Response) => {
    res.status(200).json(posts)
})

expressApp.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body

    switch(type) {
        case 'CreateStatus': {
            const { id, title } = data
            posts[id] = { id, title, comments: [] }

            break
        }
        case 'CreateComment': {
            const { id, content, postId } = data
            console.log('Posts - ', posts[postId])
            const post = posts[postId]
            post.comments.push({ id, content })

            break
        }
        default: {
            break
        }
    }
})

expressApp.listen(4002, () => {
    console.log('ExpressApp is listening at port 4002')
})
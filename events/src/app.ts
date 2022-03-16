import express, { Request, Response } from 'express'
import axios from 'axios'
import cors from 'cors'

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))

expressApp.use(cors())

expressApp.post('/events', (req: Request, res: Response) => {
    const events = req.body

    axios.post('http://localhost:4000/events', events)
    axios.post('http://localhost:4001/events', events)
    axios.post('http://localhost:4002/events', events)
    axios.post('http://localhost:4003/events', events)

    res.json({ status: 'oke' })
}) 

expressApp.listen(4005, () => {
    console.log('ExpressApp is listening at port 4005')
})
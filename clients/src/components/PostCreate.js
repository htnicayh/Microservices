/** @format */

import axios from 'axios'
import { useRef, useState } from 'react'
// import { HOST } from '../constants/baseUrl.js'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const inputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`http://localhost:4000/posts`, {
            title
        })

        setTitle('')
        inputRef.current.focus()
    }

    return (
        <div>
            <form
                onSubmit={(event) => {
                    handleSubmit(event)
                }}
            >
                <div className="form-group">
                    <label>Title</label>
                    <input
                        ref={inputRef}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        className="form-control"
                    />
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate

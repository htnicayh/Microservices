/** @format */

import axios from 'axios'
import React, { useRef, useState } from 'react'
import { BASE_URL_STATUS } from '../constants/baseUrl'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const inputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`http://localhost:${BASE_URL_STATUS}/posts`, {
            title
        })

        setTitle('')
        inputRef.current.focus()

        console.log('Focus')
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
                            console.log(e.target.value)
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

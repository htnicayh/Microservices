/** @format */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL_COMMENTS } from '../constants/baseUrl'

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState({})

    useEffect(() => {
        async function getComments() {
            const results = await axios.get(
                `http://localhost:${BASE_URL_COMMENTS}/posts/${postId}/comments`
            )
            setComments(results.data)
        }

        getComments()
    }, [postId])

    const renderComments = Object.values(comments).map((comment) => {
        return <li key={comment.id}>{comment.content}</li>
    })

    return <ul>{renderComments}</ul>
}

export default CommentList

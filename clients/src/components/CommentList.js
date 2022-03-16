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
        let content

        if (comment.status === 'approve') {
            content = comment.content
        } else if (comment.status === 'pending') {
            content = 'This comment is awaiting for moderation'
        } else if (comment.status === 'reject') {
            content = 'This comment has been rejected'
        } else {
            content = 'Unknown comment'
        }

        return <li key={comment.id}>{content}</li>
    })

    return <ul>{renderComments}</ul>
}

export default CommentList

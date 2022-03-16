/** @format */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL_STATUS } from '../constants/baseUrl'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
    const [posts, setPosts] = useState({})

    const getPosts = async () => {
        const results = await axios.get(`http://localhost:${BASE_URL_STATUS}/posts`)
        console.log(results.data)
        setPosts(results.data)
    }

    useEffect(() => {
        getPosts()
    }, [])

    const renderPosts = Object.values(posts).map((post) => {
        return (
            <div
                className="card"
                style={{ width: '30%', margin: '10px 10px' }}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList postId={post.id} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="d-flex flex-row flex-wrap jusitfy-content-between">
                {renderPosts}
            </div>
        </>
    )
}

export default PostList

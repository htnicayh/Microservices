/** @format */

const CommentList = ({ comments }) => {
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

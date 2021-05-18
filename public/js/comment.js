const commentHandler = async (event) => {
    event.preventDefault();
    console.log('attempting to comment!')
    const comment = document.querySelector('#comment-contents').value
    const id = document.querySelector('#postId').value
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            contents: comment,
            post_id: parseInt(id)
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.reload();
    } else {
        alert('comment failed.')
    }

}

document
    .querySelector('#comment-submit')
    .addEventListener('click', commentHandler)
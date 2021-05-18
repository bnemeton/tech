
const editPostFormHandler = async (event) => {

    event.preventDefault();
    console.log('editing post!')

    const title = document.querySelector('#edit-post-title').value.trim();
    const contents = document.querySelector('#edit-post-contents').value.trim();
    const id = document.querySelector('#postId').value
  
    if (title && contents) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            title: title,
            contents: contents
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dash');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('#edit-post-submit')
  .addEventListener('click', editPostFormHandler);

  const deletePostHandler = async (event) => {
    event.preventDefault()
    console.log('deleting post!')
    const id = document.querySelector('#postId').value
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    })
    document.location.replace('/dash')
  }

  document
    .querySelector('#delete-post')
    .addEventListener('click', deletePostHandler)
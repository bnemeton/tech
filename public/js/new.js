const newPostFormHandler = async (event) => {

    event.preventDefault();
    console.log('making post!')

    const title = document.querySelector('#new-post-title').value.trim();
    const contents = document.querySelector('#new-post-contents').value.trim();
  
    if (title && contents) {
      const response = await fetch('/api/posts', {
        method: 'POST',
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
  .querySelector('#new-post-submit')
  .addEventListener('click', newPostFormHandler);
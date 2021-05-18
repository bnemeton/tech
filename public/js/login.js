const loginHandler = async (event) => {
    event.preventDefault();
    console.log('attempting login!')

    const username = document.querySelector('#username-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('login failed.')
    }
}

document
    .querySelector('#login-submit')
    .addEventListener('click', loginHandler)
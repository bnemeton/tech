const logoutHandler = async (event) => {
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    })
    document.location.replace('/')
}

document
    .querySelector('#logout')
    .addEventListener('click', logoutHandler);
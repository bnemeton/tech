const signupFormHandler = async (event) => {
    console.log('signing up!')
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ 
            name: name,
            email: email,
            password: password }),
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
  .querySelector('#signup-form-submit')
  .addEventListener('click', signupFormHandler);
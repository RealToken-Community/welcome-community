
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();

    if (name === "" || email === "" || message === "") {
        alert('Please complete all fields.');
        return;
    }

    var formData = {
        name: name,
        email: email,
        message: message
    };

    fetch('https://script.google.com/macros/s/AKfycbx-7KFSSUyhdAGR0aumK9QoyRfpGQ3xmsZ4AzAnrJD8EEm7EAxSHr_Kd0k2Edf8QX-z/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        console.log('Message envoyé');
        alert('Your message is being sent.');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error sending message.');
    });
});
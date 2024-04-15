
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

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://safe-transaction-gnosis-chain.safe.global/api/v1/safes/0xeC247b0Ca0c1c84e3a5e5f55589AE3844e7c259a/balances/usd/?trusted=false&exclude_spam=false')
    .then(response => response.json())
    .then(data => {
        let dropdown = document.getElementById("tokenDropdown");
        dropdown.innerHTML = '<option value="" selected>Wallet balance</option>';
        data.forEach(item => {
            const tokenName = item.token ? item.token.name : 'xDai';
            const balance = Number(item.balance) / Math.pow(10, item.token ? item.token.decimals : 18);
            let option = document.createElement('option');
            option.textContent = `${tokenName}: ${balance.toFixed(2)}`;
            option.disabled = true;
            dropdown.appendChild(option);
        });
        dropdown.addEventListener('change', function() {this.selectedIndex = 0});
    })
    .catch(error => {
        console.error('Error fetching the wallet balance:', error);
        document.getElementById("tokenDropdown").textContent = 'Failed to fetch token balances.';
    });
});
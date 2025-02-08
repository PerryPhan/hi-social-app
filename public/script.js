// script.js
document.addEventListener('DOMContentLoaded', () => {
    const platformSelect = document.getElementById('platform');
    const recipientInput = document.getElementById('recipient');
    const messageTextarea = document.getElementById('message');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const apiResponsePre = document.getElementById('apiResponse');

    sendMessageButton.addEventListener('click', async () => {
        const platform = platformSelect.value;
        const recipient = recipientInput.value;
        const message = messageTextarea.value;

        if (!recipient || !message) {
            alert('Please enter a recipient and message.');
            return;
        }

        try {
            const response = await fetch(`/${platform}/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipient, message })
            });

            const data = await response.json();

            apiResponsePre.textContent = JSON.stringify(data, null, 2); // Pretty-print the JSON
        } catch (error) {
            console.error('Error:', error);
            apiResponsePre.textContent = `Error: ${error.message}`;
        }
    });
});
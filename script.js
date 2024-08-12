// Initialize click counters for each button
let yesClickCount = 0;
let noClickCount = 0;
const maxClicks = 3; // Maximum allowed clicks

document.getElementById('yesButton').addEventListener('click', () => {
    if (yesClickCount < maxClicks) {
        sendResponse('yes');
        yesClickCount++;
        updateButtonState('yesButton', '#45a049'); // Darker green
        updateButtonState('noButton', '#f44336'); // Red

        if (yesClickCount >= maxClicks) {
            document.getElementById('yesButton').disabled = true;
        }
    }
});

document.getElementById('noButton').addEventListener('click', () => {
    if (noClickCount < maxClicks) {
        sendResponse('no');
        noClickCount++;
        updateButtonState('noButton', '#e53935'); // Darker red
        updateButtonState('yesButton', '#4CAF50'); // Green

        if (noClickCount >= maxClicks) {
            document.getElementById('noButton').disabled = true;
        }
    }
});

function sendResponse(response) {
    fetch('http://localhost:3000/submit-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer: response })
    }).then(res => res.json())
    .then(data => {
        alert('Response submitted successfully!');
    }).catch(error => {
        console.error('Error:', error);
    });
}

function updateButtonState(buttonId, color) {
    document.getElementById(buttonId).style.backgroundColor = color;
}

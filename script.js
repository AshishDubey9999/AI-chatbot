// Enter key support
function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// MAIN FUNCTION (FIXED)
async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    let userText = inputField.value.trim();
    if (userText === "") return;

    // Show user message
    chatBox.innerHTML += `<div class="user-message">${userText}</div>`;

    // Typing indicator
    chatBox.innerHTML += `<div class="bot-message">Typing...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Get response
    let reply = await generateResponse(userText);

    // Remove typing
    chatBox.lastChild.remove();

    // Show bot reply
    chatBox.innerHTML += `<div class="bot-message">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    inputField.value = "";
}

// BACKEND CALL
async function generateResponse(input) {
    try {
        const res = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: input })
        });

        const data = await res.json();
        return data.reply;

    } catch (error) {
        return "Server error 😢";
    }
}
const socket = io();
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
	appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
	appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
	appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const message = messageInput.value;
	appendMessage(`You: ${message}`);
	socket.emit("send-chat-message", message);
	messageInput.value = "";
});

function appendMessage(message, date = new Date().toLocaleString()) {
	const messageElement = document.createElement("div");
	messageElement.innerHTML = message + " <br><small>" + date + "</small>";
	messageContainer.append(messageElement);
}
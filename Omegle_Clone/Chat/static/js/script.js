const roomName = 'test_room'
console.log('this is working')
const chatSocket = new WebSocket(`ws://127.0.0.1:8000/room/${roomName}/`)

// Handle WebSocket connection open
chatSocket.onopen = function(e){
    console.log('Websocket Connected')
}

// Handle messages received from WebSocket
chatSocket.onmessage = function(e){
    const data = JSON.parse(e.data)
    console.log("Message received:", data.message);
}

// Handle WebSocket connection close
chatSocket.onclose = function(e){
    console.log('Websocket Closed')
}// Function to send message via WebSocket


// Function to send message via WebSocket
function sendMessage(){
    console.log('function is working')
    const messageInput = document.getElementById('message_input').value
    console.log(messageInput)
    chatSocket.send(JSON.stringify({message: messageInput}))
}
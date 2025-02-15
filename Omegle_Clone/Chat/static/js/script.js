const roomName = 'test_room'
const chatSocket = new WebSocket(`ws://127.0.0.1:8000/room/${roomName}/`)

// Handle WebSocket connection open
chatSocket.onopen = function(e){
    console.log('Websocket Connected')
    return
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
    const messageInput = document.getElementById('message_input').value
    chatSocket.send(JSON.stringify({message: messageInput}))
}
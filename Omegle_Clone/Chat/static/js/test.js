let localStream;
let peerConnection;
const config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
      }
    ]
  };

// Get user's camera & microphoneP
async function startVideo(){
    try{
        localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true}) 
        document.getElementById('remoteVideo').srcObject = localStream
    }
    catch(error){
        console.error("Error accessing camera/microphone:", error);
    }

}

function createPeerConnection(){
    peerConnection = new RTCPeerConnection(config)  // config contains STUN servers (helps find each other's IP address).

    // Add local stream connection 
    localStream.getTrack().forEach(track => {
        peerConnection.addTrack(track,localStream)  // This adds your video & audio to the WebRTC connection.
    });

    // Handle when we receive a remote stream
    peerConnection.ontrack = (event) => {
        document.getElementById('remoteVideo').srcObject = event.streams[0]  // When the other user sends their video,show it on my screen.
    }

    return peerConnection
}

// Start video when the page loads
startVideo();


// ================== WebSocket for Chat ==================


let socket = new WebSocket(`ws://${window.location.host}/ws/chat/random/`); // Connect to WebSocket

socket.onopen = function () {
    console.log("Connected to WebSocket server!");
};

socket.onmessage = function (event) {
    let data = JSON.parse(event.data);
    console.log("Message received:", data);
    let chatBox = document.getElementById("chat_box");
    chatBox.value += `\n${data.message}`; // Append message to chat
};

socket.onclose = function () {
    console.log("WebSocket connection closed.");
};

// Send message when "Send" button is clicked
document.getElementById("button").addEventListener("click", function () {
    let message = document.getElementById("message_input").value;
    socket.send(JSON.stringify({ message: message })); // Send message
});
let localStream;
let peerConnection;
const config = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
      }
    ]
  };

// Get user's camera & microphone
async function startVideo(){
    try{
        localStream = navigator.mediaDevices.getUserMedia({video: true, audio: true}) 
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
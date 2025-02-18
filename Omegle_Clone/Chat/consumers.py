# Consumer file will help two user to exchange  messages (like SDP offers, answers, and ICE candidates) so they can establish a WebRTC connection.

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.accept()
    
    async def disconnect(self, code):
        pass
    
    async def message(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
    
# Consumer file will help two user to exchange  messages (like SDP offers, answers, and ICE candidates) so they can establish a WebRTC connection.

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass
    
    async def recieve(self, text_data):
        data = json.load(text_data)
        print(data)
        await self.send(text_data = json.dumps({'message': data['message']}))
    
    
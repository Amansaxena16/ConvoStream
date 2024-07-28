import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self): # Connect function will handle if user try to connect 
        self.romm_name = 'Test-Room' #  Room name
        
        await self.channel_layer.group_add( #group add function is used to add user in this room
            self.romm_name,
            self.channel_name
        )
        await self.accept() # used to accept the request
    
    async def disconnect(self, close_code): # this function is used when user try to disconnect 
        await self.channel_layer.group_discard(
            self.romm_name,
            self.channel_name
        )
        print('Disconnected!!')    
    
    async def recieve(self, text_data):
         # This method handles incoming WebSocket messages
        receive_data = json.loads(text_data) # converting json data into readble form
        message = receive_data['message']
        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
        
        async def chat_message(self, event):
            message = event['message']
            
            # Send message to WebSocket
            await self.send(text_data=json.dumps({
                'message': message
            }))
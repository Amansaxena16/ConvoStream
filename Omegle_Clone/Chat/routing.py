from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path("room/<str:room_name>/", ChatConsumer.as_asgi()) # web socket URL
]
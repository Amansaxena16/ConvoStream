# ASGI -> Tells Django to handle both normal web pages (HTTP) and WebSockets (real-time connections).
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from Chat.routing import websocket_urlpatterns

os. environ.setdefault("DJANGO_SETTINGS_MODULE","Omegle_Clone.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(), # Handles normal HTTP requests
        "websocket": URLRouter(websocket_urlpatterns)  
    }
)
    
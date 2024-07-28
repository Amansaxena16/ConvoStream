from django.urls import re_path
from . import consumers

webSocket_urlPattern = [
    re_path(r'', consumers.ChatConsumer.as_asgi()),
]
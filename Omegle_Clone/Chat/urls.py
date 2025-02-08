from django.urls import path
from .views import landingPage, room

urlpatterns = [
    path('', landingPage, name='landingPage'),
    path('room/<str:name>/', room, name='room'),
]

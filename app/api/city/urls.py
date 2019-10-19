from django.urls import path

from app.api.city import views

urlpatterns = [
    path('create', views.CityCreateAPIView.as_view(), name='api-city-create'),
]
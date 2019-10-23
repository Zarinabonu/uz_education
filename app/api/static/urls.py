from django.urls import path

from app.api.static import views

urlpatterns = [
    path('', views.Static_ListAPIView.as_view(), name='api-static'),
]
from django.urls import path

from app.api.region import views

urlpatterns = [
    path('create', views.RegionCreateAPIView.as_view(), name='api-region-create'),
]

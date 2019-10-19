from django.urls import path

from app.api.student import views

urlpatterns = [
    path('create', views.StudentCreateAPIView.as_view(), name='api-student-create'),
    path('update/<int:id>', views.StudentUpdateAPIView.as_view(), name='api-student-update'),
    path('destroy/<int:id>', views.StudentDestroyAPIView.as_view(), name='api-student-destroy'),
    path('list', views.StudentListAPIView.as_view(), name='api-student-list'),
]
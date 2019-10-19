from django.urls import path

from app.api.teacher import views

urlpatterns = [
    path('create', views.TeacherCreateAPIView.as_view(), name='api-teacher-create'),
    path('update/<int:id>', views.TeacherUpdateAPIView.as_view(), name='api-teacher-update'),
    path('destroy/<int:id>', views.TeacherDestroyAPIView.as_view(), name='api-teacher-destroy'),
    path('list', views.TeacherListAPIVIew.as_view(), name='api-teacher-list'),
]
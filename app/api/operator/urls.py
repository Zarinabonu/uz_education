from django.urls import path

from app.api.operator import views

urlpatterns = [
    path('create', views.OperatorCreateAPIView.as_view(), name='api-operator-create'),
    path('update/<int:id>', views.OperatorUpdateAPIView.as_view(), name='api-operator-update'),
    path('destroy/<int:id>', views.OperatorDestroyAPIView.as_view(), name='api-operator-destroy')
]

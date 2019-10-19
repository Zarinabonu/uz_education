from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.permissions import BasePermission

from app.api.teacher.serializers import TeacherSerializer, TeacherListSerializer
from app.model import Teacher


class TeacherCreateAPIView(CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class TeacherUpdateAPIView(UpdateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_url_kwarg = 'id'


class TeacherDestroyAPIView(DestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_url_kwarg = 'id'


class TeacherListAPIVIew(ListAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherListSerializer

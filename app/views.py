
from django.shortcuts import render
from django.views.generic import TemplateView

from app.model import Region, Teacher, Student


class Main(TemplateView):
    template_name = 'administrator/teacher/list.html'
    list = []

    def get_context_data(self, **kwargs):
        region = Region.objects.all()
        teacher = Teacher.objects.all()
        for t in teacher:
            name = t.f_name
            last = t.l_name
            middle = t.m_name
            full_n = name+' ' + last + ' ' + middle
            list = full_n
            print('FULL NAME:', list)

            context = {
                'region_id': region,
                'teachers': teacher,
                'full_name': list
            }
        return context


class CreateTeacher(TemplateView):
    template_name = 'administrator/teacher/create.html'

    def get_context_data(self, **kwargs):
        region = Region.objects.all()
        context = {
            'region_id': region
        }
        return context


class StudentList(TemplateView):
    template_name = 'administrator/student/list.html'

    def get_context_data(self, **kwargs):
        student = Student.objects.all()
        context = {
            'students': student
        }

        return context


# Create your views here.

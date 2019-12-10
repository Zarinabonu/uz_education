
from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from app.model import Region, Teacher, Student, City


class TeacherList(TemplateView):
    template_name = 'administrator/teacher/list.html'
    list = []

    def get_context_data(self, **kwargs):
        region = Region.objects.all()
        teacher = Teacher.objects.all()
        fio_search = self.request.GET.get('fio_search')
        work_place_search = self.request.GET.get('work_palce_search')
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
        if fio_search:
            teacher = teacher.get(get_full_name=fio_search)
            context = {
                'teachers': teacher,
            }
        elif work_place_search:
            teacher = teacher.get(work_place=work_place_search)
            context = {
                'teachers': teacher
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


class CreateStudent(TemplateView):
    template_name = 'administrator/student/create.html'

    def get_context_data(self, **kwargs):
        teacher = Teacher.objects.all()
        region = Region.objects.all()
        context = {
            'teacher_id': teacher,
            'region_id': region
        }
        return context


class StaticList(TemplateView):
    template_name = 'administrator/statistics/city.html'

    def get_context_data(self, **kwargs):
        teacher = Teacher.objects.all()
        cities = City.objects.all()
        context = {
            'teacher_id': teacher,
            'city': cities,
        }
        print('cities', cities)

        return context


# Create your views here.

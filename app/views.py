from datetime import datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView, ListView

from app.model import Region, Teacher, Student, Operator


class TeacherList(TemplateView):
    template_name = 'administrator/teacher/list.html'
    list = []

    def get_context_data(self, **kwargs):
        u = User.objects.get(username=self.request.user.username)
        o = Operator.objects.get(user=u)
        region = Region.objects.all()
        teacher = Teacher.objects.all()
        if not u.is_superuser:
            teacher = teacher.filter(region=o.region)
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
        u = User.objects.get(username=self.request.user.username)
        o = Operator.objects.get(user=u)
        region = Region.objects.all()
        if not o.user.is_superuser:
            region = region.filter(name=o.region.name)
        context = {
            'region_id': region
        }
        return context


class StudentList(TemplateView):
    template_name = 'administrator/student/list.html'

    def get_context_data(self, **kwargs):
        u = User.objects.get(username=self.request.user.username)
        o = Operator.objects.get(user=u)
        student = Student.objects.all()
        if not o.user.is_superuser:
            student = student.filter(region=o.region)
        context = {
            'students': student
        }

        return context


class CreateStudent(TemplateView):
    template_name = 'administrator/student/create.html'

    def get_context_data(self, **kwargs):
        u = User.objects.get(username=self.request.user.username)
        o = Operator.objects.get(user=u)
        teacher = Teacher.objects.all()
        region = Region.objects.all()
        if not o.user.is_superuser:
            teacher = teacher.filter(region=o.region)
        if not o.user.is_superuser:
            region = region.filter(name=o.region.name)
        context = {
            'teacher_id': teacher,
            'region_id': region
        }
        return context


class StaticList(TemplateView):
    template_name = 'administrator/statistics/card.html'

    def get_context_data(self, **kwargs):
        student_list = []
        teacher_list = []
        region_list = []
        region_name_list = []
        u = User.objects.get(username=self.request.user.username)
        o = Operator.objects.get(user=u)
        teacher = Teacher.objects.all()
        if not o.user.is_superuser:
            teacher = teacher.filter(region=o.region)
        teacher_all = teacher.count()
        student = Student.objects.all()
        if not o.user.is_superuser:
            student = student.filter(region=o.region)
        student_all = student.count()
        teacher_lat = teacher.filter(created__month=datetime.today().month)
        if not o.user.is_superuser:
            teacher_lat = teacher_lat.filter(region=o.region)
        teacher_latest = teacher_lat.count()
        student_lat = student.filter(start_date__month=datetime.today().month)
        if not o.user.is_superuser:
            student_lat = student_lat.filter(region=o.region)
        student_latest = student_lat.count()
        region = Region.objects.all()

        for r in region:
            teacher_zip_list = teacher.filter(region=r)
            teacher_list.append(teacher_zip_list)
            student_zip_list = student.filter(region=r)
            student_list.append(student_zip_list)
            region_list.append(r.id)
            region_name_list.append(r.name)

        response = [{'region':r_id, 'region_name':r_name , 'teacher_count':t_c, 'student_count':s_c} for r_id, r_name, t_c, s_c in zip(region_list, region_name_list, teacher_list, student_list)]
        print('STATISTIC:', response)

        context = {
            'teachers_all': teacher_all,
            'students_all': student_all,
            'teachers_latest': teacher_latest,
            'students_latest': student_latest,
            'statistic': response,
        }

        return context


class RegisterTemplate(TemplateView):
    template_name = 'register/index.html'

    def post(self, request):
        username = self.request.POST.get('username')
        password = self.request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        print('User1', username)
        print('User1', password)

        if user is not None:
            login(request, user)
            print('User2', user)
        return HttpResponseRedirect(reverse('teacher-list'))


class LogOut(View):
    def get(self, request):
        logout(request)
        return HttpResponse('200')

    # template_name = 'administrator/statistics/city.html'
    #
    # def get_context_data(self, **kwargs):
    #     t_list = []
    #     s_list = []
    #     region_list = []
    #     latest_stu_list = []
    #     latest_teach_list = []
    #     op = Operator.objects.get(user=self.request.user)
    #     regions = Region.objects.all()
    #     student = Student.objects.all()
    #     teacher = Teacher.objects.all()
    #     teacher_all = teacher.count()
    #     student_all = student.count()
    #     for r in regions:
    #         stu = student.filter(region=r).count()
    #         s_list.append(stu)
    #         tea = teacher.filter(region=r).count()
    #         t_list.append(tea)
    #         region_list.append(r.id)
    #     #s_list = t_list = region_list =range(20)
    #     r_list = list(zip(s_list, t_list,region_list))
    #     fields = ['students', 'teacher', 'id']
    #     dicts = [dict(zip(fields, l)) for l in r_list]
    #     dt = datetime.today().month
    #
    #     latest_student = student.filter(start_date__month=dt)
    #     latest_s_count = latest_student.count()
    #     latest_stu_list.append(latest_s_count)
    #     latest_teacher = teacher.filter(created__month=dt)
    #     latest_t_count = latest_teacher.count()
    #     latest_teach_list.append(latest_t_count)
    #
    #     latest_list = list(zip(latest_stu_list, latest_teach_list))
    #     fileds_latest = ['latest_stu', 'latest_teach']
    #     diction = [dict(zip(fileds_latest, f)) for f in latest_list]
    #
    #     print(dicts)
    #
    #     context = {
    #         'teacher_id': teacher,
    #         'student_id': student,
    #         'lists': dicts,
    #         'teachers_all': teacher_all,
    #         'students_all': student_all,
    #         'latest_students':latest_student,
    #         'latest_teachers': latest_teacher,
    #         'latest_count': diction,
    #     }
    #
    #
    #     # context['male_cnt'] = Teacher.objects.filter(work_place=op.institution, gender=0).count()

        # return context


# Create your views here.

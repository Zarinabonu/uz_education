from datetime import datetime

from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from app.model import Region, Teacher, Student, Operator


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
        t_list = []
        s_list = []
        region_list = []
        latest_stu_list = []
        latest_teach_list = []
        op = Operator.objects.get(user=self.request.user)
        regions = Region.objects.all()
        student = Student.objects.all()
        teacher = Teacher.objects.all()
        teacher_all = teacher.count()
        student_all = student.count()
        for r in regions:
            stu = student.filter(region=r).count()
            s_list.append(stu)
            tea = teacher.filter(region=r).count()
            t_list.append(tea)
            region_list.append(r)
        s_list = t_list = region_list =range(20)
        r_list = list(zip(s_list, t_list,region_list))
        fields = ['students', 'teacher', 'id']
        dicts = [dict(zip(fields, l)) for l in r_list]
        dt = datetime.today().month

        latest_student = student.filter(start_date__month=dt)
        latest_s_count = latest_student.count()
        latest_stu_list.append(latest_s_count)
        latest_teacher = teacher.filter(created__month=dt)
        latest_t_count = latest_teacher.count()
        latest_teach_list.append(latest_t_count)

        latest_list = list(zip(latest_stu_list, latest_teach_list))
        fileds_latest = ['latest_stu', 'latest_teach']
        diction = [dict(zip(fileds_latest, f)) for f in latest_list]

        print(dicts)

        context = {
            'teacher_id': teacher,
            'student_id': student,
            'lists': dicts,
            'teachers_all': teacher_all,
            'students_all': student_all,
            'latest_students':latest_student,
            'latest_teachers': latest_teacher,
            'latest_count': diction,
        }


        # context['male_cnt'] = Teacher.objects.filter(work_place=op.institution, gender=0).count()

        return context


# Create your views here.

from datetime import datetime

from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer

from app.model import Teacher, Student, Region


class RegionSerializer(ModelSerializer):
    teacher_count = serializers.SerializerMethodField()
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Region
        fields = ('id',
                  'name',
                  'teacher_count',
                  'student_count',
                  )

    def get_teacher_count(self, obj):
        qs = Teacher.objects.filter(region_id=obj)
        return qs.count()

    def get_student_count(self,obj):
        qs = Student.objects.filter(region_id=obj)
        return qs.count()


class StaticSerializer(Serializer):
    teacher = serializers.SerializerMethodField(source='get_teacher')
    student = serializers.SerializerMethodField(source='get_student')
    new_employee = serializers.SerializerMethodField(source='get_new_employee')
    new_student = serializers.SerializerMethodField(source='get_new_student')
    month_employee = serializers.SerializerMethodField(source='get_month_employee')
    month_student = serializers.SerializerMethodField(source='get_month_student')
    region_teacher = serializers.SerializerMethodField(source='get_region_teacher')


    def get_teacher(self, obj):
        return Teacher.objects.all().count()

    def get_student(self, obj):
        return Student.objects.all().count()

    def get_new_employee(self, obj):
        return Teacher.objects.filter(created=datetime.today()).count()

    def get_new_student(self, obj):
        return Student.objects.filter(created=datetime.today()).count()

    def get_month_employee(self, obj):
        return Teacher.objects.filter(created__month=datetime.now().month).count()

    def get_month_student(self, obj):
        return Student.objects.filter(created__month=datetime.now().month).count()

    def get_region_teacher(self, obj):
        qs = Region.objects.all()
        return RegionSerializer(qs, many=True, context=self.context).data

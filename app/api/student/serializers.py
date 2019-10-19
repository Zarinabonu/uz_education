from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, raise_errors_on_nested_writes

from app.api.region.serializers import RegionSerializer
from app.api.teacher.serializers import TeacherSerializer
from app.model import Student, Teacher


class StudentSerializer(ModelSerializer):
    teacher_id = TeacherSerializer(read_only=True)
    teacher_id_id = serializers.IntegerField(write_only=True)
    region_id = RegionSerializer(read_only=True)
    region_id_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Student
        fields = ('f_name',
                  'l_name',
                  'm_name',
                  'passport_series',
                  'phone',
                  'start_date',
                  'finish_date',
                  'teacher_id',
                  'teacher_id_id',
                  'region_id',
                  'region_id_id')

    def update(self, instance, validated_data):
        raise_errors_on_nested_writes('update', self, validated_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance


class TeacherListSerializer(ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id',
                  'f_name',
                  'l_name',
                  'm_name',
                  'work_place',
                  'passport_series',
                  'phone')


class StudentListSerializer(ModelSerializer):
    region_id = RegionSerializer()
    teacher_id = TeacherListSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ('id',
                  'f_name',
                  'l_name',
                  'm_name',
                  'passport_series',
                  'phone',
                  'created',
                  'start_date',
                  'finish_date',
                  'region_id',
                  'teacher_id',
                  )
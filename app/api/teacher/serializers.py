from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, raise_errors_on_nested_writes

from app.api.region.serializers import RegionSerializer
from app.model import Teacher, Student


class TeacherSerializer(ModelSerializer):
    region_id = RegionSerializer(read_only=True)
    region_id_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Teacher
        fields = ('region_id',
                  'f_name',
                  'l_name',
                  'm_name',
                  'work_place',
                  'passport_series',
                  'phone',
                  'region_id',
                  'region_id_id')

    def update(self, instance, validated_data):
        raise_errors_on_nested_writes('update', self, validated_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        return instance


class StudentListSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ('id',
                  'f_name',
                  'l_name',
                  'm_name',
                  'passport_series',
                  'phone',
                  'start_date',
                  'finish_date')


class TeacherListSerializer(ModelSerializer):
    region_id = RegionSerializer()
    student_set = StudentListSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ('id',
                  'region_id',
                  'f_name',
                  'l_name',
                  'm_name',
                  'work_place',
                  'passport_series',
                  'phone',
                  'student_set',
                  )
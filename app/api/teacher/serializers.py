from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, raise_errors_on_nested_writes

from app.api.region.serializers import RegionSerializer
from app.model import Teacher, Student, Region


class TeacherSerializer(ModelSerializer):
    region = RegionSerializer(read_only=True)
    region_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Teacher
        fields = ('f_name',
                  'l_name',
                  'm_name',
                  'work_place',
                  'passport_series',
                  'phone',
                  'region',
                  'region_id')

    # def create(self, validated_data):
    #     request = self.context['request']
    #     if request.POST.get('region'):
    #         validated_data['reqion'] = Region.objects.get(id=request.POST.get('region_id'))
    #     return  super().create(validated_data)

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
    region = RegionSerializer(read_only=True)
    student_set = StudentListSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = ('id',
                  'region',
                  'f_name',
                  'l_name',
                  'm_name',
                  'work_place',
                  'passport_series',
                  'phone',
                  'student_set',
                  )
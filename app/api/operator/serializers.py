from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, raise_errors_on_nested_writes

from app.api.city.serializers import CitySerializer
from app.model import Operator


class OperatorSerializer(ModelSerializer):
    city = CitySerializer(read_only=True)
    city_id = serializers.IntegerField(write_only=True)
    first_name = serializers.CharField(max_length=100, write_only=True)
    last_name = serializers.CharField(max_length=100, write_only=True)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Operator
        fields = ('username',
                  'password',
                  'first_name',
                  'last_name',
                  'm_name',
                  'phone',
                  'city',
                  'city_id',
                  )

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        firstname = validated_data.pop('first_name')
        lastname = validated_data.pop('last_name')

        o = Operator(**validated_data)
        u = User.objects.create(username=username, first_name=firstname, last_name=lastname)
        u.set_password(password)
        u.save()
        o.user_id = u
        o.save()
        return o

    def update(self, instance, validated_data):
        raise_errors_on_nested_writes('update', self, validated_data)

        if validated_data.get('password'):
            if(validated_data.get('password')=='*'):
                p = validated_data.pop('password')
            else:
                instance.user_id.set_password(validated_data.get('password'))
        for attr, value in validated_data.items():
            setattr(instance.user_id, attr, value)
            setattr(instance, attr, value)

        instance.user_id.save()
        instance.save()

        return instance

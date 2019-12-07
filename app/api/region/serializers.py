from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from app.api.city.serializers import CitySerializer
from app.model import Region


class RegionSerializer(ModelSerializer):
    city = CitySerializer(read_only=True)
    city_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Region
        fields = ('city',
                  'city_id',
                  'name',
                  )
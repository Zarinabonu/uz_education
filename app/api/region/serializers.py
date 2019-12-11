from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from app.model import Region


class RegionSerializer(ModelSerializer):

    class Meta:
        model = Region
        fields = ('name',
                  )
from rest_framework.serializers import ModelSerializer

from app.model import City


class CitySerializer(ModelSerializer):
    class Meta:
        model = City
        fields = ('name',
                  )

from rest_framework.generics import CreateAPIView

from app.api.city.serializers import CitySerializer
from app.model import City


class CityCreateAPIView(CreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
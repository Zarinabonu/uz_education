from rest_framework.generics import CreateAPIView

from app.api.region.serializers import RegionSerializer
from app.model import Region


class RegionCreateAPIView(CreateAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
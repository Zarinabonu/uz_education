from rest_framework.views import APIView
from rest_framework.response import Response

from app.api.static.serializers import StaticSerializer


class Static_ListAPIView(APIView):
    def get(self, request):
        list = []
        list.append(request.user)
        serializer = StaticSerializer(list, many=False)
        serializer.context['request'] = request
        return Response(serializer.data)


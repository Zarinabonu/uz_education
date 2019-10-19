from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAdminUser

from app.api.operator.serializers import OperatorSerializer
from app.model import Operator


class OperatorCreateAPIView(CreateAPIView):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer
    permission_classes = [IsAdminUser]


class OperatorUpdateAPIView(UpdateAPIView):
    lookup_url_kwarg = 'id'
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer
    permission_classes = [IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class OperatorDestroyAPIView(DestroyAPIView):
    lookup_url_kwarg = 'id'
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer
    permission_classes = [IsAdminUser]

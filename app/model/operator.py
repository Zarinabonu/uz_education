from django.db import models

from app.model.city import City
from django.contrib.auth.models import User


class Operator(models.Model):
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    m_name = models.TextField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)

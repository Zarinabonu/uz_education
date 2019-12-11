from django.db import models

from django.contrib.auth.models import User
from app.model import Region


class Operator(models.Model):
    region = models.ForeignKey(Region,on_delete=models.SET_NULL, null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    m_name = models.TextField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)

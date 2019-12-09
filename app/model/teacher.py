from django.contrib.auth.models import User
from django.db import models

from app.model.region import Region


class Teacher(models.Model):
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)
    f_name = models.TextField(null=True, blank=True)
    l_name = models.TextField(null=True, blank=True)
    m_name = models.TextField(null=True, blank=True)
    work_place = models.TextField(null=True, blank=True)
    passport_series = models.TextField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    created = models.DateField(auto_now_add=True)

    @property
    def get_full_name(self):
        return self.f_name + ' ' + self.l_name + ' ' + self.m_name




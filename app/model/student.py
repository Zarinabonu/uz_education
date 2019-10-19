from django.db import models

from app.model.region import Region
from app.model.teacher import Teacher


class Student(models.Model):
    teacher_id = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    region_id = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)
    f_name = models.TextField(null=True, blank=True)
    l_name = models.TextField(null=True, blank=True)
    m_name = models.TextField(null=True, blank=True)
    passport_series = models.TextField(null=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    start_date = models.DateField()
    finish_date = models.DateField(null=True, blank=True)
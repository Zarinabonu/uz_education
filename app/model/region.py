from django.db import models

from app.model.city import City


class Region(models.Model):
    city_id = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    name = models.TextField(null=True, blank=True)

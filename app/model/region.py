from django.db import models


class Region(models.Model):
    name = models.TextField(null=True, blank=True)

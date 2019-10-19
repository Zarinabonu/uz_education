from django.contrib import admin
from .model import City, Region, Operator, Student, Teacher


admin.site.register(City)
admin.site.register(Region)
admin.site.register(Operator)
admin.site.register(Student)
admin.site.register(Teacher)
# Register your models here.

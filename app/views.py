
from django.shortcuts import render
from django.views.generic import TemplateView

from app.model import Region


class Main(TemplateView):
    template_name = 'administrator/teacher/create.html'

    def get_context_data(self, **kwargs):
        region = Region.objects.all()
        context = {
            'region_id': region
        }
        return context


# Create your views here.

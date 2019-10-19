from django.urls import include, path

urlpatterns = [
    path('operator/', include('app.api.operator.urls')),
    path('city/', include('app.api.city.urls')),
    path('region/', include('app.api.region.urls')),
    path('teacher/', include('app.api.teacher.urls')),
    path('student/', include('app.api.student.urls')),

]
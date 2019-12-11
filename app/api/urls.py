from django.urls import include, path

urlpatterns = [
    path('operator/', include('app.api.operator.urls')),
    path('region/', include('app.api.region.urls')),
    path('teacher/', include('app.api.teacher.urls')),
    path('student/', include('app.api.student.urls')),
    path('static/', include('app.api.static.urls')),

]
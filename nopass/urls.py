from django.urls import path

from nopass import views

urlpatterns = [
    path("api/nopass/send/",views.send_login),
    path("api/nopass/<uidb64>/<token>/",views.complete_login),
]
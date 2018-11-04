from django.urls import path

from nopass import views

urlpatterns = [
    path("api/nopass/create/",views.create_account),
    path("api/nopass/change_email/",views.change_email),
    path("api/nopass/send/",views.send_login),
    path("api/nopass/<uidb64>/<token>/",views.complete_login),
]
from django.urls import path

from nopass import views

urlpatterns = [
    path("api/nopass/create/",views.create_account),
    path("api/nopass/change_email/",views.change_email),
    path("api/nopass/send/",views.send_login),
    path("bad_token/",views.bad_token,name="bad_token"),
    path("api/nopass/<uidb64>/<token>/",views.complete_login,name="nopass_login"),
]
from django.contrib import admin
from django.urls import path, re_path, include
from graphene_django.views import GraphQLView

import client.views
import main.views

urlpatterns = [
    path("api/vote/",main.views.vote),
    path("api/attendance/",main.views.attendance),
    path('admin/', admin.site.urls),
    path('graphql', GraphQLView.as_view(graphiql=True)),
    path('api/login/', main.views.ajax_login),
    path('api/logout/', main.views.ajax_logout),
    path('500.html', main.views.fivehundred),
    path('',include('nopass.urls')),
    re_path("^$", client.views.index),
    re_path("^(auth|help|schedule|vote|talk)/", client.views.index),
]

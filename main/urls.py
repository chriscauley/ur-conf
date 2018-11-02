from django.contrib import admin
from django.urls import path, re_path, include
from graphene_django.views import GraphQLView

import client.views
import main.views

urlpatterns = [
    path("api/vote/",main.views.vote),
    path('admin/', admin.site.urls),
    path('graphql', GraphQLView.as_view(graphiql=True)),
    path('api/login/', main.views.ajax_login),
    path('api/logout/', main.views.ajax_logout),
    path('',include('nopass.urls')),
    re_path("^$", client.views.index),
    re_path("^(help|schedule|vote/?.*)/$", client.views.index),
]

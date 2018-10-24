from django.contrib import admin
from django.urls import path, re_path
from graphene_django.views import GraphQLView

import client.views
import main.views

urlpatterns = [
    path("api/vote/",main.views.vote),
    path('admin/', admin.site.urls),
    path('graphql', GraphQLView.as_view(graphiql=True)),
    re_path("", client.views.index),
]

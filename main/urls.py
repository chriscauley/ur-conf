from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.contrib.auth.decorators import login_required

import client.views
import main.views

urlpatterns = [
    path("api/vote/",main.views.vote),
    path('admin/', admin.site.urls),
    path('graphql', login_required(GraphQLView.as_view(graphiql=True))),
    path("", client.views.index),
]

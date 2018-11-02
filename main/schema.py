import graphene
from graphene_django import DjangoObjectType

from django.contrib.auth.models import User
from main.models import Room, TimeSlot, Author, Talk, TalkVote, TalkAttendance
from main.types import UserType, RoomType, TimeSlotType, AuthorType, TalkType, TalkVoteType, TalkAttendanceType


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)
    rooms = graphene.List(RoomType)
    timeslots = graphene.List(TimeSlotType)
    authors = graphene.List(AuthorType)
    talks = graphene.List(TalkType)
    talkvotes = graphene.List(TalkVoteType)
    talkattendance = graphene.Field(TalkAttendanceType)

    def resolve_user(self,info):
        if not info.context.user.is_authenticated:
            return
        return info.context.user

    def resolve_talks(self,info):
        return Talk.objects.all().prefetch_related("authors")

    def resolve_rooms(self,info):
        return Room.objects.all()

    def resolve_timeslots(self,info):
        return TimeSlot.objects.all()

    def resolve_talkvotes(self,info):
        if not info.context.user.is_authenticated:
            return []
        return TalkVote.objects.filter(user=info.context.user)

    def resolve_authors(self,info):
        return Author.objects.all()


schema = graphene.Schema(query=Query)
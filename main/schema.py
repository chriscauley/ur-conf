import graphene
from graphene_django import DjangoObjectType

from django.contrib.auth.models import User
from main.models import Room, TimeSlot, Author, Talk, TalkVote, TalkAttendance
from main.types import (
    UserType,
    RoomType,
    TimeSlotType,
    AuthorType,
    TalkType,
    TalkVoteType,
    TalkAttendanceType,
)


_id = 1


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)
    rooms = graphene.List(RoomType)
    timeslots = graphene.List(TimeSlotType)
    authors = graphene.List(AuthorType)
    talks = graphene.List(TalkType)
    talkvotes = graphene.List(TalkVoteType)
    talkattendances = graphene.List(TalkAttendanceType)

    def resolve_user(self, info):
        if not info.context.user.is_authenticated:
            return
        return info.context.user

    def resolve_talks(self, info):
        return Talk.objects.filter(conference_id=_id).prefetch_related("authors")

    def resolve_rooms(self, info):
        return Room.objects.filter(conference_id=_id)

    def resolve_timeslots(self, info):
        return TimeSlot.objects.filter(conference_id=_id)

    def resolve_talkvotes(self, info):
        if not info.context.user.is_authenticated:
            return []
        return TalkVote.objects.filter(user=info.context.user)

    def resolve_talkattendances(self, info):
        if not info.context.user.is_authenticated:
            return []
        return TalkAttendance.objects.filter(user=info.context.user)

    def resolve_authors(self, info):
        return Author.objects.filter(conference_id=_id)


schema = graphene.Schema(query=Query)

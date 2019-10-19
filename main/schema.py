import graphene
from graphene_django import DjangoObjectType

from django.contrib.auth.models import User
from main.models import (
    Conference,
    Room,
    TimeSlot,
    Author,
    Talk,
    TalkVote,
    TalkAttendance,
    Location,
)
from main.types import (
    ConferenceType,
    UserType,
    RoomType,
    TimeSlotType,
    AuthorType,
    TalkType,
    TalkVoteType,
    TalkAttendanceType,
    LocationType,
)


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)
    conferences = graphene.List(ConferenceType)
    conference = graphene.Field(ConferenceType, year=graphene.Int())
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

    def resolve_conference(self, info, year=None):
        return Conference.objects.get(date__year=year)

    def resolve_conferences(self, info):
        return Conference.objects.all()

    def resolve_talkvotes(self, info):
        if not info.context.user.is_authenticated:
            return []
        return TalkVote.objects.filter(user=info.context.user)

    def resolve_talkattendances(self, info):
        if not info.context.user.is_authenticated:
            return []
        return TalkAttendance.objects.filter(user=info.context.user)


schema = graphene.Schema(query=Query)

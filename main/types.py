import graphene
from graphene_django import DjangoObjectType
from graphene.types import generic

from django.contrib.auth.models import User
from main.models import (
    Conference,
    Room,
    TimeSlot,
    Author,
    Talk,
    TalkVote,
    TalkAttendance,
    Achievement,
    UserAchievement,
    Location,
)


class LocationType(DjangoObjectType):
    geometry = generic.GenericScalar()

    class Meta:
        model = Location


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ConferenceType(DjangoObjectType):
    class Meta:
        model = Conference
        filter_fields = ["id"]


class RoomType(DjangoObjectType):
    geometry = generic.GenericScalar()

    class Meta:
        model = Room


class TimeSlotType(DjangoObjectType):
    class Meta:
        model = TimeSlot


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author


class TalkType(DjangoObjectType):
    room_id = graphene.Int(source="room_id")
    timeslot_id = graphene.Int(source="timeslot_id")

    class Meta:
        model = Talk


class TalkVoteType(DjangoObjectType):
    talk_id = graphene.Int(source="talk_id")
    vote = graphene.Int(source="vote")
    pk = graphene.Int(source="pk")

    class Meta:
        model = TalkVote


class TalkAttendanceType(DjangoObjectType):
    talk_id = graphene.Int(source="talk_id")

    class Meta:
        model = TalkAttendance


class UserAchievementType(DjangoObjectType):
    class Meta:
        model = UserAchievement


class AchievementType(DjangoObjectType):
    class Meta:
        model = Achievement

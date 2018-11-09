import graphene
from graphene_django import DjangoObjectType

from django.contrib.auth.models import User
from main.models import (
    Room,
    TimeSlot,
    Author,
    Talk,
    TalkVote,
    TalkAttendance,
    Achievement,
    UserAchievement
)


class UserType(DjangoObjectType):
    class Meta:
        model = User

class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class TimeSlotType(DjangoObjectType):
    class Meta:
        model = TimeSlot


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author


class TalkType(DjangoObjectType):
    room_id = graphene.Int(source='room_id')
    timeslot_id = graphene.Int(source='timeslot_id')
    class Meta:
        model = Talk


class TalkVoteType(DjangoObjectType):
    talk_id = graphene.Int(source='talk_id')
    vote = graphene.Int(source="vote")
    pk = graphene.Int(source='pk')
    class Meta:
        model = TalkVote


class TalkAttendanceType(DjangoObjectType):
    talk_id = graphene.Int(source='talk_id')
    class Meta:
        model = TalkAttendance

class UserAchievementType(DjangoObjectType):
    class Meta:
        model = UserAchievement

class AchievementType(DjangoObjectType):
    class Meta:
        model = Achievement
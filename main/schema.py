import graphene
from graphene_django import DjangoObjectType

from main.models import Room, TimeSlot, Author, Talk, TalkVote, TalkAttendance


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
    class Meta:
        model = TalkVote


class TalkAttendanceType(DjangoObjectType):
    class Meta:
        model = TalkAttendance


class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType)
    timeslots = graphene.List(TimeSlotType)
    authors = graphene.List(AuthorType)
    talks = graphene.List(TalkType)
    talkvotes = graphene.List(TalkVoteType)
    talkattendance = graphene.Field(TalkAttendanceType)

    def resolve_talks(self,info):
        return Talk.objects.all().prefetch_related("authors")

    def resolve_rooms(self,info):
        return Room.objects.all()

    def resolve_timeslots(self,info):
        return TimeSlot.objects.all()

    def resolve_talkvotes(self,info):
        return TalkVote.objects.filter(user=info.context.user)

    def resolve_authors(self,info):
        return Author.objects.all()


schema = graphene.Schema(query=Query)
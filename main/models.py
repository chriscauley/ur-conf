from django.conf import settings
from django.db import models


class Room(models.Model):
    name = models.CharField(max_length=32)
    def __str__(self):
        return self.name


class TimeSlot(models.Model):
    datetime = models.DateTimeField()
    def __str__(self):
        return self.datetime


class Author(models.Model):
    name = models.CharField(max_length=64)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)
    contact_info = models.CharField(max_length=64,null=True,blank=True)
    def __str__(self):
        return self.name


class Talk(models.Model):
    title = models.CharField(max_length=256)
    authors = models.ManyToManyField(Author)
    description = models.TextField(blank=True)
    room = models.ForeignKey(Room,on_delete=models.SET_NULL,null=True,blank=True)
    timeslot = models.ForeignKey(TimeSlot,on_delete=models.SET_NULL,null=True,blank=True)
    external_id = models.CharField(max_length=32,null=True,blank=True)
    external_url = models.CharField(max_length=512,null=True,blank=True)
    def __str__(self):
        return self.title


class TalkVote(models.Model):
    VOTE_CHOICES = [
        (-1, "No"),
        (0, "Maybe"),
        (1, "Yes"),
    ]
    talk = models.ForeignKey(Talk,on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES)


class TalkAttendance(models.Model):
    talk = models.ForeignKey(Talk,on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)

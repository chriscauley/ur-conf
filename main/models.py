from django.conf import settings
from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=32)

class TimeSlot(models.Model):
    time = models.TimeField()

class Author(models.Model):
    name = models.CharField(max_length=64)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)

class Talk(models.Model):
    title = models.CharField(max_length=256)
    author = models.ForeignKey(Author,on_delete=models.SET_NULL,null=True,blank=True)

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

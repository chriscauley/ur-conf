from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import JSONField


class Conference(models.Model):
    name = models.CharField(max_length=256)
    external_id = models.CharField(max_length=32, null=True, blank=True)
    date = models.DateField()
    locations = models.ManyToManyField("Location")

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=128)
    geometry = JSONField(default=dict)

    def __str__(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=256)
    slug = models.CharField(max_length=256)
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, null=True, blank=True
    )
    geometry = JSONField(default=dict)

    def __str__(self):
        return f"{self.name} ({self.conference})"

def _lazy_room(name, **kwargs):
    #print(name,Room.objects.filter(name=name,**kwargs))
    kwargs["defaults"] = { 'name': name }
    slug = name.replace(" ","").lower()
    return Room.objects.get_or_create(slug=slug, **kwargs)


class TimeSlot(models.Model):
    class Meta:
        ordering = ("datetime",)

    datetime = models.DateTimeField()
    endtime = models.DateTimeField(null=True, blank=True)
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)

    class Meta:
        ordering = ("datetime",)

    def __str__(self):
        return str(self.datetime)


class Author(models.Model):
    name = models.CharField(max_length=256)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    contact_info = models.CharField(max_length=64, null=True, blank=True)
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Talk(models.Model):
    conference = models.ForeignKey(Conference, on_delete=models.PROTECT)
    title = models.CharField(max_length=256)
    authors = models.ManyToManyField(Author, blank=True)
    description = models.TextField(blank=True)
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True)
    timeslot = models.ForeignKey(
        TimeSlot, on_delete=models.SET_NULL, null=True, blank=True
    )
    external_id = models.CharField(max_length=32, null=True, blank=True)
    external_url = models.CharField(max_length=512, null=True, blank=True)
    sortable = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class TalkVote(models.Model):
    VOTE_CHOICES = [(-1, "No"), (0, "Maybe"), (1, "Yes")]
    talk = models.ForeignKey(Talk, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES)


class TalkAttendance(models.Model):
    talk = models.ForeignKey(Talk, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    timeslot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    modofied = models.DateTimeField(auto_now=True)
    conference = models.ForeignKey(Conference, on_delete=models.CASCADE)


SLUG_CHOICES = [
    "vote_one",
    "vote_all",
    "attend_one",
    "attend_all",
    "all_yes",
    "all_maybe",
    "all_no",
    "all_yesno",
    "all_yesmaybe",
    "all_maybeno",
]

SLUG_CHOICES = zip(SLUG_CHOICES, SLUG_CHOICES)


class Achievement(models.Model):
    slug = models.CharField(max_length=16, choices=SLUG_CHOICES)
    title = models.CharField(max_length=64)
    text = models.CharField(max_length=128)
    class_name = models.CharField(max_length=32)
    order = models.IntegerField(default=999)

    class Meta:
        ordering = ("order",)

    def __str__(self):
        return self.title


class UserAchievement(models.Model):
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}: {}".format(self.user, self.achievement)

    class Meta:
        unique_together = ("user", "achievement")

from django.contrib import admin

from main import models


@admin.register(models.Conference)
class ConfernceAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Location)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("__str__", "talk_count")

    def talk_count(self, obj):
        return obj.talk_set.all().count()


@admin.register(models.TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ("__str__", "conference")
    list_filter = ("conference",)


@admin.register(models.Author)
class AuthorAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Talk)
class TalkAdmin(admin.ModelAdmin):
    list_display = ("title", "room", "timeslot")
    list_filter = ("room", "timeslot", "conference")


@admin.register(models.TalkVote)
class TalkVoteAdmin(admin.ModelAdmin):
    pass


@admin.register(models.TalkAttendance)
class TalkAttendanceAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "text", "slug", "class_name")
    list_editable = ("order", "text")


@admin.register(models.UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    pass

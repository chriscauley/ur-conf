from django.contrib import admin

from main import models

@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    pass

@admin.register(models.TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Author)
class AuthorAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Talk)
class TalkAdmin(admin.ModelAdmin):
    pass

@admin.register(models.TalkVote)
class TalkVoteAdmin(admin.ModelAdmin):
    pass

@admin.register(models.TalkAttendance)
class TalkAttendanceAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title','order','text','slug','class_name')
    list_editable = ('order',)

@admin.register(models.UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    pass

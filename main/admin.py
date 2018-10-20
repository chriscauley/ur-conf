from django.contrib import admin

from main.models import Room, TimeSlot, Author, Talk, TalkVote, TalkAttendance

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    pass

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    pass

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    pass

@admin.register(Talk)
class TalkAdmin(admin.ModelAdmin):
    pass

@admin.register(TalkVote)
class TalkVoteAdmin(admin.ModelAdmin):
    pass

@admin.register(TalkAttendance)
class TalkAttendanceAdmin(admin.ModelAdmin):
    pass

from django.core.management.base import BaseCommand

from main.models import Talk
from collections import defaultdict

class Command(BaseCommand):
    def handle(self,*args,**kwargs):
        talks = Talk.objects.all()
        slot_room_talks = defaultdict(lambda: defaultdict(list))
        for talk in talks:
            if slot_room_talks[talk.timeslot_id][talk.room_id]:
                print(talk.timeslot,'already has a talk in',talk.room)
            slot_room_talks[talk.timeslot_id][talk.room_id] = talk
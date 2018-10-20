import os,django;os.environ['DJANGO_SETTINGS_MODULE'] = 'main.settings'; django.setup()

from django.conf import settings
from bs4 import BeautifulSoup
import arrow
from dateutil import tz

from main.models import Author, Talk, Room, TimeSlot

with open("bc2017.html","r") as f:
    text = f.read()

soup = BeautifulSoup(text,'html.parser')

times = [
    '09:45 AM',
    '10:15 AM',
    '11:15 AM',
    '12:15 PM',
    '01:00 PM',
    '02:15 PM',
    '03:15 PM',
    '04:15 PM',
    '05:15 PM',
]

timeslots = []

for time in times:
    a = arrow.get("2017-10-14 " + time)
    a = a.replace(tzinfo=tz.gettz("US/Eastern"))
    if a.hour<6:
        a = a.shift(hours=12)
    ts,new = TimeSlot.objects.get_or_create(datetime=a.datetime)
    timeslots.append(ts)

for row in soup.findAll("tr",{"class":"sorting"}):
    room, new = Room.objects.get_or_create(name=row.find("th").text.strip())
    if new:
        print('Room created',room.name)
    for i,div in enumerate(row.findAll("div")):
        text = div.text.strip()
        if not text:
            # nothing in this slot
            continue
        title = div.find("a").text.strip()
        authors = text.replace(title,"").strip()
        authors = authors.replace(" and ",",").replace("&",",")
        authors = [a.strip() for a in authors.split(",")]
        authors = [Author.objects.get_or_create(
            name=name
        )[0] for name in authors]
        talk, new = Talk.objects.get_or_create(
            title=title,
            timeslot=timeslots[i],
            room=room,
        )
        [talk.authors.add(a) for a in authors]
        if new:
            print("new talk",talk)
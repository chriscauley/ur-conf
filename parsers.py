import os,django;os.environ['DJANGO_SETTINGS_MODULE'] = 'main.settings'; django.setup()

from django.conf import settings
from bs4 import BeautifulSoup
import arrow
import re
import requests
from dateutil import tz

from main.models import Author, Talk, Room, TimeSlot, Conference

with open(".bc/2017.html","r") as f:
    text = f.read()

URLS = {
    'presentation': "http://s.barcampphilly.org/presentations/",
    'conference': 'http://s.barcampphilly.org/events/18/event_dates/',
}

# these appear to be global
TIMES = [
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

def curl(key,_id,name):
    url = URLS[key]+str(_id)
    fname = os.path.join(".bc","{}.html".format(name))
    if not os.path.exists(fname):
        text = requests.get(url).text
        with open(fname,'w') as _file:
            _file.write(text)
        print("downloading!",url)
        return text
    with open(fname,'r') as _file:
        return _file.read()

CONFERENCE_YEARS = list(zip(
    range(17,23),
    [2011,2013,2014,2015,2016,2017]
))

YEARS = [2017]
DESCRIPTION_INDEX = 2

for _id, year in list(CONFERENCE_YEARS):
    if not year in YEARS:
        continue
    text = curl('conference',_id,year)
    date_string = re.findall("({}-..-..)".format(year),text)[-1]
    soup = BeautifulSoup(text,'html.parser')
    conference,_new = Conference.objects.get_or_create(
        external_id=_id,
        date=date_string,
        name="BarCamp {}".format(year)
    )
    if _new:
        print("New conference",date_string)
    timeslots = []

    for time in TIMES:
        a = arrow.get(date_string+" " + time)
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
            anchor = div.find("a")
            title = anchor.text.strip()
            url = anchor.attrs['href']
            external_id = int(url.split("/")[-1])
            authors = text.replace(title,"").strip()
            authors = authors.replace(" and ",",").replace("&",",")
            authors = [a.strip() for a in authors.split(",")]
            authors = [Author.objects.get_or_create(
                name=name
            )[0] for name in authors]
            talk_text = curl("presentation",external_id,"p{}".format(external_id))

            talk_soup = BeautifulSoup(talk_text,'html.parser')
            for ic,div in enumerate(talk_soup.findAll("div",{"class":"field"})):
                if "Description:" in str(div) and ic != DESCRIPTION_INDEX:
                    raise NotImplemented

            talk_fields = talk_soup.findAll("div",{"class":"field"})
            description = talk_fields[DESCRIPTION_INDEX].text
            description = description.replace("Description:","").strip()
            defaults = dict(
                title=title,
                timeslot=timeslots[i],
                room=room,
                external_url=url,
                description=description,
            )
            talk, new = Talk.objects.get_or_create(
                external_id=external_id,
                conference=conference,
                defaults=defaults
            )
            for key,value in defaults.items():
                setattr(talk,key,value)
            talk.save()
            [talk.authors.add(a) for a in authors]
            if new:
                print("new talk",talk)
from django.conf import settings
from bs4 import BeautifulSoup
import arrow
import re
import requests
import sys

from main.models import Author, Talk, Room, Conference, _lazy_room
from spider import var
from spider.cache import curl


def parse_year(year):
    _id = var.CONFERENCE_YEAR_ID[year]
    text = curl("conference", _id, year)
    date_string = re.findall("({}-..-..)".format(year), text)[-1]
    soup = BeautifulSoup(text, "html.parser")
    conference, _new = Conference.objects.get_or_create(
        external_id=_id, date=date_string, name="BarCamp {}".format(year)
    )
    if _new:
        print("New conference", date_string)

    timeslots = list(var.make_timeslots(date_string, conference))

    for row in soup.findAll("tr", {"class": "sorting"}):
        name = row.find("th").text.strip()
        room, new = _lazy_room(name, conference=conference)
        if new:
            print("Room created", room.name)
        for i, div in enumerate(row.findAll("div")):
            text = div.text.strip()
            if not text:
                # nothing in this slot
                continue
            anchor = div.find("a")
            title = anchor.text.strip()
            url = anchor.attrs["href"]
            external_id = int(url.split("/")[-1])
            author_names = text.replace(title, "").strip()
            author_names = author_names.replace(" and ", ",").replace("&", ",")
            author_names = [a.strip() for a in author_names.split(",")]
            authors = []
            for name in author_names:
                a, new = Author.objects.get_or_create(name=name, conference=conference)
                authors.append(a)
                if new:
                    print("Author created:", a)

            talk_text = curl("presentation", external_id, "p{}".format(external_id))

            talk_soup = BeautifulSoup(talk_text, "html.parser")
            for ic, div in enumerate(talk_soup.findAll("div", {"class": "field"})):
                if "Description:" in str(div) and ic != var.DESCRIPTION_INDEX:
                    raise NotImplemented

            talk_fields = talk_soup.findAll("div", {"class": "field"})
            description = talk_fields[var.DESCRIPTION_INDEX].text
            description = description.replace("Description:", "").strip()
            contact_info = talk_fields[var.DESCRIPTION_INDEX - 1].text
            contact_info = contact_info.replace("Contact Info:", "").strip()
            if authors:
                a = authors[0]
                a.contact_info = contact_info
                a.save()
            defaults = dict(
                title=title.strip(),
                timeslot=timeslots[i],
                room=room,
                external_url=url,
                description=description,
            )
            talk, new = Talk.objects.get_or_create(
                external_id=external_id, conference=conference, defaults=defaults
            )
            for key, value in defaults.items():
                setattr(talk, key, value)
            talk.save()
            [talk.authors.add(a) for a in authors]
            if new:
                print("new talk", talk)

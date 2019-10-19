from dateutil import tz
import arrow

from main.models import TimeSlot

CONFERENCE_YEAR_ID = dict(
    [
        (2011, 17),
        (2013, 18),
        (2014, 19),
        (2015, 20),
        (2016, 21),
        (2017, 22),
        (2018, 23),
        (2019, 25),
    ]
)

DESCRIPTION_INDEX = 2

# these appear to be global
TIMES = [
    "09:45 AM",
    "10:15 AM",
    "11:15 AM",
    "12:15 PM",
    "01:00 PM",
    "02:15 PM",
    "03:15 PM",
    "04:15 PM",
    "05:15 PM",
]


def make_timeslots(date_string, conference):
    for time in TIMES:
        a = arrow.get(date_string + " " + time)
        a = a.replace(tzinfo=tz.gettz("US/Eastern"))
        if a.hour < 6:
            a = a.shift(hours=12)
        ts, new = TimeSlot.objects.get_or_create(
            datetime=a.datetime, conference=conference
        )
        yield ts

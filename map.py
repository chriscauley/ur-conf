import os, django

os.environ["DJANGO_SETTINGS_MODULE"] = "main.settings"
django.setup()  # noqa

from main.models import Room, Conference, Location, _lazy_room, Talk

_d = 50

rectangles = [
    ("F 65", [0, 0], [89, 59]),
    ("F 60", [89, 0], [179, 59]),
    ("F 55", [179, 0], [266, 59]),
    ("F 50", [266, 0], [355, 59]),
    ("F 45", [355, 0], [444, 59]),
    ("F 38", [444, 0], [492, 37]),
    ("F 36", [492, 23], [542, 59]),
    ("F 85", [95, 345], [238, 403]),
    ("F 90", [238, 345], [327, 403]),
    ("F 95", [327, 345], [470, 403]),
    ("F 86", [122, 309], [165, 345]),
    ("F 88", [165, 309], [209, 345]),
    ("F 92", [260, 309], [307, 345]),
    ("F 94", [353, 309], [401, 345]),
    ("F 96", [401, 309], [445, 345]),
    ("Restrooms", [0, 94], [32, 159]),
    ("Elevator", [32, 108], [60, 159]),
    ("Escalators1", [135, 108], [239, 130]),
    ("Escalators2", [294, 108], [398, 130]),
    ("F 70", [0, 159], [73, 243]),
    ("F 75", [0, 243], [73, 328]),
    ("F 80", [0, 328], [73, 403]),
    ("Landing", [105, 188], [105 + _d, 232]),
    ("Stairs1", [105 + _d, 188], [212, 232]),
    ("Stairs2", [105, 188 - _d], [105 + _d, 188]),
    ("Stairs3", [105, 232], [105 + _d, 232 + _d]),
    ("Restrooms Down", [495, 200], [525, 230]),
    ("Operations", [470, 280], [679, 404]),
]

location, new = Location.objects.get_or_create(name="Huntsman Hall")
location.geometry = {"width": 540, "height": 403}
location.save()

for cid in [1, 2]:
    conference = Conference.objects.filter(id=cid).first()
    if not conference:
        print("skipping conference", cid)
        continue
    conference.locations.add(location)

    for name, [x0, y0], [x1, y1] in rectangles:
        room, new = _lazy_room(name, conference_id=cid)

        if new:
            print("New room", room)
        else:
            print("no",name)
        room.location = location
        room.geometry = {
            "shape": "polygon",
            "points": [[x0, y0], [x1, y0], [x1, y1], [x0, y1]],
        }
        room.save()

    circles = [("big", 160, [605, 205]), ("drum", 25, [391, 215])]

    for name, radius, center in circles:
        drum, new = _lazy_room(name=name, conference_id=cid)
        drum.location = location
        drum.geometry = {"shape": "circle", "radius": radius, "center": center}
        drum.save()

    r = Room.objects.filter(name="Restrooms")[0]
    r.geometry["className"] = "ec ec-restroom"
    r.save()
    print(f"\n\n{conference}\n--------")
    for m in [Room, Location, Talk]:
        print(m.__name__,m.objects.filter(conference=conference).count())
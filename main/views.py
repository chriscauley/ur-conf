from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect

from main.achievements import make_achievements

import json
import os

from main.models import Talk, TalkVote, TalkAttendance

redirect = lambda request, url: HttpResponseRedirect(url)


def vote(request):
    data = json.loads(request.body.decode("utf-8"))
    if not request.user.is_authenticated:
        raise NotImplementedError()
    talkvote, _new = TalkVote.objects.get_or_create(
        user=request.user, talk_id=data["talk_id"], defaults={"vote": data["vote"]}
    )
    talkvote.vote = data["vote"]
    talkvote.save()
    make_achievements(request.user)
    return JsonResponse({"status": "ok"})


def attendance(request):
    data = json.loads(request.body.decode("utf-8"))
    if not request.user.is_authenticated:
        raise NotImplementedError()
    if not data.get("talk_id", None):
        TalkAttendance.objects.filter(
            user=request.user, timeslot_id=data["timeslot_id"]
        ).delete()
    else:
        talkattendance, _new = TalkAttendance.objects.get_or_create(
            user=request.user,
            timeslot_id=data["timeslot_id"],
            defaults={"talk_id": data["talk_id"]},
        )
        talkattendance.attendance = data["talk_id"]
        talkattendance.save()

    return JsonResponse({"status": "ok"})


def ajax_login(request):
    data = json.loads(request.body.decode("utf-8"))
    username = data.get("username", None)
    password = data.get("password", None)
    user = authenticate(username=username, password=password)
    if user:
        if not user.is_active:
            return JsonResponse(
                {"error": "Your account is inactive. Please contact the staff."},
                status=400,
            )
        login(request, user)
        return JsonResponse({"status": "ok"})
    return JsonResponse({"error": "Email and password did not match"}, status=400)


def ajax_logout(request):
    logout(request)
    return JsonResponse({})


def fivehundred(request):
    raise NotImplementedError()


def cached(request, year):
    fpath = os.path.join(settings.STATIC_ROOT, "talks{}.json".format(year))
    with open(fpath, "r") as f:
        return HttpResponse(f.read(), content_type="application/json")

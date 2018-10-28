from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json

from main.models import Talk, TalkVote

def vote(request):
    data = json.loads(request.body.decode("utf-8"))
    if not request.user.is_authenticated:
        raise NotImplementedError()
    talkvote, _new = TalkVote.objects.get_or_create(
        user=request.user,
        talk=Talk.objects.get(id=data['talk_id']),
        defaults={'vote': data['vote']}
    )
    talkvote.vote = data['vote']
    print(talkvote.vote)
    talkvote.save()
    return JsonResponse({'status': 'ok'})


def ajax_login(request):
    data = json.loads(request.body.decode("utf-8"))
    username = data.get("username",None)
    password = data.get("password",None)
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
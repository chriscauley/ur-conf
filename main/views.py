from django.http import JsonResponse

from main.models import Talk, TalkVote


def vote(request):
    if not request.user.is_authenticated:
        raise NotImplementedError()
    talkvote, _new = TalkVote.objects.get_or_create(
        user=request.user,
        talk=Talk.objects.get(id=request.POST['talk_id']),
        defaults={'vote': request.POST['vote']}
    )
    talkvote.vote = request.POST['vote']
    talkvote.save()
    return JsonResponse({'status': 'ok'})
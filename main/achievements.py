from main.models import TimeSlot, Achievement, UserAchievement
from collections import defaultdict


def check_achievements(user):
    slot_votes = defaultdict(lambda: defaultdict(int))
    slot_talks = defaultdict(int)
    max_vote = 0
    vote_count = 0
    max_attend = 0

    timeslots = TimeSlot.objects.all().prefetch_related('talk_set','talk_set__room')
    for timeslot in timeslots:
        talks = timeslot.talk_set.filter(sortable=True)
        for talk in talks:
            slot_talks[timeslot.id] += 1
            max_vote += 1
        if talks:
            max_attend += 1
    user_votes = user.talkvote_set.all().select_related('talk')
    for vote in user_votes:
        slot_votes[vote.talk.timeslot_id][vote.vote] += 1
        slot_votes[vote.talk.timeslot_id]['all'] += 1
        vote_count += 1
    attend_count = user.talkattendance_set.filter(talk__sortable=True).count()

    results = {
        'vote_one': vote_count,
        'vote_all': vote_count == max_vote,
        'attend_one': attend_count,
        'attend_all': attend_count == max_attend,
    }
    sums = {
        'all_yes': [1],
        'all_maybe': [0],
        'all_no': [-1],
        'all_yesno': [1,-1],
        'all_yesmaybe': [1,0],
        'all_maybeno': [0,-1],
    }.items()

    for _id, counts in slot_votes.items():
        if counts['all'] == slot_talks[_id]:
            #print('slot {} complete'.format(_id)) # confirms complete_slot
            results['complete_slot'] = True
        for key, votes in sums:
            if results.get(key,None):
                continue
            if sum([counts[v] for v in votes]) == slot_talks[_id]:
                # print(key,'unlocked by',_id) # confirm the stuff in sums
                results[key] = True

    #print('votes',vote_count,max_vote) # confirms vote_one/vote_all
    #print('attend',attend_count,max_attend) # confirms attend_one/attend_all
    return results


def make_achievements(user):
    checks = check_achievements(user)
    completed_slugs = user.userachievement_set.all().values_list('achievement__slug',flat=True)
    for achievement in Achievement.objects.all():
        if achievement.slug in completed_slugs:
            continue
        if checks.get(achievement.slug):
            UserAchievement.objects.create(
                achievement=achievement,
                user=user
            )

from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.tokens import default_token_generator

import json


def send_login(request):
    data = json.loads(request.body)
    form = PasswordResetForm(data)
    if form.is_valid():
        form.save(
            subject_template_name='email/nopass/subject.txt',
            email_template_name='email/nopass/body.txt',
        )
        return JsonResponse({"status": "ok"})
    return JsonResponse({},status=400)

# adapted from django.contrib.auth.views.PasswordResetConfirmView
def complete_login(request, uidb64=None, token=None):
    redirect_url = reverse("change-password")
    if request.user.is_authenticated:
        return HttpResponseRedirect(redirect_url)
    user = get_user(uidb64)

    if user and default_token_generator.check_token(user, token):
        # log the user and redirect to change password
        # logging in invalidates the token
        user.backend = "django.contrib.auth.backends.ModelBackend"
        login(request, user)

        # this forces them to change password
        user.set_unusable_password()
    else:
        redirect_url = reverse("bad_token")
    return HttpResponseRedirect(redirect_url)
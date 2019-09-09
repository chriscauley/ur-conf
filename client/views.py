from django.template.response import TemplateResponse


def index(request, *args, **kwargs):
    return TemplateResponse(request, "index.html", {})

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd party apps
    "graphene_django",
    "mailer",
    # project apps
    "main",
    "client",
    "nopass",
]

GRAPHENE = {"SCHEMA": "main.schema.schema"}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 3rd party apps
    'graphene_django',
    # project apps
    'main',
]

GRAPHENE = {
    'SCHEMA': 'main.schema.schema'
}
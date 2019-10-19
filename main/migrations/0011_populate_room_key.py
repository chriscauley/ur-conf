# Generated by Django 2.1.2 on 2019-10-18 23:18

from django.db import migrations

def create_room_slug(apps,schema_editor):
    from main.models import _lazy_room
    Room = apps.get_model("main","room")
    for room in Room.objects.all():
        room.slug = room.name.replace(" ","").lower()
        room.save()


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_room_slug'),
    ]

    operations = [
        migrations.RunPython(create_room_slug, lambda a,b: None)
    ]

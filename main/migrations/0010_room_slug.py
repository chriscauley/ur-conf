# Generated by Django 2.1.2 on 2019-10-18 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_auto_20190928_1335'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='slug',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
    ]

from django.core.management.base import BaseCommand
from spider.cache import cache_year
from spider.parse import parse_year


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("years", nargs="+", type=int)

    def handle(self, *args, **kwargs):
        for year in kwargs['years']:
            parse_year(year)
            cache_year(year)

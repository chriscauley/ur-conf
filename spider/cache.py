from django.conf import settings
from django.contrib.auth.models import User
from django.test.client import Client

import datetime, json, os

client = Client()
s = """
  {
    timeslots {
      id
      datetime
      talkSet {
        id
        title
        roomId
        timeslotId
        description
        authors {
          id
          name
          contactInfo
        }
        room {
          id
          name
        }
      }
    }
  }
"""


def cache_year(year):
  fname = os.path.join(settings.STATIC_ROOT,"talks{}.json".format(year))
  with open(fname,'w') as f:
    response = client.post('/graphql',data={'query': s})
    start = datetime.datetime.now()
    f.write(json.dumps(response.json()))
    delta = datetime.datetime.now()-start
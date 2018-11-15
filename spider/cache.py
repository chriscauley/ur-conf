from django.conf import settings
from django.contrib.auth.models import User

import datetime, json, os, requests
import requests

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
        sortable
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
  response = requests.get(settings.SITE_ORIGIN+'/graphql',params={'query': s})
  response.raise_for_status()
  with open(fname,'w') as f:
    f.write(json.dumps(response.json()))

URLS = {
    'presentation': "http://s.barcampphilly.org/presentations/",
    'conference': 'http://s.barcampphilly.org/events/18/event_dates/',
}

def curl(key,_id,name):
    url = URLS[key]+str(_id)
    fname = os.path.join(".bc","{}.html".format(name))
    #! TODO disabling curl caching for now
    if not os.path.exists(fname):
        text = requests.get(url).text
        with open(fname,'w') as _file:
            _file.write(text)
        print("downloading!",url)
        return text
    with open(fname,'r') as _file:
        return _file.read()
# ur-conf

This is a conference app I made. It is currently running on uberfordogs.com using the 2018 BarCamp talks. If you're interested in using this for a conference, please contact me at chris@lablackey.com and I'll see what I can do. Feel free to install it locally and play around with it.


# Installation

Create a python3 virtualenv and install all relevant python and node packages:

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
yarn install
```

Create the database and pre-populate with barcamp 2018 data:

```
python manage.py migrate
python manage.py refresh_year 2018
```

Start dev server. You can add `tmux` to this command to start each in a tmux screen.

```
./bin/start-dev
```
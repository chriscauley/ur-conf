#!/bin/bash

#! this is a script to wipe the database day of
# and restore live db from back up
# only use in emergency
dropdb ur-conf
createdb ur-conf
psql ur-conf-dev < urconf.dump
./manage.py migrate

#! TODO one off scripts for this year
./manage.py refresh_year 2019
python map.py #! TODO make a migration?

#!/bin/bash
dropdb ur-conf-dev
createdb ur-conf-dev
psql ur-conf-dev < urconf.dump
./manage.py migrate

#! TODO one off scripts for this year
#./manage.py refresh_year 2017 2019;python map.py
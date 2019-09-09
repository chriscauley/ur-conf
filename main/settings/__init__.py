# Settings loader file.

import os
import sys
import glob
import re
import socket

pwd = os.path.dirname(__file__)
sys.path.append(os.path.join(pwd, ".."))
machine_name = re.sub("[^A-z0-9._]", "_", socket.gethostname())

settings_files = [
    "00-base",
    "10-apps",  # INSTALLED_APPS and app settings
    "90-env",  # set by environment variables
    machine_name,  # machine specific (in repo)
    "local",  # not in repo
]

# Open and compile each file
for s_file in settings_files:
    try:
        f = "main/settings/{}.py".format(s_file)
        with open(os.path.abspath(f)) as file:
            exec(compile(file.read(), f, "exec"), globals(), locals())

    except IOError:
        pass

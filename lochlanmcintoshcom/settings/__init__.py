import os
from django.utils.termcolors import colorize

# ON_PASS and USE_PRODUCTION_BUILD are used in templates, see context_processors.py

ON_PAAS = 'OPENSHIFT_REPO_DIR' in os.environ

USE_PRODUCTION_BUILD = ON_PAAS or 'PRODUCTION' in os.environ

if ON_PAAS:
    print(colorize('Loading Django production settings', fg='magenta'))
    from .production import *
else:
    loading_message = 'Loading Django dev settings, using '
    if USE_PRODUCTION_BUILD:
        print(colorize(loading_message + 'production build', fg='magenta'))
    else:
        print(colorize(loading_message + 'dev build', fg='magenta'))
    from .dev import *

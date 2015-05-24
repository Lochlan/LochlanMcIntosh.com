import os
from django.utils.termcolors import colorize


ON_PAAS = 'OPENSHIFT_REPO_DIR' in os.environ

if ON_PAAS:
    print(colorize('Loading Django production settings', fg='magenta'))
    from .production import *
else:
    print(colorize('Loading Django dev settings', fg='magenta'))
    from .dev import *

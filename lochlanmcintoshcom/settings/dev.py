import os
from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ')_7av^!cy(wfx=k#3*7x+(=j^fzv+ot^1@sh9s9t=8$bu@r(z$'

DEBUG = True
DEBUG = DEBUG or 'DEBUG' in os.environ

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = [
    '*', # Required if DEBUG=False
]

REST_FRAMEWORK.update({
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.ScopedRateThrottle',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'email_service_provider': '100/second', # effectively unlimited
    },
})

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

# stock django, local development.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

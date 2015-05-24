import os
import socket
from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['OPENSHIFT_SECRET_TOKEN']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
DEBUG = DEBUG or 'DEBUG' in os.environ
if DEBUG:
    print("*** Warning - Debug mode is on ***")

ALLOWED_HOSTS = [
    '.lochlanmcintosh.com',
    os.environ['OPENSHIFT_APP_DNS'],
    socket.gethostname(),
]


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

# determine if we are on MySQL or POSTGRESQL
if "OPENSHIFT_POSTGRESQL_DB_USERNAME" in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ['OPENSHIFT_APP_NAME'],
            'USER': os.environ['OPENSHIFT_POSTGRESQL_DB_USERNAME'],
            'PASSWORD': os.environ['OPENSHIFT_POSTGRESQL_DB_PASSWORD'],
            'HOST': os.environ['OPENSHIFT_POSTGRESQL_DB_HOST'],
            'PORT': os.environ['OPENSHIFT_POSTGRESQL_DB_PORT'],
        }
    }
elif "OPENSHIFT_MYSQL_DB_USERNAME" in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ['OPENSHIFT_APP_NAME'],
            'USER': os.environ['OPENSHIFT_MYSQL_DB_USERNAME'],
            'PASSWORD': os.environ['OPENSHIFT_MYSQL_DB_PASSWORD'],
            'HOST': os.environ['OPENSHIFT_MYSQL_DB_HOST'],
            'PORT': os.environ['OPENSHIFT_MYSQL_DB_PORT'],
        }
    }

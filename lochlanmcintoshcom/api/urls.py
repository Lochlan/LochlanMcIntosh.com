from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns('',
    url(r'^contact/$', views.Contact.as_view()),
)

from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="shared/home.html"), name='home'),
    url(r'^about/$', TemplateView.as_view(template_name="shared/about.html"), name='about'),
    url(r'^contact/$', TemplateView.as_view(template_name="shared/contact.html"), name='contact'),
    url(r'^resume/$', TemplateView.as_view(template_name="shared/resume.html"), name='resume'),

    url(r'^api/', include('lochlanmcintoshcom.api.urls')),

    url(r'^admin/', include(admin.site.urls)),
)

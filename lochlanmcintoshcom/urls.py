from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="shared.html"),
            { 'included_template': 'home' }, name='home'),
    url(r'^about/$', TemplateView.as_view(template_name="shared.html"),
            { 'included_template': 'about' }, name='about'),
    url(r'^contact/$', TemplateView.as_view(template_name="shared.html"),
            { 'included_template': 'contact' }, name='contact'),
    url(r'^resume/$', TemplateView.as_view(template_name="shared.html"),
            { 'included_template': 'resume' }, name='resume'),

    url(r'^api/', include('lochlanmcintoshcom.api.urls')),

    url(r'^admin/', include(admin.site.urls)),
)

from rest_framework.throttling import UserRateThrottle


# defaults

class BurstRateThrottle(UserRateThrottle):
    scope = 'burst'

class SustainedRateThrottle(UserRateThrottle):
    scope = 'sustained'


# scoped

# Mandrill email send limits are 250/hour and 12,000/month
class MandrillUsageThrottle(UserRateThrottle):
    rate = '10/day'
    scope = 'mandrill'

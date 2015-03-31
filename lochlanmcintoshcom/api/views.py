from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from string import Template

from .serializers import MessageSerializer
from .throttles import MandrillUsageThrottle


class Contact(APIView):
    """
    Sends an e-mail to the site owner.
    """
    throttle_classes = (MandrillUsageThrottle,)

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)

        # TODO add validation for email address

        if serializer.is_valid():
            emails_sent = send_mail(
                request.data['subject'],
                request.data['text'],
                Template('"$name" <$email>').substitute(request.data),
                ["info@lochlanmcintosh.com"]
                )

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.forms import widgets
from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = (
            'id',
            'name',
            'email',
            'subject',
            'text'
            )

from rest_framework import serializers
from ..models import Album


class AlbumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album  # this is the model that the serializer will "translate"
        fields = '__all__'  # the serializer should translate all fields

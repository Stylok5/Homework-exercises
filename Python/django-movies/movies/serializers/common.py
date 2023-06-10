from rest_framework import serializers
from ..models import Movie


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie  # the model it should use
        fields = '__all__'  # which fields to serialize

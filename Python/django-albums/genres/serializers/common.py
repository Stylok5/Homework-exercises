from rest_framework import serializers
from ..models import Genre # import the model. Note the 2 dots this time on ..models because the common.py is in a folder

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'

        #this will just return all standart fields from the model
        #returning -> id,name
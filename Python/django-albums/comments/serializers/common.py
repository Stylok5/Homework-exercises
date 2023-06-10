from rest_framework import serializers
# import the model. Note the 2 dots this time on ..models because the common.py is in a folder
from ..models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

        # this will just return all standart fields from the model
        # returning -> id,name

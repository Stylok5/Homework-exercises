from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    # when the user is being converted back to JSON before we return the data as a response,
    # we will omit the password and password_confirmation keys

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # validation function to
    # check our passwords match
    # hash the passwords
    # update the password on the data object that is passed throught from the request in the view

    def validate(self, data):
        # remove the fields from the data that we want and save as variables
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError(
                {'password_confirmation': 'Does not match password field'})

        # first, let's make sure the password passes the validation criteria
        try:
            password_validation.validate_password(password=password)
        except ValidationError as err:
            raise ValidationError({'password': err.messsge})

        # reassign the value of data.password as the hashed password that we will create
        data['password'] = make_password(password)

        return data  # returns the updated data dictionary

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'password', 'password_confirmation')

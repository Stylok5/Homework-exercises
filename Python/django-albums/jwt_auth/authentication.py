# Class to inherit that jas pre-defined validations
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied  # would throw and exception
from django.contrib.auth import get_user_model  # returns the current auth model
# imports the settings so we can access teh SECRET_KEY
from django.conf import settings

import jwt  # import the pyjwt package to handle tokens

User = get_user_model()  # save the user model to a variable


class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        # get the authorization header from the request
        auth_header = request.headers.get('Authorization')
        print(f"{auth_header}")
        # check that the auth_header has a value
        if not auth_header:
            return None

        # check that the token is a Bearer token
        if not auth_header.startswith('Bearer'):
            raise PermissionDenied(detail="invalid auth token format")

        # remove bearer from the start of the token
        token = auth_header.replace('Bearer ', '')

        # get the payload, take the sub (the user id) and make sure the user exists
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])

            # find the user using the user id from the payload (id = sub)
            user = User.objects.get(pk=payload.get('sub'))

        # if the token is not valid for any reason
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail="Invalid token")

        # If the user does not exist (we've been sent a dodgy user ID)
        except User.DoesNotExist:
            raise PermissionDenied(detail="User not found")

        return (user, token)

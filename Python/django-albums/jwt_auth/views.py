from rest_framework.views import APIView  # main API controller class
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
# creates timestamps in different formats
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
from .serializers.common import UserSerializer
import jwt

# Create your views here.

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': "registration succesfull"}, status=status.HTTP_201_CREATED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        # get the data out of the request object
        email = request.data.get('email')
        password = request.data.get('password')

        # query the database for a user with the supplied email
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(
                detail="No user found with that email. Please Register.")

        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")

        # timedelta can be used to calculate the difference between dates - passing 7 days gives you 7 days represented
        # as a timestamp(like you would get in JavaScript using datetime.now()) so it would return the timestamp for 7 days from when it is created

        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
                           settings.SECRET_KEY,
                           algorithm='HS256'
                           )
        return Response({'token': token, 'message': f"Welcome back {user_to_login.username}"})

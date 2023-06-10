# CUSTOM USERS AND AUTHENTICATION

We want to use jwt tokens for auth again. Django isn't set up to do this out of the box so it will take a bit of work, but after implementing it, we will have registration, login and secure route functionality like we had in our previous node applications.

1. Firstly, we need to start a new app called `jwt_auth`

```sh
django-admin startapp jwt_auth
```

2. Next, we need to register our `jwt_auth` app in our projects settings.

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # register rest framework above our own apps
    'albums',  # we add the name of the app here so the project knows it exists
    'genres',
    'comments',
    'artists',
    'jwt_auth',
]
```

3. Django already has a user model, it's what it uses under the hood to add a superuser. In the project settings.py, add the below to specifiy which model we intend to use: AUTH_USER_MODEL = 'jwt_auth.User'

```py
AUTH_USER_MODEL = 'jwt_auth.User' # This will point to our User model
```

You can put this line anywhere in the file, but I like to put it after the DATABASES list and before the AUTH_PASSWORD_VALIDATORS dict. That way, it keeps the users stuff together.

4. in jwt_auth/models.py we'll add our new model.

Django already has a user model called `AbstractUser` which we want to extend. To add new fields and override existing ones.

- Django already has password, password confirmation & username so we don't need to add them.
- It also doesnt actually make email required so we want to override that.
- By defining these fields and not adding null=True or blank=True we make them required.

```py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=300)
```

5. Now we have a new model we need to make some migrations and migrate. **BUT** there will be an error when we migrate.

Django will get confused here because a user table exist,s but we've just created a new model. The migration history will be all over the place so we want to reset the db so no migrations exist. We are only having to do this as we're doing auth last. During project and when we build out our apps, we would most likely build auth first, but it doesn't make sense to learn it first.

Before we makemigrations and migrate, we are going to backup our data.

6. Create backups in seed files:

Before we dump our database and lose all the data we have created, we can tell Django to create seed files using the data in our tables. We need to do one for each app, but we can run them concurrently.

```sh
python manage.py dumpdata albums --output albums/seeds.json --indent=2;
python manage.py dumpdata artists --output artists/seeds.json --indent=2;
python manage.py dumpdata genres --output genres/seeds.json --indent=2;
python manage.py dumpdata comments --output comments/seeds.json --indent=2;
```

You'll see that the data is now in a file called seeds.json in each app. We'll use these files later to populate our database tables.

7. Drop database:

```sh
dropdb django-albums
```

8. Delete migration files

**Remember** we want delete all of the migration files except the \***\*init**.py\*\* file.

9. Recreate db:

```sh
createdb django-albums
```

10. Now we can make and apply our migrations

```sh
python manage.py makemigrations
```

```sh
python manage.py migrate
```

11. Create superuser:

```sh
python manage.py createsuperuser
```

11. Register User model on admin:

get_user_model is a method that when invoked returns whatever model that our app is set up to use. In settings.py we specified that we will use our own custom model 'jwt_auth.User' so this is what will be returned.

```py
from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()
admin.site.register(User) # then we'll register this to the admin as usual
```

# CREATING USERS THROUGH THE API

12. To handle jwt tokens in our API, we are going to install a package called `pyjwt`

```sh
pipenv install pyjwt
```

13. We are going to create a file to handle our tokens for login/register. Let's create a new file called `authentication.py` in our `jwt_auth` app.

The steps to implement tokens is very similar to what we did before in our node applications, but obviously this time we are going to write it in python.

```py
from rest_framework.authentication import BasicAuthentication # Class to inherit that has pre-defined validations
from rest_framework.exceptions import PermissionDenied # throws an exception
from django.contrib.auth import get_user_model # method that returns the current auth model
from django.conf import settings # import settings so we can get secret key (we'll come back to this)
import jwt # import jwt so we can decode the token in the auth header

User = get_user_model() # saving auth model to a variable

class JWTAuthentication(BasicAuthentication):

    # This will act as the middleware that authenticates our secure routes
    def authenticate(self, request):
        # Get the Authorization header from the incoming request object and save it to a variable.
        auth_header = request.headers.get('Authorization')

        # Check if header has a value. If it doesn't, return None.
        if not auth_header:
            return None

        # Check that the token starts with Bearer
        if not auth_header.startswith('Bearer'):
            raise PermissionDenied(detail="Invalid Auth Token Format")

        # remove Bearer from beginning of Authorization header
        token = auth_header.replace('Bearer ', '')

        # Get payload, take the sub (the user id) and make sure that user exists
        try:
            # 1st arg is the token itself
            # 2nd arg is the secret
            # 3rd argument is kwarg that takes the algorithm used
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

            # find user
            user = User.objects.get(pk=payload.get('sub'))

        # if jwt.decode errors, this except will catch it
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Token')

        # If no user is found in the db matching the sub, the below will catch it
        except User.DoesNotExist:
            raise PermissionDenied(detail='User Not Found')

        # If all good, return the user and the token
        return (user, token)
```

14. We now need to add REST_FRAMEWORK into settings.py.

The first part is telling Django to render in JSON, although the serializers are doing this for us we can confirm this behaviour here.

The second part is telling rest_framework and django that we are using the JWTAuthentication class we just created as the default.

```py
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'jwt_auth.authentication.JWTAuthentication'
    ]
}
```

# RBAC (ROLE BASED ACCESS CONTROL)

15. Next we'll control who see's what. Go to `albums/views.py` and add imports for permissions from rest_frameworks.permissions.

We are going to import something called `IsAuthenticatedOrReadOnly` which has a method that enforces every method except GET to throw a permissions error.

_there's another one too, IsAuthenticated, that applies to all methods_

Add the snippet below to the `views.py` imports:

```py
from rest_framework.permissions import IsAuthenticatedOrReadOnly # IsAuthenticatedOrReadOnly specifies that a view is secure on all methods except get requests
```

16. inside the AlbumListView class add the following line. \*\*it shouldn't be in a method, so it's easier to put it as the first line of the class so it looks like this:

```py
class AlbumListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, ) # sets the permission levels of the specific view by passing in the rest framework authentication class. Needs to be a tupple with the trailing comma.

    def get(self, _request):
        albums = Album.objects.all()
    # .... the rest of the file is omitted as this is just for demo purposes of where to put the permissions classes line
```

17. The serializer for the user:

We're going to create our serializer but add a new function called `validate` to run our validation checks.

Create a directory called `serializers` and in there, create a file called `common.py`. we're going to put this code into the common.py file:

```py
from rest_framework import serializers
# password_validation is the same method being used to check our password is valid when creating a superuser
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password  # hashes our password for us
from django.core.exceptions import ValidationError

User = get_user_model()  # this is our user model


class UserSerializer(serializers.ModelSerializer):
    # when User is being converted back to JSON to return data to user, password & confirmation are not going to be returned
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # validate function is going to:
    # check our passwords match
    # hash our passwords
    # update password on data object that is passed through from the request in the views
    def validate(self, data):
        # remove the fields from the request aand save to vars
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # check if the passwords match
        if password != password_confirmation:
            raise ValidationError(
                {'password_confirmation': 'Does not match password field'})

        # We're going to first make sure the password is valid
        try:
            password_validation.validate_password(password=password)
        except ValidationError as err:
            raise ValidationError({'password': err.messages})

        # reassign the value of data.password as the hashed password we create
        # make_password hashes a plain text string and returns it
        data['password'] = make_password(password)

        return data  # returns updated data dictionary

    class Meta:
        model = User
        fields = '__all__'
```

18. Now let's sort out the `jwt_auth/views.py`

```py
from rest_framework.views import APIView  # main API controller class
# response class, like res object in express
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta  # creates timestamps in dif formats
from django.contrib.auth import get_user_model  # gets user model we are using
from django.conf import settings  # import our settings for our secret
import jwt  # import jwt

from .serializers.common import UserSerializer
User = get_user_model()  # Save user model to User var


class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        print('USER CREATE', user_to_create)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

19. Create the `jwt_auth/urls.py` and add the urls:

```py
from django.urls import path
from .views import RegisterView

urlpatterns = [
path('register/', RegisterView.as_view())
]
```

20. Add the auth urls to the project urls

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/albums/', include('albums.urls')),
    path('api/genres/', include('genres.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/artists/', include('artists.urls')),
    path('api/auth/', include('jwt_auth.urls')),
]
```

21. Make a register request in postman. The endpoint will be `/auth/register`.

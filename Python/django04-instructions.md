1. Firstly, let's create the artists app.

```sh
django-admin startapp artists
```

2. Now that we have an app, let's go to the `project/settings.py` and register the artists app.

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
]
```

3. Let's create a model for an artist. W'll keep it simple and just have an artist name. Go to `albums/models.py` and add the following:

```py
from django.db import models


class Artist(models.Model):
    name = models.TextField(max_length=30)

    def __str__(self):
        return f"{self.name}"
```

4. Now let's register the model in the `albums/admin.py`

```py
from django.contrib import admin
from .models import Artist

admin.site.register(Artist)
```

5. We'll create the serializers:

common:

```py
from rest_framework import serializers
from ..models import Artist
# from genres.serializers.common import GenreSerializer
# from comments.serializers.common import CommentSerializer


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist  # the model that our serializer should use to transform from the database
        fields = '__all__'  # specify which fields we want to return
```

populated:

```py
from .common import ArtistSerializer
from albums.serializers.common import AlbumSerializer


class PopulatedArtistSerializer(ArtistSerializer):
    albums = AlbumSerializer(many=True)
```

6. Now we will create the views:

```py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# This provides a default response for a not found
from rest_framework.exceptions import NotFound
# this imports a Django core exception: ValidationError
from django.db import IntegrityError

from .models import Artist
from .serializers.common import ArtistSerializer
from .serializers.populated import PopulatedArtistSerializer


class ArtistListView(APIView):
    def get(self, _request):
        artists = Artist.objects.all()  # get all of the artists from the database
        serialized_artists = ArtistSerializer(artists, many=True)
        return Response(serialized_artists.data, status=status.HTTP_200_OK)

    def post(self, request):
        artist_to_add = ArtistSerializer(data=request.data)
        try:
            artist_to_add.is_valid()
            artist_to_add.save()
            return Response(artist_to_add.data, status=status.HTTP_201_CREATED)
        # exceptions are like a catch in js, but if we specify an exception like we do below then the exception thrown has to match to fall into it
        # For example the below is the exception thrown when we miss a required field
        # link: (this documentation entry is empty but shows it exists) https://docs.djangoproject.com/en/4.0/ref/exceptions/#django.db.IntegrityError
        except IntegrityError as e:
            res = {
                "detail": str(e)
            }
            # IntegrityError is an exception thrown when fields are missing
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # AssertionError occurs when the incorrect type is passed as a value for an existing field
        # AssertionError is a native python error
        # link: https://docs.python.org/3/library/exceptions.html#AssertionError
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # If we leave it blank, (except:) then all exceptions will fall into it
        # We will add this as a fallback.
        except:
            return Response({"detail": "Unprocessable Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ArtistDetailView(APIView):
    # This will be used by all of the routes
    def get_artist(self, pk):
        try:
            return Artist.objects.get(pk=pk)
        # Django Models have a DoesNotExist exception that occurs when a query returns no results
        # link: https://docs.djangoproject.com/en/4.0/ref/models/class/#model-class-reference
        # we can import that here for use
        except Artist.DoesNotExist:
            # We'll raise a NotFound and pass a custom message on the detail key
            # NotFound returns a 404 response
            # link: https://www.django-rest-framework.org/api-guide/exceptions/#notfound
            # raise and return can both be used inside an exception, but NotFound has to be raised
            # raising an exception is when you're indicating a specific behaviour or outcome like NotFound
            # returning an exception is for something generic like Response above
            raise NotFound(detail="Can't find that artist!")

    # show this one after
    def get(self, _request, pk):
        artist = self.get_artist(pk=pk)  # using key word arguments here
        # querying using a primary key is always going to return a single result.
        # this will never be a list, so no need to add many=True on the serializer
        serialized_artist = PopulatedArtistSerializer(artist)
        return Response(serialized_artist.data, status=status.HTTP_200_OK)

    def put(self, request, pk):

        artist_to_edit = self.get_artist(pk=pk)
        # passing request data and the instance to update through the serializer
        # we specify the key data because we aren't adhering to the order of the arguments, same as pk=pk above and many=True
        updated_artist = ArtistSerializer(artist_to_edit, data=request.data)
        try:
            updated_artist.is_valid()
            updated_artist.save()
            return Response(updated_artist.data, status=status.HTTP_202_ACCEPTED)
        # Exception for when we pass the wrong type for a field
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # any other exception
        except:
            res = {
                "detail": "Unprocessable Entity"
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, _request, pk):
        print('DELETE ME')
        artist_to_delete = self.get_artis(pk=pk)
        artist_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

7. let's create the `artists/urls.py`:

```py
from django.urls import path
from .views import ArtistListView, ArtistDetailView

urlpatterns = [
    path('', ArtistListView.as_view()),
    path('<int:pk>/', ArtistDetailView.as_view())
]
```

8. We also need to update the model for the albums app:

```py
from django.db import models

# Django has its own model class that we can use, it comes from models.Model
# inherits properties from this class


class Album(models.Model):  # the Album class is inheriting properties from models.Model
    # this creates the title column and says the data type is a Char(50)
    title = models.CharField(max_length=50)
    cover_image = models.CharField(max_length=300)
    genres = models.ManyToManyField(
        'genres.Genre', related_name="albums",  blank=True)
    artist = models.ForeignKey(
        'artists.Artist', related_name="albums", on_delete=models.CASCADE)

    # this function represents the class objects as a string in the admin app
    def __str__(self):
        return f"{self.title}"

# When we create or update a model, we will need to make those changes in the database:
# We will need to make the migrations using python manage.py makemigrations
# Then we will need to apply the migrations to the DB using python manage.py migrate
```

9. And let's add the artist serializer to the populated album serializer:

```py
class PopulatedAlbumSerializer(AlbumSerializer):
    genres = GenreSerializer(many=True)
    comments = CommentSerializer(many=True)
    artist = ArtistSerializer()
```

10. Finally, let's expose the artists endpoints in the `project/urls.py`

```py
"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('albums/', include('albums.urls')),
    path('genres/', include('genres.urls')),
    path('comments/', include('comments.urls')),
    path('artists/', include('artists.urls'))
]
```

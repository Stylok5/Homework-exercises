## DAY 2 - MORE ROUTES

We can get all of our albums already, let's add a route to get a single album.
The serializer isn't going to change, so this should be very easy.

1. Go to `albums/urls.py` and add a new path

```py
path('<int:pk>/', AlbumDetailView.as_view()),
```

The above `<int:pk>` is known as a captured value - it works the same as a placeholder in react/express: ":id".
It's made up of two parts:

1. On the left is the path converter - in this case we've specified an integer or "int"
2. On the right is the placeholder - in this case pk but could be anything the path converter is optional, but you should use it to ensure it's the type you expect without it, the captured value would be written like: `<pk>`

3. Your `albums/urls.py` should now look like this:

```py
from django.urls import path
from .views import AlbumListView, AlbumDetailView

urlpatterns = [
    path('', AlbumListView.as_view()),
    path('<int:pk>/', AlbumDetailView.as_view())
]
```

4. Now we have an endpoint, we need to create the `AlbumDetailView` in our views.py. Let's start with the get method:

```py
class AlbumDetailView(APIView):
    # album this one first
    def get(self, _request, pk):
        try:
            # querying by primary key will always return a single document,
            # so there's no need to pass many=True into the serializer
            album = Album.objects.get(pk=pk)
            serialized_album = AlbumSerializer(album)
            return Response(serialized_album.data, status=status.HTTP_200_OK)
        except Album.DoesNotExist:
            raise NotFound(detail="Can't find that album!")
```

5. We can update our get method to use a function that will go and retrieve the requested album and then pass the data through to the get. This will mean that the fetching of the album from the DB becomes a reusable function.

```py
    # This will be used by all of the routes
    def get_album(self, pk):
        try:
            return Album.objects.get(pk=pk)
        # Django Models have a DoesNotExist exception that occurs when a query returns no results
        # link: https://docs.djangoproject.com/en/4.0/ref/models/class/#model-class-reference
        # we can import that here for use
        except Album.DoesNotExist:
            # We'll raise a NotFound and pass a custom message on the detail key
            # NotFound returns a 404 response
            # link: https://www.django-rest-framework.org/api-guide/exceptions/#notfound
            # raise and return can both be used inside an exception, but NotFound has to be raised
            # raising an exception is when you're indicating a specific behaviour or outcome like NotFound
            # returning an exception is for something generic like Response above
            raise NotFound(detail="🆘 Can't find that album!")

    # album this one after
    def get(self, _request, pk):
        album = self.get_album(pk=pk) # using key word arguments here
        # querying using a primary key is always going to return a single result.
        # this will never be a list, so no need to add many=True on the serializer
        serialized_album = AlbumSerializer(album)
        return Response(serialized_album.data, status=status.HTTP_200_OK)
```

6. Now we can add the edit/put method:

```py
    def put(self, request, pk):
        album_to_edit = self.get_album(pk=pk)
        # passing request data and the instance to update through the serializer
        # we specify the key data because we aren't adhering to the order of the arguments, same as pk=pk above and many=True
        updated_album = AlbumSerializer(album_to_edit, data=request.data)
        try:
            updated_album.is_valid()
            updated_album.save()
            return Response(updated_album.data, status=status.HTTP_202_ACCEPTED)
        # Exception for when we pass the wrong type for a field
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        # any other exception
        except:
            res = {
                "detail": "Unprocessable Entity"
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

7. And finally we can add the delete

```py
    def delete(self, _request, pk):
        album_to_delete = self.get_album(pk=pk)
        album_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

8. Our final views.py file should look like this:

```py
# this imports rest_frameworks APIView that we'll use to extend to our custom view
from rest_framework.views import APIView
# Response gives us a way of sending a http response to the user making the request, passing back data and other information
from rest_framework.response import Response
# status gives us a list of possible response codes
from rest_framework import status
# This provides a default response for a not found
from rest_framework.exceptions import NotFound
# this imports a Django core exception: ValidationError
from django.db import IntegrityError

from .models import Album
from .serializers import AlbumSerializer


class AlbumListView(APIView):

    def get(self, _request):
        albums = Album.objects.all()  # get everything from the albums table in the db
        print('albums', albums)
        # run everything through the serializer
        serialized_albums = AlbumSerializer(albums, many=True)
        print('serialized albums', serialized_albums)
        # return the response and a status
        return Response(serialized_albums.data, status=status.HTTP_200_OK)

    def post(self, request):
        album_to_add = AlbumSerializer(data=request.data)
        try:
            album_to_add.is_valid()
            album_to_add.save()
            return Response(album_to_add.data, status=status.HTTP_201_CREATED)
        # exceptions are like a catch in js, but if we specify an exception like we do below then the exception thrown has to match to fall into it
        # For example the below is the exception thrown when we miss a required field
        # link: (this documentation entry is empty but albums it exists) https://docs.djangoproject.com/en/4.0/ref/exceptions/#django.db.IntegrityError
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


class AlbumDetailView(APIView):

    # album this one after
    # This will be used by all of the routes
    def get_album(self, pk):
        try:
            return Album.objects.get(pk=pk)
        # Django Models have a DoesNotExist exception that occurs when a query returns no results
        # link: https://docs.djangoproject.com/en/4.0/ref/models/class/#model-class-reference
        # we can import that here for use
        except Album.DoesNotExist:
            # We'll raise a NotFound and pass a custom message on the detail key
            # NotFound returns a 404 response
            # link: https://www.django-rest-framework.org/api-guide/exceptions/#notfound
            # raise and return can both be used inside an exception, but NotFound has to be raised
            # raising an exception is when you're indicating a specific behaviour or outcome like NotFound
            # returning an exception is for something generic like Response above
            raise NotFound(detail="🆘 Can't find that album!")

    # album this one after
    def get(self, _request, pk):
        album = self.get_album(pk=pk)  # using key word arguments here
        # querying using a primary key is always going to return a single result.
        # this will never be a list, so no need to add many=True on the serializer
        serialized_album = AlbumSerializer(album)
        return Response(serialized_album.data, status=status.HTTP_200_OK)

    # # album this one first

    def get(self, _request, pk):
        try:
            # different API methods https://docs.djangoproject.com/en/4.0/ref/models/querysets/#methods-that-do-not-return-querysets
            album = Album.objects.get(pk=pk)
            serialized_album = AlbumSerializer(album)
            return Response(serialized_album.data, status=status.HTTP_200_OK)
        except Album.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that album!")

    def put(self, request, pk):
        album_to_edit = self.get_album(pk=pk)
        # passing request data and the instance to update through the serializer
        # we specify the key data because we aren't adhering to the order of the arguments, same as pk=pk above and many=True
        updated_album = AlbumSerializer(album_to_edit, data=request.data)
        try:
            updated_album.is_valid()
            updated_album.save()
            return Response(updated_album.data, status=status.HTTP_202_ACCEPTED)
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
        album_to_delete = self.get_album(pk=pk)
        album_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

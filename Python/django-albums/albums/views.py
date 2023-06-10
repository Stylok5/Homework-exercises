from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from django.db import IntegrityError
from .models import Album
from .serializers.common import AlbumSerializer
from .serializers.populated import PopulatedAlbumSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class AlbumListView(APIView):
    # this sets the permission levels for the view
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # now only users who are logged in will be able to post, put or delete, but everyone can get.

    def get(self, _request):
        albums = Album.objects.all()  # get all of the albums from the database
        # use the serializer to turn the data into JSON
        serialized_albums = AlbumSerializer(albums, many=True)
        # return the data and the http status code
        return Response(serialized_albums.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        album_to_add = AlbumSerializer(data=request.data)
        try:
            album_to_add.is_valid()
            album_to_add.save()
            return Response(album_to_add.data, status=status.HTTP_201_CREATED)
        # exceptions are like catch in javascript, but if we specify an exception (like we do below)
        # then the exception thrown has to match  to fall into it (the type of error)
        # integrity error happens when a user does not send data that is required on the model
        except IntegrityError as e:
            res = {
                "detail": str(e)
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except:
            return Response({"detail": "Unproccesible Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class AlbumDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_album(self, _request, pk):
        try:
            return Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            raise NotFound(
                detail="Can not find an album with that primary key")

# we pass a Primary Key to the get function (this will be the ID of the album)
    def get(self, request, pk):  # Add the request argument
        album = self.get_album(request, pk=pk)  # Pass the request argument
        serialized_album = PopulatedAlbumSerializer(album)
        return Response(serialized_album.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        album_to_edit = self.get_album(request, pk=pk)
        updated_album = AlbumSerializer(album_to_edit, data=request.data)
        try:
            updated_album.is_valid()
            updated_album.save()
            return Response(updated_album.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({"detail": "Unprocessible Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        album_to_delete = self.get_album(request, pk=pk)
        album_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

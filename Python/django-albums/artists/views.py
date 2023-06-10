from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from django.db import IntegrityError
from .models import Artist
from .serializers.common import ArtistSerializer
from .serializers.populated import PopupaletdArtistSerializer

# Create your views here.


class ArtistListView(APIView):

    def get(self, _request):
        artists = Artist.objects.all()  # get all of the albums from the database
        # use the serializer to turn the data into JSON
        serialized_artists = ArtistSerializer(artists, many=True)
        # return the data and the http status code
        return Response(serialized_artists.data, status=status.HTTP_200_OK)

    def post(self, request):
        artist_to_add = ArtistSerializer(data=request.data)
        try:
            artist_to_add.is_valid()
            artist_to_add.save()
            return Response(artist_to_add.data, status=status.HTTP_201_CREATED)
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


class ArtistDetailView(APIView):
    def get_artist(self, _request, pk):
        try:
            return Artist.objects.get(pk=pk)
        except Artist.DoesNotExist:
            raise NotFound(
                detail="Can not find an album with that primary key")

# we pass a Primary Key to the get function (this will be the ID of the album)
    def get(self, request, pk):  # Add the request argument
        artist = self.get_artist(request, pk=pk)  # Pass the request argument
        serialized_artist = PopupaletdArtistSerializer(artist)
        return Response(serialized_artist.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        artist_to_edit = self.get_artist(request, pk=pk)
        updated_artist = ArtistSerializer(artist_to_edit, data=request.data)
        try:
            updated_artist.is_valid()
            updated_artist.save()
            return Response(updated_artist.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({"detail": "Unprocessible Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        artist_to_delete = self.get_artist(request, pk=pk)
        artist_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

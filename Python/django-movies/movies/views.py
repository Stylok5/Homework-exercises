from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from rest_framework.exceptions import NotFound
from .models import Movie
from .serializers.common import MovieSerializer
from .serializers.populated import PopulatedMovieSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class MovieListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):

        movies = Movie.objects.all()
        print('movies', movies)
        serialized_movies = MovieSerializer(movies, many=True)
        print('serialized movies', serialized_movies)
        return Response(serialized_movies.data, status=status.HTTP_200_OK)

    def post(self, request):
        movie_to_add = MovieSerializer(data=request.data)
        try:
            movie_to_add.is_valid()
            movie_to_add.save()
            return Response(movie_to_add.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            res = {
                "detail": str(e)
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({"detail": "Unprocessable Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class MovieDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_movie(self, _request, pk):
        try:
            return Movie.objects.get(pk=pk)
        except Movie.DoesNotExist:
            raise NotFound(detail="Can not find a movie with that primary key")

    def get(self, request, pk):
        movie = self.get_movie(request, pk=pk)
        serialized_movie = PopulatedMovieSerializer(movie)
        return Response(serialized_movie.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        movie_to_edit = self.get_movie(pk=pk)
        updated_movie = MovieSerializer(
            movie_to_edit, data=request.data)
        try:
            updated_movie.is_valid()
            updated_movie.save()
            return Response(updated_movie.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            res = {
                "detail": "Unprocessable Entity"
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        movie_to_delete = self.get_movie(request, pk=pk)
        movie_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

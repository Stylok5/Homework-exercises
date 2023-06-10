from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from rest_framework.exceptions import NotFound
from .models import Director
from .serializers.common import DirectorSerializer
from .serializers.populated import PopulatedDirectorSerializer
# Create your views here.


class DirectorListView(APIView):

    def get(self, _request):
        directors = Director.objects.all()
        print('movies', directors)
        serialized_directors = DirectorSerializer(directors, many=True)
        print('serialized movies', serialized_directors)
        return Response(serialized_directors.data, status=status.HTTP_200_OK)

    def post(self, request):
        director_to_add = DirectorSerializer(data=request.data)
        try:
            director_to_add.is_valid()
            director_to_add.save()
            return Response(director_to_add.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            res = {
                "detail": str(e)
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({"detail": "Unprocessable Entity"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class DirectorDetailView(APIView):
    def get_director(self, _request, pk):
        try:
            return Director.objects.get(pk=pk)
        except Director.DoesNotExist:
            raise NotFound(detail="Can not find a movie with that primary key")

    def get(self, request, pk):
        director = self.get_director(request, pk=pk)
        serialized_director = PopulatedDirectorSerializer(director)
        return Response(serialized_director.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        director_to_edit = self.get_director(pk=pk)
        updated_director = DirectorSerializer(
            director_to_edit, data=request.data)
        try:
            updated_director.is_valid()
            updated_director.save()
            return Response(updated_director.data, status=status.HTTP_202_ACCEPTED)
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            res = {
                "detail": "Unprocessable Entity"
            }
            return Response(res, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        director_to_delete = self.get_director(request, pk=pk)
        director_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

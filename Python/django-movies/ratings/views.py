# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializers.populated import PopulatedRatingSerializer
# from .models import Rating
# from rest_framework import status
# # Create your views here.


# class RatingListView(APIView):

#     def get(self, _request):
#         ratings = Rating.objects.filter(movie=self)
#         serialized_genres = PopulatedRatingSerializer(ratings, many=True)
#         return Response(serialized_genres.data, status=status.HTTP_200_OK)

# # Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from .serializers.common import CommentSerializer
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from .models import Comment


class CommentListView(APIView):
    # we will use the IsAuthenticated permissions as it secures all routes and we are only
    # going to need POST

    permissions_classes = (IsAuthenticated, )

    def post(self, request):
        request.data["owner"] = request.user.id
        # at this point, req.data has the user info
        comment_to_create = CommentSerializer(data=request.data)

        try:
            comment_to_create.is_valid()
            comment_to_create.save()
            return Response(comment_to_create.data, status=status.HTTP_201_CREATED)
        # IntegrityError is when the user doesn't send required fields
        except IntegrityError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # AssertionError is when the user sends an incorreect data type
        except AssertionError as e:
            return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        # catch all other errors
        except:
            return Response("Unprocessible Entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CommentDetailView(APIView):

    def delete(self, request, pk):
        try:
            comment_to_delete = Comment.objects.get(pk=pk)

            if comment_to_delete.owner != request.user:
                raise PermissionDenied()
            comment_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Comment.DoesNotExist:
            raise NotFound(detail="Comment not found")

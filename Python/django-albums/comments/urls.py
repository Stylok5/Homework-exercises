from django.urls import path  # import path from django
# import the view that will be returned when an endpoint is hit
from .views import CommentListView, CommentDetailView

urlpatterns = [
    path('', CommentListView.as_view()),  # handles /albums/
    path('<int:pk>/', CommentDetailView.as_view())
]
# albums/

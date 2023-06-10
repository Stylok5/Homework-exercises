from django.urls import path  # import path from django
# import the view that will be returned when an endpoint is hit
from .views import ArtistListView, ArtistDetailView

urlpatterns = [
    path('', ArtistListView.as_view()),  # handles /albums/
    # albums/1 (anything with a number after /albums)
    path('<int:pk>/', ArtistDetailView.as_view())
]
# albums/

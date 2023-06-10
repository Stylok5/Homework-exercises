from django.urls import path # import path from django
from .views import AlbumListView,AlbumDetailView # import the view that will be returned when an endpoint is hit

urlpatterns = [
    path('', AlbumListView.as_view()), # handles /albums/
    path('<int:pk>/',AlbumDetailView.as_view()) # albums/1 (anything with a number after /albums)
]
# albums/ 
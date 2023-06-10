from django.urls import path  # import path from django
# import the view that will be returned when an endpoint is hit
from .views import DirectorListView, DirectorDetailView

urlpatterns = [
    path('', DirectorListView.as_view()),  # handles /albums/
    # albums/1 (anything with a number after /albums)
    path('<int:pk>/', DirectorDetailView.as_view())
]
# albums/

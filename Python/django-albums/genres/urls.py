from django.urls import path # import path from django
from .views import GenreListView # import the view that will be returned when an endpoint is hit

urlpatterns = [
    path('', GenreListView.as_view()), 
    
]
# albums/ 
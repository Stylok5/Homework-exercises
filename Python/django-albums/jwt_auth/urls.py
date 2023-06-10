from django.urls import path  # import path from django
# import the view that will be returned when an endpoint is hit
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view())
]

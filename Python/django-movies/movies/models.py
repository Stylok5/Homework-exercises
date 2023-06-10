from django.db import models


class Movie(models.Model):  # inside the brackets is where its inheriting from
    title = models.CharField(max_length=50)
    director = models.ForeignKey(
        "directors.Director", related_name="movies", on_delete=models.CASCADE)
    rating = models.ForeignKey(
        "ratings.Rating", related_name="movies", on_delete=models.CASCADE)
    cover_image = models.CharField(max_length=300)
    # represents the class objects as a string, add in after
    genres = models.ManyToManyField('genres.Genre', related_name="movies")

    def __str__(self):
        return f"{self.title}"
# Create your models here.

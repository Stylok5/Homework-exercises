from django.db import models
# django has its own model class that we can use called models.model. We will extend it to create our own models

# Create your models here.


class Album(models.Model):  # it's inheriting the stuff from models.model here
    title = models.CharField(max_length=50)
    artist = models.ForeignKey(
        'artists.Artist', related_name="albums", on_delete=models.CASCADE)
    cover_image = models.CharField(max_length=300)
    # the column in the database table
    genres = models.ManyToManyField('genres.Genre', related_name="albums")
    owner = models.ForeignKey(
        'jwt_auth.User', related_name="albums", on_delete=models.CASCADE)

# this is only here to make this readable inside the admin app.
    def __str__(self):
        return f"{self.title} - {self.artist} "

from django.db import models
# Create your models here.


class Comment(models.Model):
    # TextField will render a text area in the admin UI so its easier to add longer strings
    text = models.TextField(max_length=300)
    # Timestap when the comment is created
    created_at = models.DateTimeField(auto_now_add=True)
    album = models.ForeignKey(
        'albums.Album',
        # we will have a comments key on the album serializer, so we can specify it here
        related_name='comments',
        on_delete=models.CASCADE  # delete the comment if the album is deleted
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='comments',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.text}"

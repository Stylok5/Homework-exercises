from django.db import models

# Create your models here.


class Comment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    movie = models.ForeignKey(
        "movies.Movie", related_name="comments", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.text}"

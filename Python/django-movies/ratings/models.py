from django.db import models


class Rating(models.Model):
    number = models.IntegerField()

    def __str__(self):
        return f"Rating: {self.number}/10 "

# Create your models here.

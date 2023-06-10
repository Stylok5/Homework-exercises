from django.db import models


class Artist(models.Model):
    # Explain that it's text as it's a bigger box in admin view
    name = models.TextField(max_length=30)

    def __str__(self):
        return f"{self.name}"

# Create your models here.

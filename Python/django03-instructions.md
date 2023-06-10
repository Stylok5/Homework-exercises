## ADDING A SECOND APP

1. Let's add a `genres` app to our project.

```bash
django-admin startapp genres
```

2. Register the genres app in our `project/settings.py`

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # register rest framework above our own apps
    'albums',  # we add the name of the app here so the project knows it exists
    'genres',
]
```

3. Go to `genres/models.py` and create a model

```py
from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.name}"
```

4. Now let's register the model in the admin app. Go to `genres/admin.py`

```py
from django.contrib import admin
from .models import Genre

admin.site.register(Genre)
```

5. Now let's make some serializers. We are going to need 2 - one as a common serializer and one to populate the albums. In the genres app, create a new folder called serializers and in there, create a new file called `common.py`

```bash
mkdir serializers && cd serializers && touch common.py
```

6. In the `common.py` file, create a serializer for the genres

```py
from rest_framework import serializers # import serializers
from ..models import Genre # import the model (note the 2 dots on this to go up a level in the tree)

class GenreSerializer(serializers.ModelSerializer):

    class Meta: # determines the shape of our JSON
        model = Genre # name of the model it needs to make some JSON from
        # fields = ('id', 'title') # <- can specify specific fields with a tuple
        fields = '__all__'
```

7. Now let's make a `PopulatedGenreSerializer`. Create a new file in the serializers directory called `populated.py` We will import the AlbumSerializer and use it to populate a key called albums.

```py
from .common import GenreSerializer
from albums.serializers import AlbumSerializer


class PopulatedGenreSerializer(GenreSerializer):

    albums = AlbumSerializer(many=True)
```

8. HOLD UP! We have a change to make. We need to update the albums model to have a genres key. It's also going to be what is known as a `Foreign Key` and it's going to relate to the `albums` key that we have on the `PopulatedGenreSerializer`. Update the albums model

```py
class Album(models.Model):  # the Album class is inheriting properties from models.Model
    # this creates the title column and says the data type is a Char(50)
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    cover_image = models.CharField(max_length=300)
    genres = models.ManyToManyField('genres.Genre', related_name="albums") # <- THIS RELATED NAME IS THE KEY

    # this function represents the class objects as a string in the admin app
    def __str__(self):
        return f"{self.title} - {self.artist}"
```

8. Now let's create some views for the genres. Go to `genres/views.py`

```py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedGenreSerializer
from .models import Genre


class GenreListView(APIView):

    def get(self, _request):
        genres = Genre.objects.all()
        serialized_genres = PopulatedGenreSerializer(genres, many=True)
        return Response(serialized_genres.data, status=status.HTTP_200_OK)
```

9. And now let's create the `urls.py` file

```py
from django.urls import path
from .views import GenreListView

urlpatterns = [
    path('', GenreListView.as_view())
]
```

10. Finally, let's add the genres urls to the `project/urls.py`

````py
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/albums/', include('albums.urls')),
    path('api/genres/', include('genres.urls'))
]





5:14
### SESSION 1 (RELATIONSHIPS EXPLAINED & SQL)

1. Explain what the relationships are - OneToMany and ManyToMany

- Equivalent of Referenced and Embedded models
- OneToMany first
- OneToMany would represent something like comments.
  So a comment can only relate to one show but a
  show can relate to many comments. In this example,
  the show is the one and the comments are the many

2. go to https://app.quickdatabasediagrams.com

- Explain the difference and similarities between embedded and oneToMany
- "So in a relational database, instead of being embedded in a parent
  document, the comments would have their own table and they would have
  a column that relates directly to it's parent, or in this case it's one.
  In non-relational databases this schema would be embedded straight into
  the document itself"
- "You're welcome to use something like this to represent your database
  visually, but you don't have to. Good old fashioned pen and paper is okay"

3. Go into TablePlus and create a new db called cheesebored-relationships,
   then add the following: (GO TO relationships.sql)

### SESSION 2 (MORE DJANGO RELATIONSHIPS - Artists & Comments)

## COMMENTS

1. Create a comments app using `django-admin startapp comments`
2. Add 'comments' to INSTALLED APPS list in settings.py
3. Create model in comments/models.py:

```py
class Comment(models.Model):
    # Explain that it's text as it's a bigger box in admin view
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    album = models.ForeignKey(
        "albums.Album",  # this defines where the relationship is - in the shows app on the Show model
        related_name="comments",  # This is what the column will be called on the show lookup
        # This specifies that the comment should be deleted if the show is deleted
        on_delete=models.CASCADE
    )
````

4. Add this model to admin.py:

```py
from .models import Comment
admin.site.register(Comment)
```

5. Make migrations, then start server:

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```

```bash
python manage.py runserver
```

6. Go to TablePlus and switch db to django-albums and view the comments table to show what has been created:

"So we can see that this final column has been created, and this was done for us by django in the model" - album models.py

7. go to http://localhost:8000/admin and add a comment, show that the dropdown has all the shows in it. Then go to TablePlus and view the comment that's just been added.

8. "Next thing we want to do is essentially populate the response that we get when we make requests to return all albums. You might remember when we used .populate() in mongo to get all the owner's info returning instead of just their id, well we're going to be doing something very similar here, just in a slighlty different way with a few more steps. So we need to create a Serializer for our comments."

Let's create a serializers folder and common.py file inside.

```py
from rest_framework import serializers
from ..models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
```

9. In the albums app, let's edit the populated serializer. Import the CommentSerializer and add it to the PopulatedAlbumSerializer.

```py
class PopulatedAlbumSerializer(AlbumSerializer):
    genres = GenreSerializer(many=True)
    comments = CommentSerializer(many=True)
```

As we use the PopulatedAlbumSerializer when we request the AlbumDetailView, we should be able to see our comments populated when we make a request for a single album.

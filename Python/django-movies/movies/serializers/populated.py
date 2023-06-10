from .common import MovieSerializer
from genres.serializers.common import GenreSerializer
from comments.serializers.common import CommentSerializer
from ratings.serializers.common import RatingSerializer
from directors.serializers.common import DirectorSerializer


class PopulatedMovieSerializer(MovieSerializer):
    genres = GenreSerializer(many=True)
    comments = CommentSerializer(many=True)
    rating = RatingSerializer()
    director = DirectorSerializer()

from .common import GenreSerializer
from movies.serializers.common import MovieSerializer


class PopulatedGenreSerializer(GenreSerializer):
    movies = MovieSerializer(many=True)

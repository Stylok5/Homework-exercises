from .common import DirectorSerializer
from movies.serializers.common import MovieSerializer


class PopulatedDirectorSerializer(DirectorSerializer):
    movies = MovieSerializer(many=True)

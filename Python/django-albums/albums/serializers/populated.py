from .common import AlbumSerializer
from genres.serializers.common import GenreSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from artists.serializers.common import ArtistSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedAlbumSerializer(AlbumSerializer):
    genres = GenreSerializer(many=True)
    comments = PopulatedCommentSerializer(many=True)
    artist = ArtistSerializer()
    owner = UserSerializer()

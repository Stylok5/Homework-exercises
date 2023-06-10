from .common import ArtistSerializer
from albums.serializers.common import AlbumSerializer


class PopupaletdArtistSerializer(ArtistSerializer):
    albums = AlbumSerializer(many=True)

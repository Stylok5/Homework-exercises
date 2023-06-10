from .common import GenreSerializer
from albums.serializers.common import AlbumSerializer

class PopulatedGenreSerializer(GenreSerializer): # extending the GenreSerializer gives us the name and id of the genre
 #then we add the albums using the AlbumeSerializer. Each album has the ID of the genres, so 
 #the serializer goes and matches all albums with the ID of the genre it is deserializing and 
 #adds that data in
 albums = AlbumSerializer(many=True)

 #this will just
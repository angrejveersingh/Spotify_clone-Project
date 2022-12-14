import { Image, StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { spotifyApi } from './commonUtils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { addAlbumTracks, setPlaylistSong } from '../Components/redux/musicSlice';


const LibraryCard = ({ title, img, artists, songUri, playlistId, isArtistScreen }) => {
  const dispatch = useDispatch();
  const songToBeAdded = useSelector((state) => state.music.songToBeAdded);
  console.log('songToBeAdded: ', songToBeAdded);

  const navigation = useNavigation();

  const addTracksToPlaylist = () => {
    spotifyApi.addTracksToPlaylist(playlistId, [songUri])
      .then(function (data) {
        alert("Added track to playlist!");
        dispatch(setPlaylistSong({ songId: null }))

        navigation.navigate("Player")
      }, function (err) {
        console.error('Something went wrong!', err);
        dispatch(setPlaylistSong({ songId: null }))
      });
  }

  const getArtistSongs = () => {
    spotifyApi
      .getArtistTopTracks(playlistId, 'US')
      .then(
        function (data) {
          const albumTracks = []
          for (let y = 0; y < data.body.tracks.length; y++) {
            var trackArtistName = data.body.tracks[y].artists[0].name;
            var albumTrackImage = data.body.tracks[y].album.images[0].url;
            var albumTrackName = data.body.tracks[y].name;
            var albumTrackUrl = data.body.tracks[y].preview_url
            var uri = data.body.tracks[y].uri

            albumTracks.push({
              trackArtistName: trackArtistName,
              albumTrackImage: albumTrackImage,
              albumTrackName: albumTrackName,
              albumTrackUrl: albumTrackUrl,
              uri,
            });
          }
          dispatch(addAlbumTracks(albumTracks));
          navigation.navigate("PlaylistSongs", { img: img, title: title, albumTracks });
        },
        function (err) {
          console.error("Something went wrong!", err);
        }
      );
  }

  const openPlaylist = () => {
    spotifyApi
      .getPlaylistTracks(playlistId)
      .then(
        function (data) {
          const albumTracks = []
          for (let y = 0; y < data.body.items.length; y++) {
            var trackArtistName = data.body.items[y].track.artists[0].name;
            var albumTrackImage = data.body.items[y].track.album.images[0].url;
            var albumTrackName = data.body.items[y].track.name;
            var albumTrackUrl = data.body.items[y].track.preview_url
            var uri = data.body.items[y].track.uri

            albumTracks.push({
              trackArtistName: trackArtistName,
              albumTrackImage: albumTrackImage,
              albumTrackName: albumTrackName,
              albumTrackUrl: albumTrackUrl,
              uri,
            });
          }
          dispatch(addAlbumTracks(albumTracks));
          navigation.navigate("PlaylistSongs", { img: img, title: title, albumTracks });
        },
        function (err) {
          console.error("Something went wrong!", err);
        }
      );
  }



  return (
    <TouchableOpacity style={styles.container}
      onPress={() => {
        if (songToBeAdded) {
          addTracksToPlaylist()
        } else if (isArtistScreen) {
          getArtistSongs()
        } else {
          openPlaylist()
        }
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ height: 50, width: 50, marginRight: 16 }} source={{ uri: img }} />
        <View>
          <Text style={styles.text} numberOfLines={1}>{title}</Text>
          <Text style={styles.subText} numberOfLines={1}>{artists}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default LibraryCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    minHeight: 80,
    maxHeight: 80,

    marginRight: 20
  },
  text: {
    color: "white",
    marginTop: 10,
    fontWeight: "800"
  },
  subText: {
    color: "gray",
    marginTop: 4,
    fontWeight: "800"
  }
})
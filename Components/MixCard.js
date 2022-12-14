import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { spotifyApi, TOKEN } from '../screens/commonUtils';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryPlaylist } from './redux/musicSlice';

const MixCard = ({title,img,id, nav}) => {
//getPlaylistTracks("37i9dQZF1DXcBWIGoYBM5M", { limit: 10, offset: 1 })

console.log("CAT ID", id);
  spotifyApi.setAccessToken(TOKEN);
  const dispatch = useDispatch();
 

  var playlistData = [];
  const handlePress = ()=>{

    spotifyApi.getPlaylistsForCategory(id, {
      country: 'IN',
      limit : 2,
      offset : 0
    })
  .then(function(data) {
    console.log("Category Playlist",data.body.playlists.items[0].id);
      
spotifyApi.getPlaylistTracks(data.body.playlists.items[0].id, { limit: 10, offset: 1 })
  .then(function(data) {
    console.log("Category Playlist",data.body);
    let playlist = data.body;
      for (let index = 0; index < 10; index++) {
        var artistName = playlist.items[index].track.album.artists[0].name;
        var image = playlist.items[index].track.album.images[0].url;
        var url = playlist.items[index].track.preview_url;
        var SongName = playlist.items[index].track.name;
        var id = playlist.items[index].track.id
        var songUri = playlist.items[index].track.uri

        playlistData.push({
          artistName: artistName,
          songImage: image,
          urlSong: url,
          songName: SongName,
          id: id,
          songUri: songUri
        });
        
      }
      dispatch(setCategoryPlaylist(playlistData));
      nav.navigate("Category",{playlistData})
      
  }, function(err) {
    console.log("Something went wrong!", err);
  });
  }, function(err) {
    console.log("Something went wrong!", err);
  });
    
 
  }
  return (
    <TouchableOpacity onPress={handlePress}>
    <View style={styles.container}>
      
      <Image style={{height:160,width:160}} source={{uri:img}}/>
      <Text style={styles.text} numberOfLines={1}>{title}</Text>
      {/* <Text style={styles.subText} numberOfLines={1}>{artists}</Text> */}
     
    </View>
    </TouchableOpacity>
  )
}

export default MixCard

const styles = StyleSheet.create({
  container:{
    flex:1,
    overflow:"hidden",
    minHeight:220,
    maxHeight:220,
    maxWidth:160,
    marginRight:20
  },
  text:{
    color:"white",
    marginTop:10,
    fontWeight:"800"
  },
  subText:{
    color:"gray",
    marginTop:4,
    fontWeight:"800"
  }
})
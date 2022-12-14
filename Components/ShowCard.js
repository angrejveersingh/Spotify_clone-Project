import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react';
import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import {
  addAlbumTracks
} from "../Components/redux/musicSlice";
import { spotifyApi, TOKEN } from '../screens/commonUtils';


const Stack = createStackNavigator();


const ShowCard = ({id, img,title,artists, nav}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.music.token);
  var albumTracks = [];
  // The code that's returned as a query parameter to the redirect URI

  // Retrieve an access token and a refresh token
  spotifyApi.setAccessToken(TOKEN);
  spotifyApi.setRefreshToken(`${token}`);
  //try {
    function getTracks(){
      spotifyApi
            .getAlbumTracks(id, { limit: 10, offset: 1 })
            .then(
              function (data) {
                for(let y=0; y<data.body.items.length; y++){
                 

                    var trackArtistName = data.body.items[y].artists[0].name;
                    var artistId = data.body.items[y].artists[0].id;
                  
                  var albumTrackImage = img;
                  var albumTrackName = data.body.items[y].name;
                  var albumTrackUrl = data.body.items[y].preview_url
                  var uri = data.body.items[y].uri

                  albumTracks.push({
                    trackArtistName: trackArtistName,
                    albumTrackImage: albumTrackImage,
                    albumTrackName: albumTrackName,
                    albumTrackUrl: albumTrackUrl,
                    uri,
                    artistId,
                  });
                    
             
                  
                }
                dispatch(addAlbumTracks(albumTracks));
                nav.navigate("Album", {img:img,title:title,albumTracks});
              },
              function (err) {
                console.error("Something went wrong!", err);
              }
            );
    }

  return (
    
    <TouchableOpacity style={styles.container}
    onPress={()=>{
      getTracks();
      
    }}>
      <Image style={{height:160,width:160,borderRadius:20}} source={{uri:img}}/>
      <Text style={styles.text} numberOfLines={1}>{title}</Text>
      <Text style={styles.subText} numberOfLines={1}>Artist • {artists} </Text>
    </TouchableOpacity>
  )
}

export default ShowCard

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
  },
  
})
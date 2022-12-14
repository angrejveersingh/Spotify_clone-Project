import React, {useEffect} from "react";
import SearchBar from "../Components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import PlaylistCard from "../Components/PlaylistSearch";
import uuid from 'react-native-uuid';
import { LinearGradient } from "expo-linear-gradient";
import { spotifyApi, TOKEN } from "./commonUtils";
import {addSearchDetails} from "../Components/redux/musicSlice";



const Search = () => {

    const dispatch = useDispatch();
    var songs = [];
  var finalValue = "";
  var finalArray = [];
  var testArray = [];
  const value = useSelector((state) => state.music.searchedText);
   const value2 = useSelector((state) => state.music.cardeData);
  // const value3 = useSelector((state) => state.rent.cardeData);

  const songData = useSelector((state) => state.music.searchDetails);
  console.log("checkkkkkkkk",songData)
  
  console.log("SongData",songs)

  //finalArray = [...value2];
 // finalArray = [...cardeData];

  // finalArray.push(...value2);

  if (value == "") {
    finalValue = "";
  }

  if (value != "") {
    for (let index = 0; index < songData.length; index++) {
      if (
        songData[index].songName
          .toUpperCase()
          .trim()
          .replace(/\s/g, "")
          .includes(value.toUpperCase().trim().replace(/\s/g, "")) ||  songData[index].singerName
          .toUpperCase()
          .trim()
          .replace(/\s/g, "")
          .includes(value.toUpperCase().trim().replace(/\s/g, ""))
      ) {

        // if (testArray.length == 0) {
            testArray.push(songData[index]);
            
        // }else{
        // for (let j = 0; j < testArray.length; j++) {
        //     if (songData[index].songUri != testArray[j].songUri) {
        //         testArray.push(songData[index]);
        //     }
            
        // }
       
        // }
       
    }
    }
   
  }

  finalValue = testArray;
  console.log("Final Value",finalValue);

 

  useEffect(()=>{
    spotifyApi.setAccessToken(TOKEN);
    if (value != "") {
        
    spotifyApi.searchTracks(value).then(
        function (data) {
        
            // console.log('Search by "Love"', data);
           var recommendations = data.body;
           //console.log("Track",recommendations.tracks.items[0].preview_url);
          for (let index = 0; index < 20; index++) {
            if (recommendations.tracks.items[0].preview_url != "") {
              var artistName = recommendations.tracks.items[index].album.artists[0].name;
              var artistId = recommendations.tracks.items[index].album.artists[0].id;
              var songImage = recommendations.tracks.items[index].album.images[0].url;
              var urlSong = recommendations.tracks.items[index].preview_url;
              let songUri = recommendations.tracks.items[index].uri;
              var songName = recommendations.tracks.items[index].name;
              songs.push({
                artistName: artistName,
                songImage: songImage,
                urlSong: urlSong,
                songName: songName,
                artistId,
                songUri
              });
            }}

            dispatch(addSearchDetails(songs));
            //console.log("Final array", songs);
        },
        function (err) {
          console.error(err);
        }
      );

    }
    
  }, [value])

  return (
    <SafeAreaView>
    <LinearGradient
      colors={["#8a0a0a", "#111", "#111", "#111", "#111", "#111"]}
      start={{ x: -0.1, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      locations={[0.01, 0.2, 0.3, 1, 1, 1]}
    >
        <SearchBar></SearchBar>
         <ScrollView style={{ minHeight: 600}}>
    <View>
     
        
      
      <View>
        {finalValue === "" ? (
          <Text>Please type something</Text>
        ) : (
        <View style={styles.container}>
          <TouchableOpacity>
           
            {finalValue.map((dat) => (
               <View key={uuid.v4()} style={styles.container}>
                <PlaylistCard 
                data= {dat}
                key={uuid.v4()}
                singerName={dat.singerName}
                img={dat.image}
                url={dat.url}
                songName={dat.songName}
                artistId={dat.artistId}
                songUri={dat.songUri}
              />
              </View>
            ))}
          </TouchableOpacity> 
          </View>
        )}
      
      </View>
    </View>
    </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
    container: {
   //flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft:10,
    //marginTop: 40,
   // justifyContent: "center",
    alignItems: "center",
    //maxHeight: 210,
    width:100
     
    }

});

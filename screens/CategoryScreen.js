import React, {useEffect} from "react";
import SearchBar from "../Components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import PlaylistCard from "../Components/PlaylistSearch";
import uuid from 'react-native-uuid';
import { LinearGradient } from "expo-linear-gradient";
import { spotifyApi, TOKEN } from "./commonUtils";
import {addSearchDetails} from "../Components/redux/musicSlice";



const Category = ({route}) => {

    const dispatch = useDispatch();
    var songs = [];
  var finalValue = "";
  var finalArray = [];
  var testArray = [];
  const tracksData = useSelector((state) => state.music.playlistTracks);
  // const value2 = useSelector((state) => state.music.cardeData);
  // const value3 = useSelector((state) => state.rent.cardeData);

  
  return (
    <SafeAreaView>
    <LinearGradient
      colors={["#8a0a0a", "#111", "#111", "#111", "#111", "#111"]}
      start={{ x: -0.1, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      locations={[0.01, 0.2, 0.3, 1, 1, 1]}
    >
       
         <ScrollView style={{ minHeight: 600}}>
    <View>
     
        
      
      <View>
      <TouchableOpacity>
           
           {route.params.playlistData.map((dat) => (
              <View key={uuid.v4()} style={styles.container}>
               <PlaylistCard 
               data= {dat}
               key={uuid.v4()}
               singerName={dat.artistName}
               img={dat.songImage}
               url={dat.urlSong}
               songName={dat.songName}
               artistId={dat.id}
               songUri={dat.songUri}
             />
             </View>
           ))}
         </TouchableOpacity> 
      
      </View>
    </View>
    </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
    container: {
   //flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft:10,
    //marginTop: 40,
   // justifyContent: "center",
    alignItems: "center",
    maxHeight: 210,
    width:100
     
    }

});

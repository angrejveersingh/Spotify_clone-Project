import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Components/Header";
import PlaylistCard from "../Components/PlaylistCard";
import ShowCard from "../Components/ShowCard";
import MixCard from "../Components/MixCard";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import Album from './Album';
import {
  changeToken,
  addTransDetails,
  addCategories,
  addAlbums,
  addAlbumTracks,
  setPlaylists,
  setFollowedArtists
} from "../Components/redux/musicSlice";
import { spotifyApi, TOKEN } from "./commonUtils";
import uuid from 'react-native-uuid';


const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.music.themeColor);
  var id1 = "";
  var id2 = "";

  const language = useSelector((state) => state.music.language);

  var countryCode= "";

  if (language == "English") {
    countryCode = "CA"
  }else{
    countryCode = "IN"
  }

  switch (language) {
    case "Tamil":
      id1= "5VVN3xZw1i2qihfITZlvCZ";
      id2= "6AiX12wXdXFoGJ2vk8zBjy"
      break;

    case "English":
      id1= "74KM79TiuVKeVCqs8QtB0B";
      id2= "06HL4z0CvFAxyc27GXpf02"
      break;

    case "Punjabi":
      id1= "4PULA4EFzYTrxYvOVlwpiQ";
      id2= "1x02ug1CLkx7mrQP9FRswh"
      break;

    case "Hindi":
      id1= "09UmIX92EUH9hAK4bxvHx6";
      id2= "1wRPtKGflJrBx9BmLsSwlU"
      break;
  
    default:
      break;
  }
  var song1 = [];
  var categories = [];
  var albums = [];
  var artistName;
  var songName;
  var urlSong;
  var songImage;

  const songData = useSelector((state) => state.music.songDetails);
  console.log('songData: ', songData);

  const categoriesData = useSelector((state) => state.music.categories);

  const getNewReleases = async () => {
    try {
      const albumsCount= 20;
      const data = await spotifyApi.searchAlbums(language);
      let albm = data.body;
      for (let index = 0; index < albumsCount; index++) {
        if (albm.albums.items[index].total_tracks >= 3) {
        let artistName = albm.albums.items[index].artists[0].name;
        let artistId = albm.albums.items[index].artists[0].id;
        let albumImage = albm.albums.items[index].images[0].url;
        let albumName = albm.albums.items[index].name;
        let id = albm.albums.items[index].id;

        albums.push({
          artistName: artistName,
          albumImage: albumImage,
          albumName: albumName,
          albumId: id,
          artistId,
        });
          
        }
        
      }
      dispatch(addAlbums(albums));
    }
    catch (e) {
      console.error('e: ', e);

    }
  }

  const getCategories = async () => {

    spotifyApi.getPlaylistsForCategory('0JQ5DAqbMKFHCxg5H5PtqW', {
      country: 'IN',
      limit : 5,
      offset : 0
    })
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.log("Something went wrong!", err);
  });

    try {
      const data = await spotifyApi
        .getCategories({
          limit: 4,
          offset: 0,
          country: countryCode,
          locale: `sv_${countryCode}`,
        })
      let cat = data.body;
        console.log("Cat", cat.categories.items[0].id);
      for (let index = 0; index < 4; index++) {
        var categoryName = cat.categories.items[index].name;
        var categoryImage = cat.categories.items[index].icons[0].url;
        var id = cat.categories.items[index].id;
        categories.push({
          categoryName: categoryName,
          image: categoryImage,
          id: id
        });
      }

      dispatch(addCategories(categories));
    }
    catch (e) {
      console.error('e: ', e);

    }
  }

  const getUserPlaylists = async () => {
    try {
      const data = await spotifyApi.getUserPlaylists()
      let playlists = data.body?.items;
      dispatch(setPlaylists(playlists));
    }
    catch (e) {
      console.error('e: ', e);
    }
  }

  const getRecommendations = async () => {
    spotifyApi.getRecommendations({
      min_energy: 0.4,
      seed_artists: [id1, id2],
      min_popularity: 50
    })
  .then(function(data) {
    let recommendations = data.body;
    let songs = []
      for (let index = 0; index < 20; index++) {
        if (recommendations.tracks[index].preview_url) {
          artistName = recommendations.tracks[index].album.artists[0].name;
          let artistId = recommendations.tracks[index].album.artists[0].id;
          songImage = recommendations.tracks[index].album.images[0].url;
          urlSong = recommendations.tracks[index].preview_url;
          let songUri = recommendations.tracks[index].uri;
          songName = recommendations.tracks[index].name;
          songs.push({
            artistName: artistName,
            songImage: songImage,
            urlSong: urlSong,
            songName: songName,
            artistId,
            songUri
          });
        }
      }

      dispatch(addTransDetails(songs))
  }, function(err) {
    console.error("Something went wrong!", err);
  });
  }

  useEffect(() => {
    
    spotifyApi.setAccessToken(TOKEN);
    
    // spotifyApi.setAccessToken(token);
    getNewReleases()
    getRecommendations()
    getCategories()
    getUserPlaylists()

    spotifyApi.getMe()
  .then(function(data) {
    console.log('User info:', data.body);
  }, function(err) {
    console.error('Something went wrong!', err);    

  });
  }, [])


  const albumsData = useSelector((state) => state.music.albums);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
      <LinearGradient
        colors={themeColor}
        start={{ x: -0.1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        locations={[0.01, 0.2]}
      >
        <ScrollView >
          <View style={styles.subContainer}>
            <Header nav= {navigation}/>

            <View style={styles.cardContainer}>
              {songData.map((dat) => (
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
              ))}
            </View>

            <View style={styles.showContainer}>
              <Text style={styles.text}>Albums</Text>
              <ScrollView horizontal={true}>
                {albumsData.map((dat) => (
                  <ShowCard
                    nav={navigation}
                    key={uuid.v4()}
                    id={dat.id}
                    title={dat.albumName}
                    artists={dat.name}
                    img={dat.image}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.bestContainer}>
              <Text style={styles.text}>Categories</Text>
              <ScrollView horizontal={true}>
                {categoriesData.map((dat) => (
                  <MixCard key={uuid.v4()} title={dat.name} id={dat.id} img={dat.image} nav={navigation} />
                ))}
              </ScrollView>
            </View>
            {/* <View style={styles.bestContainer}>
              <Text style={styles.text}>Trending Now</Text>
              <ScrollView horizontal={true}>
                {trendingData.map((dat) => (
                  <TrendingCard
                    key={dat.title}
                    title={dat.title}
                    artists={dat.artists}
                    img={dat.img}
                  />
                ))}
              </ScrollView>
            </View> */}
          </View>
        </ScrollView>
      </LinearGradient>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 210,
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  showContainer: {
    marginTop: 30,
    flex: 1,
    minHeight: 60,
  },

});

const Stack = createStackNavigator();
function AlbumComponent() {


  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeS" component={HomeScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }} />
      <Stack.Screen name="Album" component={Album}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }} />

    </Stack.Navigator>
  )
}

export default AlbumComponent;

import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View,Switch, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import UserActivityCard from '../Components/UserActivityCard';
import HeaderUserActivity from '../Components/HeaderUserActivity';
import { AntDesign } from '@expo/vector-icons';
import LibraryScreen from './LibraryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Album from './Album';
import ArtistsList from './ArtistsList';
import { spotifyApi } from './commonUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowedArtists, setTheme } from '../Components/redux/musicSlice';


function UserActivity({ navigation }) {

  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.music.themeColor);
  
  const [ThemeSettingsColor, setThemeSettingsColor] = useState(['#7F8C8D', '#000000']);
 
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>
  {
     setIsEnabled(previousState => !previousState)
    var themeColor = []
    console.log("Swtich", isEnabled);
    if(isEnabled){
      themeColor = (['#7F8C8D', '#000000']);
      dispatch(setTheme(themeColor))
      setThemeSettingsColor(themeColor)
      console.log("true");
    }
    else{
      themeColor = (["#B3F6D8", "#52A7C1"])
      dispatch(setTheme(themeColor)) 
      console.log("Run time color ", themeColor)
      setThemeSettingsColor(themeColor)
      console.log("false");
    }
  };


  const persons = [
    {
      name: "1",
      image: "https://selectyourtickets.com/wp-content/uploads/2018/03/Babbu-maan-group-image.jpg"
      , artists: "Rajdeep Bhullar"
    },
    {
      name: "1",
      image: "https://selectyourtickets.com/wp-content/uploads/2018/03/Babbu-maan-group-image.jpg"
      , artists: "Rajdeep Bhullar"
    },

    {
      name: "1",
      image: "https://selectyourtickets.com/wp-content/uploads/2018/03/Babbu-maan-group-image.jpg"
      , artists: "Rajdeep Bhullar"
    },
    {
      name: "1",
      image: "https://selectyourtickets.com/wp-content/uploads/2018/03/Babbu-maan-group-image.jpg"
      , artists: "Rajdeep Bhullar"
    },

  ];

  const getFollowedArtists = async () => {
    try {
      const data = await spotifyApi.getFollowedArtists()
      let followedArtists = data.body.artists.items;
      dispatch(setFollowedArtists(followedArtists));
      navigation.navigate('Artists')
    }
    catch (e) {
      console.error('e: ', e);
    }
  }


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={ThemeSettingsColor}
        start={{ x: -0.1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        locations={[0.01, 0.2]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.subContainer}>
            <HeaderUserActivity />
            <View style={styles.bestContainer}>

              <ScrollView horizontal={true}>
                {persons.map((dat, i) => (
                  <UserActivityCard key={i} title={dat.name} img={dat.image} artists={dat.artists} />
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Playlist')}>
              <View style={styles.listView}>
                <Text style={styles.text}>Playlists</Text>
                <AntDesign name="arrowright" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={getFollowedArtists}>
              <View style={styles.listView}>
                <Text style={styles.text}>Artists</Text>
                <AntDesign name="arrowright" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <View style={styles.listView}>
              <Text style={styles.text}>Songs</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
            <View style = {styles.listView}>
               <Text style = {styles.text}> Click to change the theme</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              />
              </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

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
  listView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }

})

const Stack = createStackNavigator();
function AlbumComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserActivityList" component={UserActivity}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }} />
      <Stack.Screen name="Playlist" component={LibraryScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }} />
      <Stack.Screen name="PlaylistSongs" component={Album}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }} />
      <Stack.Screen name="Artists" component={ArtistsList}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }} />

    </Stack.Navigator>
  )
}

export default AlbumComponent;
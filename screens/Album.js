import React from "react";
import PlaylistCard from "../Components/PlaylistSearch";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Album = ({ route }) => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#8a0a0a", "#111", "#111", "#111", "#111", "#111"]}
        start={{ x: -0.1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        locations={[0.01, 0.2, 0.3, 1, 1, 1]}
      >
          <ScrollView>
        <View style={{ minHeight: 900}}>
            <View style={styles.subContainer}>
              <Image
                style={styles.imageStyle}
                source={{ uri: route.params.img }}
              />
              <Text style={styles.text}>{route.params.title}</Text>
              
            </View>
            <View style={styles.cardContainer}>
            {route.params.albumTracks.map((dat) => (
                <PlaylistCard 
                  key={dat.albumTrackName}
                  singerName={dat.trackArtistName}
                  img={dat.albumTrackImage}
                  url={dat.albumTrackUrl}
                  songName={dat.albumTrackName}
                  songUri={dat.uri}
                  artistId={dat.artistId}
                />
              ))}
            </View>
        </View>
          </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    // textAlign:"center",
    alignItems: "center",
    flex: 1,
  },
  imageStyle: {
    height: 200,
    width: 200,
    marginTop: 10,
  },
  cardContainer: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
   // maxHeight: 210,
  },
  
  text: {
    color: "white",
    marginTop: 20,
    // marginLeft:30,
    fontWeight: "800",
  },
  // text: {
  //   color: "white",
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  // },
  showContainer: {
    marginTop: 30,
    flex: 1,
    minHeight: 60,
  },
});

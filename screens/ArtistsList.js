import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HeaderLibraryActivity from './HeaderLibraryActivity';
import LibraryCard from "./LibraryCard";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { spotifyApi } from './commonUtils';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function ArtistsList(props) {
  const followedArtists = useSelector((state) => state.music.followedArtists);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <HeaderLibraryActivity title="Followed Artists"/>
        <View style={styles.bestContainer}>
          <ScrollView >
            {followedArtists.map((dat, i) => (
              <LibraryCard isArtistScreen={true} key={dat.id} playlistId={dat.id} title={dat.name} img={dat.images[0].url}/>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingRight: 15, backgroundColor: 'black',
    paddingLeft: 15, flex: 1
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
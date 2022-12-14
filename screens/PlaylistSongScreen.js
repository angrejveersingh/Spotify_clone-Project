import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import HeaderLibrarySong from './HeaderLibrarySong';
import LibraryCard from "./LibraryCard";
import { AntDesign } from '@expo/vector-icons';

export default function App() {

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


  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.subContainer}>
        <HeaderLibrarySong />
        <View>
          <ScrollView >
            {persons.map((dat, i) => (
              <LibraryCard key={i} title={dat.name} img={dat.image} artists={dat.artists} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
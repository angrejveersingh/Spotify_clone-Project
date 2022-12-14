import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import TrendingCard from "./TrendingCard";
import { Audio } from "expo-av";
import { useState } from 'react';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";

import { changeSoundObject, chan, changeTimings, setCurrentPlayingSong } from './redux/musicSlice';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';


const PlaylistCard = ({ singerName, img, url, songName, data, songUri, artistId }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const value = useSelector((state) => state.music.value);
  const currentSoundObj = useSelector((state) => state.music.currentSoundObj);
  async function playSound(s) {
    if (currentSoundObj) {
      try {
        currentSoundObj.unloadAsync()
      } catch (e) {
        console.error('e: ', e);
      }
    }
    var { sound } = await Audio.Sound.createAsync(
      { uri: s.url },
      { shouldPlay: true },
      (status) => {
        console.log('status: ', status);
        dispatch(changeTimings({ durationMillis: status.durationMillis, positionMillis: status.positionMillis }))
      });
    sound.setProgressUpdateIntervalAsync(100)
    dispatch(changeSoundObject(sound));
    dispatch(setCurrentPlayingSong({ singerName, img, url, songName, data, songUri, artistId }))
    sound.playAsync()
      .then((res) => {
      })
      .catch((error) => {
        console.error("Playing error", error)
      })
  }



  return (
    <TouchableOpacity key={uuid.v4()} style={styles.container} onPress={() => {
      playSound({ url });
      navigation.navigate("Player", {singerName, songName, image: img, songUri, artistId})
    }}>
      <Image style={{ height: 60, width: 60 }} source={{ uri: `${img}` }} />
      <View style={styles.textCont}>
        <Text style={styles.text}>{singerName}</Text>
        <Text style={{ color: "gray" }}>{songName}</Text>
      </View>
    </TouchableOpacity>
  );
}



export default PlaylistCard



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // minWidth: 170,
    // maxWidth: 210,
    // maxHeight: 60,
    // backgroundColor: "rgba(51,51,51,0.7)",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // borderRadius: 4,
    // overflow: "hidden",
    // marginRight: 8,
    // marginBottom: 8

    width: 300,
    maxHeight: 60,
    backgroundColor:"rgba(51,51,51,0.7)",
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "space-between",
   borderRadius: 4,
   overflow: "hidden",
   marginRight: 8,
   marginLeft:30,
   marginBottom: 8
  },
  textCont: {
    textAlign: "center",
    width: "55%"
  },
  text: {
    color: "white"
  }
})
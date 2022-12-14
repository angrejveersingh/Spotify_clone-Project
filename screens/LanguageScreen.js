import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import * as tokenAction from "../Components/token";
import axios from "axios";
import {
  changeToken, setLanguage,
} from "../Components/redux/musicSlice";
import Header from "../Components/Header";
import { useSelector, useDispatch } from "react-redux";
import { spotifyApi } from "./commonUtils";
import HomeScreen from './HomeScreen';

const discovery = {
    authorizationEndpoint: 
    "https://accounts.spotify.com/authorize",
    tokenEndpoint: 
    "https://accounts.spotify.com/api/token",
  };

const LanguageScreen = () => {
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.music.themeColor);
  const selectedLanguage = useSelector((state) => state.music.language);
  
  const token = useSelector((state) => state.music.accessToken);

      const  GetSongsByLanguage =(language)=>{ 
        dispatch(setLanguage({language}));        
    }

  

    return (
        <View style={styles.container}>
        <LinearGradient
            colors={themeColor}
            style = {styles.gradient}>   
        
         <ScrollView>
          <View style={styles.subContainer}>
            <Header />  
            <Text style={styles.text}> Choose a language from below:</Text>
            <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => { GetSongsByLanguage("Tamil")}}>
                <View style={styles.textCont}>
                    <Text style={styles.text}>Tamil</Text>
                </View>
            </TouchableOpacity>            
            </View>
            </View>
            <View style={styles.subContainer}>
            <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => { GetSongsByLanguage("English")}}>
                <View style={styles.textCont}>
                    <Text style={styles.text}>English</Text>
                </View>
            </TouchableOpacity>            
            </View>
            </View>
            <View style={styles.subContainer}>
            <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => { GetSongsByLanguage("Punjabi")}}>
                <View style={styles.textCont}>
                    <Text style={styles.text}>Punjabi</Text>
                </View>
            </TouchableOpacity>            
            </View>
            </View>
            <View style={styles.subContainer}>
            <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => { GetSongsByLanguage("Hindi")}}>
                <View style={styles.textCont}>
                    <Text style={styles.text}>Hindi</Text>
                </View>
            </TouchableOpacity>            
            </View>
            </View>
        </ScrollView>
        </LinearGradient>
        </View>
    )
}

export default LanguageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },

    gradient:{
        flex:1
    },
  
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf:"center"
    },
    
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
  });

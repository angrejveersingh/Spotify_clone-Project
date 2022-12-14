import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Text,TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useDispatch, useSelector } from "react-redux";
import {
  changeToken, setAccessToken,
} from "../Components/redux/musicSlice";
import { spotifyApi } from "./commonUtils";


var SpotifyWebApi = require("spotify-web-api-node");

const discovery = {
  authorizationEndpoint: 
  "https://accounts.spotify.com/authorize",
  tokenEndpoint: 
  "https://accounts.spotify.com/api/token",
};

const LoginButton =({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
)

const LoginScreen = () => {

  const dispatch = useDispatch();  

  const themeColor = useSelector((state) => state.music.themeColor);
  const [request, response, promptAsync] = 
  useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "298f33a914394cf9b2df680d1370aec1",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: "exp://10.0.0.130:19000",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const{access_token} = response.params;
      dispatch(setAccessToken({access_token}));  
    }
    
  }, [response]);


        return (        
          <LinearGradient
              colors={themeColor}
              style = {styles.gradient}>   
              <View style ={styles.centered}>
            <Text
              style={styles.welcomeBox}>
              Welcome to Spotify Shorts
            </Text>
            <LoginButton onPress={()=>{
              promptAsync();
            }} title="Log in with Spotify"></LoginButton>
            </View>
          </LinearGradient>   
        ); 
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
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

  welcomeBox:
  {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: "20%",
    textAlign:"center",
    color:'#1DB954'
  },
  appButtonContainer: {
    elevation: 10,
    backgroundColor: "#1DB954",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
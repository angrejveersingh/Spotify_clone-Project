import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { colors, device, formatTime, gStyle } from './commonUtils';
import TouchIcon from './components/TouchIcon';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import Category from "./CategoryScreen";
import Search from './SearchScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import MusicPlayer from './MusicPlayer';
import UserActivity from './UserActivity';
import LanguageScreen from "./LanguageScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootStack = (props) => {
    const accessToken = useSelector((state) => state.music.accessToken);
    const selectedLanguage = useSelector((state) => state.music.language);
    if (!accessToken) {
        return <LoginScreen />
    }

    if(!selectedLanguage)
    {
      return <LanguageScreen></LanguageScreen>
    }

    return <Tab.Navigator initialRouteName='Home'
            screenOptions={{
                tabBarStyle: {
                    height: 85,
                    paddingTop: 10,
                    backgroundColor: "rgb(0,0,0)",
                    borderTopWidth: 0
                },
                tabBarLabelStyle: {
                    marginBotton: 5,
                    paddingBottom: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                tabBarActiveTintColor: "white"
            }}>

            <Tab.Screen name="Home" component={HomeComponents}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, backgroundColor }) => (<Entypo name="home" size={30} color={color} backgroundColor={"blue"} />)
                }} />
            <Tab.Screen name="Player" component={MusicPlayer}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialIcons name="play-circle-fill" size={30} color={color} />)
                }} />
            {/* <Tab.Screen name="Library" component={UserActivity}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialIcons name="my-library-music" size={30} color={color} />)
                }} /> */}
        </Tab.Navigator>
};

function HomeComponents(){
    const Stack = createNativeStackNavigator();
  
    return (
  
  
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }} />
          <Stack.Screen name="Search" component={Search}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            //HeaderBackButton
          }} />

       <Stack.Screen name="Category" component={Category}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            //HeaderBackButton
          }} />
         
      </Stack.Navigator>
    )
  
  }


export default RootStack;
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Header = ({nav}) => {
    const navigation = useNavigation();
   const navSearch = ()=>{
    navigation.navigate("Search");
}
  return (
    <View style={styles.topCont}>
     <View>
        <Text style={styles.text}>Good Afternoon</Text>
     </View>
     <View style={styles.iconCont}>
     {/* <MaterialCommunityIcons name="bell-outline" style={styles.icon} size={30} color="white"/> */}
     <TouchableOpacity onPress={()=>{
        navSearch();
    }}><MaterialCommunityIcons name="magnify" style={styles.icon} size={30} color="white"/></TouchableOpacity>
     {/* <MaterialCommunityIcons name="cog-outline" style={styles.icon} size={30} color="white" /> */}


     </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

    topCont:{
        flexDirection:"row",
        alignItems:"center",
        paddingTop:40,
        justifyContent:"space-between"
    },
    text:{
        color:"white",
        fontSize:22,
        fontWeight:"bold"
    },
    iconCont:{
        flexDirection:"row"
    },
    icon:{
        marginLeft:15
    }
})
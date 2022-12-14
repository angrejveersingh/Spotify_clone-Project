import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


const HeaderLibrarySong = () => {
  return (
    <View style={styles.topCont}>
        
     <View>
        <Text style={styles.text}>Playlist Songs</Text>
     </View>
     <View style={{flexDirection:'row'}}>
     <Entypo name="magnifying-glass" size={32} color="white" style={{marginHorizontal:10}} />
     <AntDesign name="plus" size={32} color="white" />
     </View>

   
     
    </View>
  )
}

export default HeaderLibrarySong

const styles = StyleSheet.create({

    topCont:{
        flexDirection:"row",
    
        paddingTop:40,
        justifyContent:"space-between"
    },
    text:{
        color:"white",
        fontSize:32,
        fontWeight:"600",
        marginBottom :20
    },
    iconCont:{
        flexDirection:"row"
    },
    icon:{
        marginLeft:15
    }
})
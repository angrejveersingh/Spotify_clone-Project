import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const HeaderUserActivity = () => {
  return (
    <View style={styles.topCont}>
     <View>
        <Text style={styles.text}>Recent Activity</Text>
     </View>
     
    </View>
  )
}

export default HeaderUserActivity

const styles = StyleSheet.create({

    topCont:{
        flexDirection:"row",
        alignItems:"center",
        paddingTop:40,
        justifyContent:"space-between"
    },
    text:{
        color:"white",
        fontSize:32,
        fontWeight:"400",
        marginBottom :20
    },
    iconCont:{
        flexDirection:"row"
    },
    icon:{
        marginLeft:15
    }
})
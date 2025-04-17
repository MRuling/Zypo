import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Button = () => {
    const[isFollow,setIsFollow] = useState(false);
    const[isVisible,setIsVisible] = useState(false);

    const takiptenCik =() => {
      setIsFollow(false);
      setIsVisible(false);
    }
  return (
    <View>
      {!isFollow? (

        <TouchableOpacity style={styles.followButton} >
        <Text style={styles.followText}>Takip et</Text>
      </TouchableOpacity>
      ):(
        <View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text>Takiptesin</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Mesaj</Text>
          </TouchableOpacity>
          </View>
      )}
      
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    followButton:{
        backgroundColor:'#039BE5',
        width:120,
        height:35,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    },
    followText:{
        textAlign:'center',
        color:'white'
    }
})
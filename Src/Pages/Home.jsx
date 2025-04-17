import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, Switch } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
 const {theme,state,dispatch} = useContext(AuthContext);
  const storyData = [
    { id: 1, imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, imgUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  const {width,height} = Dimensions.get('window');

  const handleFollows = () => {
    dispatch({type:'FOLLOW'});
  }
  return (
    <View style={{width:width,height:height,backgroundColor:theme.backgroundColor}}>
      <StatusBar translucent={false} style={theme.statusbarTextColor} backgroundColor={theme.backgroundColor} />
      <FlatList
        horizontal={true}
        data={storyData}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image source={{ uri: item.imgUrl }} style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: 'yellow', margin: 10 }} />
          </TouchableOpacity>
        )}
      />
      <View style={{bottom:100,justifyContent:'center',alignItems:'center'}} >
         <TouchableOpacity style={{backgroundColor:'red',width:100,height:35,borderRadius:20,justifyContent:'center',alignItems:'center'}} onPress={handleFollows}>
          <Text style={{color:'white',textAlign:'center'}}>{state.follows === 'follow'? 'Takip': 'Takipçi' }</Text>
         </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
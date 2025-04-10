import { StyleSheet, Text, View,FlatList} from 'react-native';
import React,{useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider';
const Notifications = () => {

  const {newsUser} = useContext(AuthContext);
  const newUser = [
    
      {
           id:1,
           username: 'Jack'
      },
     {
        id:2,
        username:'Jhonny'
      },
      {
        id:3,
        username:'jane',
        message:'Seni seviyorum'
      },
    {
        id:4,
        username:'Jhon',
      }
    
  ]

const data = newUser.map(user => ({
  user:{
    id:user.id,
    username:user.username,
    message:`${user.username} ${user.message || 'Kullanıcısı sizi takip etmeye başladı'}`

  }
}))
  return (
    <View>
       <FlatList data={data} renderItem={({item}) => (
          <Text>{item.user.message}</Text>
        )}
        />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({})
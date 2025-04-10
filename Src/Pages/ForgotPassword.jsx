import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import styles from '../Styles/GlobalStyle/GlobalStyle'
import { useNavigation } from '@react-navigation/native'
const ForgotPassword = () => {
  const[username,setUsername] = ('');
  const {newsUser,setNewUser} = useContext(AuthContext);

   const navigation = useNavigation();
  if(username === newsUser?.username){
    Alert.alert('Zypo','Bu alan boş bırakıldı veya girilen ad ile eşleşmiyor');
    return;
  }else{
    navigation.navigate('ForgotScreen');
  }
  return (
    <View>
      <TextInput
      placeholder='Kullanıcı adı giriniz'
      placeholderTextColor='gray'
      value={username}
      onChangeText={setUsername}
      style={styles.input}
      />
      <Button title='Kod gönder' onPress={() => {}} />
    </View>
  )
}

export default ForgotPassword
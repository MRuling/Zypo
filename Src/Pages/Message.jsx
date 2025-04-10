import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'

const Message = () => {
  const[newMessage,setNewMessage] = useState([]);
  const[inputText,setInputText] = useState('');
  const senderMessage = () => {
   
     if(inputText.trim() === ''){
      Alert.alert('Zypo','Boş mesaj gönderilemez');
      return;
     }
       const newRoad = [...newMessage,inputText.trim()];
       setNewMessage(newRoad);
       setInputText('');
     
    }
    return (
      <View>
        <FlatList 
        data={newMessage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text>{item}</Text>
        )}
        />
        <TextInput 
        placeholder='Birşeyler yazın...'
        placeholderTextColor={'gray'}
        defaultValue={inputText}
        onChangeText={setInputText}
        />
        <Button title='Gönder' onPress={senderMessage} />
      </View>
    )
  }


export default Message

const styles = StyleSheet.create({})
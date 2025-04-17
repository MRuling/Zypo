import { StyleSheet, Text, View, TouchableOpacity, Button, Alert,Image} from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { FlatList } from 'react-native-gesture-handler';
import { UserInfo } from '../Context/UserContext';

const Profile = ({ navigation }) => {
  const { pickImageAndResize,selectedImage} = useContext(UserInfo);
  const { newsUser, logout,theme,handleTheme,followUser} = useContext(AuthContext);
  const[isTrue,setISTrue] = useState(false);
  const userPosts = [
    { id: '1', content: 'İlk gönderi' },
    { id: '2', content: 'Harika bir gün' },
    { id: '3', content: 'Zypo vibes 💫' },
  ];
   const handleLog = () => {
    setISTrue(true)
    followUser('ali_123');
    Alert.alert('Zypo','Kullanıcı takip edildi');
   }
  return (
    <View style={{ flex: 1,backgroundColor:theme.backgroundColor}}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
          <TouchableOpacity onPress={pickImageAndResize}>
                 <Text>Resim seç</Text>
                 <Image source={{uri: selectedImage}} style={{width:40,height:40,borderRadius:20}} />
          </TouchableOpacity>
            <Text style={[styles.postText,{color:theme.textColor}]}>{item.content}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={[styles.headerContainer,{backgroundColor:theme.backgroundColor}]}>
            <Text style={[styles.username,{color:theme.textColor}]}>Kullanıcı: {newsUser?.username}</Text>
            <Text style={[styles.phone,{color:theme.textColor}]}>Telefon: {newsUser?.no || 'Yok'}</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={() => {
              logout();
              navigation.replace('Login');
            }}>
              <Text style={styles.logoutText}>Çıkış Yap</Text>
            </TouchableOpacity>
            <Button title='Tema değiştir' onPress={handleTheme} />
            <Button title={isTrue ? 'Takip' : 'Takip et'} onPress={handleLog} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;

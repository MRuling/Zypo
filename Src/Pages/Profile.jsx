import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { FlatList } from 'react-native-gesture-handler';

const Profile = () => {
  const { newsUser } = useContext(AuthContext);

  const userPosts = [
    { id: '1', content: 'İlk gönderi' },
    { id: '2', content: 'Harika bir gün' },
    { id: '3', content: 'Zypo vibes 💫' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postText}>{item.content}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.username}>Kullanıcı: {newsUser?.username}</Text>
            <Text style={styles.phone}>Telefon: {newsUser?.no}</Text>
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
  },
  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postText: {
    fontSize: 16,
  },
});

export default Profile;

import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig'; // Firestore config importu
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'; // Firestore işlevleri importu
import { AuthContext } from '../Context/AuthProvider';
import styles from '../Styles/SearchStyle';
import { StatusBar } from 'expo-status-bar';

const Search = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { newsUser, theme } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const { height, width } = Dimensions.get('window');

  // Firestore'dan kullanıcı verilerini alıyoruz
  useEffect(() => {
    const q = query(collection(db, 'usernames'), orderBy('createdAt', 'asc')); // 'usernames' koleksiyonu
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          username: data.email.split('@')[0],  // Email'den username çıkarma
          image: data.image || 'https://randomuser.me/api/portraits/men/1.jpg', // Varsayılan profil resmi
        };
      });
      setUsers(usersData); // State'e kullanıcıları set ediyoruz
    });

    // Cleanup: aboneliği kaldırıyoruz
    return () => unsubscribe();
  }, []);

  const filteredData = users.filter(item =>
    item?.username?.toLowerCase().includes(search.toLowerCase())
  );

  const showList = search.trim().length > 0 && filteredData.length > 0;

  const handleProfile = (userId) => {
    navigation.navigate('UsersProfile', { userId });
  };

  return (
    <View style={[{ backgroundColor: theme.backgroundColor, width: width, height: height }]}>
      <StatusBar style={theme.statusbarTextColor} backgroundColor={theme.backgroundColor} translucent={false} />
      <FlatList
        data={showList ? filteredData : []}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListHeaderComponent={(
          <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.bodyContainer}>
              <Ionicons name='search-outline' size={20} style={{ left: 10 }} />
              <TextInput
                style={styles.searchInput}
                placeholder='Ara'
                placeholderTextColor='gray'
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Arama kutusu boşsa ya da sonuç bulunamazsa */}
            {(search.trim().length === 0 || filteredData.length === 0) && (
              <View style={styles.alertContainer}>
                <Text style={styles.alertText}>Burada bir şey görünmüyor</Text>
                <Ionicons name='alert-circle-outline' size={20} style={styles.alertIcons} />
              </View>
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => handleProfile(item.id)}>
              <Text style={{ fontSize: 16 }}>{item.username}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Search;

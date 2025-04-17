import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View, Button } from 'react-native';
import { db } from '../../firebaseConfig';  // Firebase config
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const Message = () => {
  const [users, setUsers] = useState([]);
  const { newsUser } = useContext(AuthContext); // AuthContext'ten gelen user verisi
  const navigation = useNavigation();

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

  // Eğer auth'dan gelen kullanıcı varsa, onları da ekleyebiliriz
  const data = newsUser && newsUser.length > 0 ? newsUser : users;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={data}  // Burada Firestore'dan gelen kullanıcılar ya da auth'dan gelenler kullanılıyor
        keyExtractor={(item) => item.id} // Kullanıcı ID'sini key olarak kullanıyoruz
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Messages', {
              isim: item.username, // Kullanıcı adı
              image: item.image || 'https://randomuser.me/api/portraits/men/1.jpg', // Varsayılan profil resmi
            })}
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              alignItems: 'center',
              padding: 5,
            }}
          >
            <View style={{
              width: 40, height: 40, borderRadius: 20, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 10
            }}>
              <Text style={{ color: 'white', fontSize: 20 }}>
                {item.username[0]}  {/* Profil resmini göstermiyoruz, sadece ilk harfi alıyoruz */}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>{item.username}</Text>
            </View>
            <Button title="Mesaj Gönder" onPress={() => navigation.navigate('Messages', { userId: item.id })} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Message;

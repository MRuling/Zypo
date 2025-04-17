import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { db } from '../../firebaseConfig'; // Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore işlemleri

const UsersProfile = ({ route }) => {
  const { userId } = route.params;  // Tıklanan kullanıcının ID'si
  const { newsUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  // Firestore'dan kullanıcı profili verilerini alıyoruz
  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, 'usernames', userId);  // 'usernames' koleksiyonundan kullanıcı
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data());  // Kullanıcı verilerini state'e alıyoruz
      } else {
        console.log("Kullanıcı bulunamadı!");
      }
    };

    getUserData();
  }, [userId]);

  if (!userProfile) {
    return <Text>Yükleniyor...</Text>;  // Kullanıcı verisi yüklenene kadar gösterilecek
  }

  return (
    <View style={{ flexDirection: 'column', padding: 20 }}>
      {/* Profil Başlık */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ height: 60, width: 60, borderRadius: 30, backgroundColor: 'pink', marginRight: 10 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>{userProfile.username}</Text>
      </View>

      {/* Takipçi ve Takip Edilenler */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Takip</Text>
          <Text style={{ fontSize: 16 }}>{userProfile.followingCount || 0}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Takipçi</Text>
          <Text style={{ fontSize: 16 }}>{userProfile.followerCount || 0}</Text>
        </View>
      </View>

      {/* Takip et ve Mesaj butonları */}
      <View style={{ marginTop: 20 }}>
        <Button title='Takip Et' onPress={() => { /* Takip etme işlemi */ }} />
        <Button title='Mesaj Gönder' onPress={() => { /* Mesaj gönderme işlemi */ }} />
      </View>
    </View>
  );
};

export default UsersProfile;

const styles = StyleSheet.create({
  // İstenilen stiller buraya eklenebilir
});

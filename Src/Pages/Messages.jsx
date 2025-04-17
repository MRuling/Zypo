import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebaseConfig'; // Firebase config importu
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthProvider';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale'; // Türkçe saat için

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { newsUser, userUid } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Zypo', 'Boş mesaj gönderilemez');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        sender: userUid,
        reciever: newsUser?.uid, // UID kullanman daha sağlıklı olur
        message,
        timestamp: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      Alert.alert('Hata', 'Mesaj gönderilemedi');
      console.error('Firestore error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSender = item.sender === userUid;
          const time = item.timestamp?.toDate
          ? format(item.timestamp.toDate(), 'HH:mm', { locale: tr })
          : '';
      
          return (
            <View
              style={[
                styles.messageContainer,
                {
                  alignSelf: isSender ? 'flex-end' : 'flex-start',
                  backgroundColor: isSender ? '#64B5F6' : '#e0e0e0',
                },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  {
                    color: isSender ? 'white' : 'black',
                    textAlign: isSender ? 'right' : 'left',
                  },
                ]}
              >
                {item.message}
              </Text>
              {time !== '' && (
        <Text style={styles.timeText}>
          {time}
        </Text>
      )}
            </View>
          );
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Mesaj girin..."
        placeholderTextColor="gray"
        value={message}
        onChangeText={setMessage}
      />
      <Button
        title={loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
        onPress={handleMessage}
        disabled={loading}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ddd',
  },
});

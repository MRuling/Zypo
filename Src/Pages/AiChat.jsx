import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const AiChatGemini = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setTypingMessage('');

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: input }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const fullText = res.data.candidates[0].content.parts[0].text;
      let i = 0;

      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setTypingMessage(fullText.substring(0, i));
          i++;
        } else {
          clearInterval(interval);
          setMessages([...updatedMessages, { role: 'assistant', content: fullText }]);
          setTypingMessage('');
        }
      }, 20);
    } catch (error) {
      console.error('Gemini HATASI:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={[styles.message, item.role === 'user' ? styles.user : styles.ai]}>
            {item.content}
          </Text>
        )}
        ListFooterComponent={
          typingMessage ? (
            <Text style={[styles.message, styles.ai]}>
              {typingMessage}
              <Text style={{ opacity: 0.5 }}>|</Text>
            </Text>
          ) : null
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bir şey yaz..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <Text style={{ color: 'white' }}>{loading ? '...' : 'Gönder'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AiChatGemini;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'tomato',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 10,
  },
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 6,
    maxWidth: '90%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7ff',
  },
  ai: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2f2f2',
  },
});

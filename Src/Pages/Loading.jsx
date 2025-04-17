import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Loading = ({ navigation }) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        // Burada internetten veri çekiyormuş gibi simüle ettik
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.log('Yüklenen veri:', data);

        navigation.navigate('TabNavigator'); // veri geldiyse yönlendir
      } catch (error) {
        console.error('İnternet bağlantı hatası:', error);
        // İstersen hata ekranına yönlendirebilirsin
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // örnek
    justifyContent: 'center',
    alignItems: 'center'
  }
});

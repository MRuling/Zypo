import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { View } from 'react-native';
import React, { useState } from 'react';
import { UserInfo } from './UserContext';

const UserProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAndResize = async () => {
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // Kırpma/zoom burada aktif
      aspect: [1, 1], // Kare kesim örneği (1:1)
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      // Opsiyonel: yeniden boyutlandırma
      const manipulatedResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // 800px genişlik, oran korunur
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setSelectedImage(manipulatedResult.uri);
      console.log('Seçilen ve kırpılmış görsel:', manipulatedResult.uri);
    }
  };

  return (
    <UserInfo.Provider value={{ pickImageAndResize, selectedImage }}>
      {children}
    </UserInfo.Provider>
  );
};

export default UserProvider;

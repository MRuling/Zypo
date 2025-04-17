import React, { useContext, useRef } from 'react';
import { View, Button, Dimensions } from 'react-native';
import { CropView } from 'react-native-image-crop-tools';
import { UserInfo } from '../Context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const CropScreen = () => {
  const cropViewRef = useRef();
  const { setSelectedImage } = useContext(UserInfo);
  const navigation = useNavigation();
  const route = useRoute();
  const { uri } = route.params;

  const handleCrop = () => {
    cropViewRef.current.saveImage(true, 100); // JPEG format, %100 kalite
  };

  return (
    <View style={{ flex: 1 }}>
      <CropView
        sourceUrl={uri}
        style={{ flex: 1 }}
        ref={cropViewRef}
        keepAspectRatio
        aspectRatio={{ width: 1, height: 1 }} // Kare kırpma
        onImageCrop={(res) => {
          console.log('Kırpılan görsel:', res.uri);
          setSelectedImage(res.uri); // Context'e kaydet
          navigation.goBack(); // Profil'e geri dön
        }}
      />
      <Button title="Kırp ve Kaydet" onPress={handleCrop} />
    </View>
  );
};

export default CropScreen;

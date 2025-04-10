import React, { useState } from 'react';
import { Button, StyleSheet, View, Dimensions, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageZoom from 'react-native-image-pan-zoom';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const pickImageAndResize = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      const original = result.assets[0];
      const aspectRatio = original.height / original.width;

      const targetWidth = 7380;
      const targetHeight = Math.round(targetWidth * aspectRatio);

      const resized = await ImageManipulator.manipulateAsync(
        original.uri,
        [{ resize: { width: targetWidth, height: targetHeight } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(resized.uri);
      setImageSize({ width: targetWidth, height: targetHeight });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="📷 Galeriden Fotoğraf Seç ve 4K Yap" onPress={pickImageAndResize} />
      {image && (
        <ImageZoom
          cropWidth={screenWidth}
          cropHeight={screenHeight}
          imageWidth={screenWidth}
          imageHeight={screenWidth * (imageSize.height / imageSize.width)}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: screenWidth,
              height: screenWidth * (imageSize.height / imageSize.width),
            }}
            resizeMode="contain"
          />
        </ImageZoom>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

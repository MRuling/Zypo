import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const Home = () => {

  const storyData = [
    { id: 1, imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, imgUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];
  return (
    <View>

      <FlatList
        horizontal={true}
        data={storyData}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image source={{ uri: item.imgUrl }} style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: 'yellow', margin: 10 }} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})